#!/usr/bin/python3
"""Define categories endpoints"""

from api.v1.views import app_views
from flask import make_response, jsonify, abort, request
from models.category import Category
from models.product import Product
from models import storage
from api.utils.paginate import paginate, get_paginate_args
from api.utils.role_decorator import role_required
from flask_jwt_extended import jwt_required


@app_views.route('/categories', methods=['GET'])
@jwt_required()
def get_categories():
    """
    Retrieve all Category objects.

    Returns:
    - 200 OK: The response body will contain
    a JSON list of all Category objects.
    """

    paginate_args = get_paginate_args(Category, **request.args)
    categories = paginate(**paginate_args)

    response = make_response(jsonify(categories))
    return response


@app_views.route('/categories/<category_id>', methods=['GET'])
@jwt_required()
def get_category_by_id(category_id=None):
    """
    Retrieve a Category object linked to `category_id`

    Parameters:
    - category_id (str): `id` of the Category object to retrieve (required).

    Returns:
    - 404 NOT FOUND: If `category_id` is not linked any Category object.
    - 200 OK: If `category_id` is linked to a Category object.
    The response body will contain the Category object.
    """

    category = storage.get(Category, category_id)
    if not category:
        message = f"Category '{category_id}' doesn't exist"
        return abort(404, message)

    response = make_response(jsonify(category.to_dict()))
    return response


@app_views.route('/categories/<category_id>/products', methods=['GET'])
@jwt_required()
def get_category_products(category_id=None):
    """
    Retrieve all Product objects of a Category object linked to `category_id`

    Parameters:
    - category_id (str): `id` of the Category object to retrieve the
    products for. (required)

    Returns:
    - 404 NOT FOUND: If `category_id` is not linked to any Category object
    - 200 OK: If `category_id` is linked to a Category object.
    The response body will contain a JSON list of Product objects.
    """

    category = storage.get(Category, category_id)
    if not category:
        message = f"Category '{category_id}' doesn't exist."
        return abort(404, message)

    products = [product.to_dict() for product in category.products]

    response = make_response(jsonify(products))
    return response


@app_views.route('/categories/<category_id>/products/<product_id>',
                 methods=['GET'])
@jwt_required()
def get_category_product(category_id=None, product_id=None):
    """
    Retrieve a Product object linked to `product_id` of a Category object
    linked to `category_id`

    Parameters:
    - category_id (str): `id` of the Category object the
    Product object is linked to. (required)
    - product_id (str): `id` of the Product object to retrieve.

    Returns:
    - 404 NOT FOUND: If category_id is not linked to any Category object.
    - 404 NOT FOUND: If product_id is not linked to any Product object.
    - 404 NOT FOUND: If the Product object linked to product_id is not
    linked to the Category object linked to category_id
    """

    category = storage.get(Category, category_id)
    if not category:
        message = f"Category '{category_id}' doesn't exist."
        return abort(404, message)

    product = storage.get(Product, product_id)
    if not product:
        message = f"Product '{product_id}' doesn't exist."
        return abort(404, message)

    if category_id != product.category_id:
        message = f"""Product '{product_id}' is not linked to \
Category {category_id}"""
        return abort(404, message)

    response = make_response(jsonify(product.to_dict()))
    return response


@app_views.route('/categories', methods=['POST'])
@jwt_required()
@role_required(['admin', 'superuser'])
def create_category():
    """
    Create a new Category object.

    Request Body:
    - name (str): Name of the Category object (required).
    - description (str): Description of the Category object (optional).

    Returns:
    - 400 BAD REQUEST: If the request is not a valid JSON.
    - 400 BAD REQUEST: If the request body does not contain `name` key.
    - 201 CREATED: If the Category object has been successfully created.
    The response body will contain the Category object.
    """

    if not request.is_json:
        return abort(400, 'Request body is not a valid JSON object')

    request_body = request.get_json()
    category_name = request_body.get('name', None)
    if not category_name:
        return abort(400, 'Missing category name in request body')

    category_name = request_body.get('name', None)
    category_filter = storage.get_by_attr(Category, **{'name': category_name})
    if len(category_filter) > 0:
        message = f"Category with name '{category_name}' already exists \
with id '{category_filter[0].id}'."
        return abort(400, message)

    category = Category(**request_body)
    category.save()
    category = storage.get(Category, category.id)

    response = make_response(jsonify(category.to_dict()), 201)
    return response


@app_views.route('/categories/<category_id>', methods=['PUT'])
@jwt_required()
@role_required(['admin', 'superuser'])
def update_category_by_id(category_id=None):
    """
    Update a Category object linked to `category_id`.

    Parameters:
    - category_id (str): `id` of the Category object to update.

    Request Body:
    - name (str): The updated name of the Category object (required).
    - description (str): The description of the Category object (optional).

    Returns:
    - 200 OK: If the category's information is successfully updated.
    The response body will contain the updated Category object.
    - 400 BAD REQUEST: If the request body is not a vaid JSON.
    - 404 NOT FOUND: If `category_id` is not linked to any Category object.
    """

    if not request.is_json:
        return abort(400, 'The request body is not a valid JSON object.')

    category = storage.get(Category, category_id)
    if not category:
        message = f"Category {category_id} doesn't exist."
        return abort(404, message)

    ignore_keys = ['id', 'created_at', 'updated_at']
    request_body = request.get_json()
    request_body = {k: v for k, v in request_body.items() if
                    k not in ignore_keys}

    for key, value in request_body:
        setattr(category, key, value)

    category.save()

    response = make_response(jsonify(category.to_dict()))
    return response


@app_views.route('/categories/<category_id>/products/<product_id>',
                 methods=['PUT'])
@jwt_required()
@role_required(['admin', 'superuser'])
def link_product_to_category(category_id=None, product_id=None):
    """
    Link a Product object linked to `product_id` to a Category object \
    linked to `category_id`

    Parameters:
    - category_id (str): id of Category object. (required)
    - product_id (str): `id` of Product object. (required)

    Returns:
    - 404 NOT FOUND: If `category_id` is not linked to any category object.
    - 404 NOT FOUND: If `product_id` is not linked to any Product object.
    - 200 OK: If the Product object and the Category object
    are already linked. The response body will contain the Product object.
    - 201 CREATED: If the Product object and the Category object are
    successfully linked. The response body will contain the Product object.
    """

    category = storage.get(Category, category_id)
    if not category:
        message = f"Category {category_id} doesn't exist."
        return abort(404, message)

    product = storage.get(Product, product_id)
    if not product:
        message = f"Product {product_id} doesn't exist."
        return abort(404, message)

    products = category.products
    if product in products:
        message = f"Product {product_id} is already linked to \
Category {category_id}."
        response = make_response(jsonify({'message': message,
                                          'product': product.to_dict()
                                          })
                                 )
        return response

    product.category_id = category_id
    product.save()

    response = make_response(jsonify(product.to_dict()), 201)
    return response


@app_views.route('/categories/<category_id>', methods=['DELETE'])
@jwt_required()
@role_required(['admin', 'superuser'])
def delete_category_by_id(category_id=None):
    """
    Delete a Category object linked to `category_id`.

    Parameters:
    - category_id (str): `id` of the Category object to delete (required).

    Returns:
    - 404 NOT FOUND: If `category_id` is not linked to any Category object.
    - 200 OK: If the Category object is deleted successfully.
    The response body will be an empty dictionary.
    """

    category = storage.get(Category, category_id)
    if not category:
        message = f"Category {category_id} doesn't exist."
        return abort(404, message)

    category.delete()
    storage.save()

    response = make_response(jsonify({}))
    return response
