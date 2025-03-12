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
    products = storage.all(Product).values()
    if products:
        product_list = [product.to_dict() for product in products]

    if product_list is None:
        abort(404)
    return jsonify(product_list)


@app_views.route('/products/<product_id>', methods=['GET'])
def get_product(product_id):
    """Retrieves a product"""
    product = storage.get(Product, product_id)
    if not product:
        abort(404)
    return jsonify(product.to_dict())


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
        return jsonify({"error": "Not a JSON"}), 400
    if 'name' not in data:
        return jsonify({"error": "Missing name"}), 400
    if 'category_id' not in data:
        return jsonify({"error": "Missing category_id"}), 400

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
        return jsonify({"error": "Not a JSON"}), 400

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
