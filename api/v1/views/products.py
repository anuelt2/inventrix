#!/usr/bin/python3
"""Implement RESTFul APIs for Product object"""
from flask import jsonify, abort, make_response, request

from api.v1.views import app_views
from models import storage
from models.product import Product
from models.category import Category


@app_views.route('/products', methods=['GET'])
def get_products():
    """Retrieve the list of all products"""
    try:
        total = storage.count(Product)

        # Get query parameters (default to page 1, all items)
        page = request.args.get('page', default=1, type=int)
        limit = request.args.get('limit', default=total, type=int)
        if page < 1 or limit < 1:
            abort(404)

        # Fetch paginated data
        products = storage.paginate_data(Product, page, limit)

        products_list = [product.to_dict() for product in products]
        if not products_list:
            abort(404)

        return make_response(jsonify({
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": (total // limit) + (1 if total % limit else 0),
            "data": products_list
        }), 200)

    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 500)


@app_views.route('/products/<product_id>', methods=['GET'])
def get_product(product_id):
    """Retrieves a product"""
    product = storage.get(Product, product_id)
    if not product:
        abort(404)
    return make_response(jsonify(product.to_dict()), 200)


@app_views.route('/products/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Deletes a product object"""
    product = storage.get(Product, product_id)
    if not product:
        abort(404)

    storage.delete(product)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/products/', methods=['POST'])
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
    it_exists = storage.get_by_attr(Product, 'name', data['name'])
    if it_exists:
        return make_response(jsonify({"error": "Already exists"}), 409)

    product = Product(**data)

    # Generate a unique sku
    product.sku = valid_category.name + '-' + product.name
    product.save()
    return make_response(jsonify(product.to_dict()), 201)


@app_views.route('/products/<product_id>', methods=['PUT'])
def put_product(product_id):
    """Updates exiting data of a product object"""
    product = storage.get(Product, product_id)
    if not product:
        abort(404)

    data = request.get_json(silent=True)
    if data is None:
        abort(400, "Not a JSON")

    # Skip immutable data
    skip = [
        'id', 'name', 'sku',
        'category_id', 'created_at', 'updated_at'
        ]
    for key, value in data.items():
        if key not in skip:
            setattr(product, key, value)

    product.save()
    return make_response(jsonify(product.to_dict()), 200)
