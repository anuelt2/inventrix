#!/usr/bin/python3
"""Implement RESTFul APIs for Product object"""
from flask import jsonify, abort, make_response, request

from api.v1.views import app_views
from models import storage
from models.product import Product
from models.category import Category
from api.utils.paginate import paginate, get_paginate_args
from api.utils.role_decorator import role_required


@app_views.route('/products', methods=['GET'])
def get_products():
    """Retrieve the list of all products"""
    # Get query parameters (default to page 1, all items)
    paginate_args = get_paginate_args(Product, **request.args)
    products = paginate(**paginate_args)

    response = make_response(jsonify(products))
    return response


@app_views.route('/products/<product_id>', methods=['GET'])
def get_product(product_id):
    """Retrieves a product"""
    product = storage.get(Product, product_id)
    if not product:
        abort(404)
    return make_response(jsonify(product.to_dict()), 200)


@app_views.route('/products/<product_id>', methods=['DELETE'])
@role_required(["superuser", "admin"])
def delete_product(product_id):
    """Deletes a product object"""
    product = storage.get(Product, product_id)
    if not product:
        abort(404)

    storage.delete(product)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/products/', methods=['POST'])
@role_required(["superuser", "admin"])
def post_product():
    """Add a new product object"""
    data = request.get_json(silent=True)
    if data is None:
        abort(400, "Not a JSON")
    if 'name' not in data:
        abort(400, "Missing name")
    if 'category_id' not in data:
        abort(400, "Missing category_id")

    # Validate product category
    valid_category = storage.get(Category, data['category_id'])
    if not valid_category:
        abort(404)

    # Check if product name already exit
    it_exists = storage.get_by_attr(Product, name=data['name'])
    if it_exists:
        return make_response(jsonify({"error": "Already exists"}), 409)

    product = Product(**data)

    # Generate a unique sku
    product.sku = generate_sku(product, valid_category.name)
    product.save()
    return make_response(jsonify(product.to_dict()), 201)


@app_views.route('/products/<product_id>', methods=['PUT'])
@role_required(["superuser", "admin"])
def put_product(product_id):
    """Updates exiting data of a product object"""
    product = storage.get(Product, product_id)
    if not product:
        abort(404)

    data = request.get_json(silent=True)
    if data is None:
        abort(400, "Not a JSON")

    # Skip data
    skip = [
        'id', 'name', 'sku',
        'created_at', 'updated_at'
        ]
    for key, value in data.items():
        if key not in skip:
            setattr(product, key, value)

    # Validate product category
    valid_category = storage.get(Category, product.category_id)
    if not valid_category:
        abort(404)

    product.sku = generate_sku(product, valid_category.name)
    product.save()
    return make_response(jsonify(product.to_dict()), 200)


def generate_sku(product, category_name):
    """Generate SKU for product"""
    category = category_name[:3].upper().replace(" ", "")
    brand = product.brand[:3].upper().replace(" ", "")
    brand = brand if brand else 'GEN'

    model = product.model[:5].upper().replace(" ", "")
    model = model if model else 'GEN'

    product_id = product.id[:4]

    sku = f"{category}-{brand}-{model}-{product_id}"
    return sku
