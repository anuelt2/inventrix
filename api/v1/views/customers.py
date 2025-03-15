#!/usr/bin/python3
"""View for Customer objects that handle all deafult RESTFul API actions"""
from flask import jsonify, abort, request
from flask_jwt_extended import jwt_required, get_jwt

from api.v1.views import app_views
from models import storage
from models.customer import Customer
from api.utils.paginate import paginate, get_paginate_args


@app_views.route("/customers", methods=['GET'])
def get_customers():
    """Retrieves list of all Customer objects"""

    paginate_args = get_paginate_args(Customer, **request.args)
    customers = paginate(**paginate_args)

    return jsonify(customers), 200


@app_views.route("/customers/<customer_id>", methods=['GET'])
def get_customer(customer_id):
    """Retrieves a specific Customer"""

    customer = storage.get(Customer, customer_id)

    if not customer:
        abort(404)

    return jsonify(customer.to_dict())


@app_views.route("/customers/<customer_id>/transactions", methods=['GET'])
def get_all_customer_transactions(customer_id):
    """Retrieves a specific Customer transactions"""

    customer = storage.get(Customer, customer_id)

    if not customer:
        abort(404)

    transactions = customer.transactions

    return jsonify([transaction.to_dict() for transaction in transactions])


@app_views.route("/customers", methods=['POST'])
def post_customer():
    """Creates a new Customer"""

    if not request.is_json:
        abort(400, description="Not a JSON")

    data = request.get_json()

    new_customer = Customer(**data)
    new_customer.save()

    return jsonify(new_customer.to_dict()), 201


@app_views.route("/customers/<customer_id>", methods=['PUT'])
def put_customer(customer_id):
    """Updates a Customer"""

    customer = storage.get(Customer, customer_id)

    if not customer:
        abort(404)

    if not request.is_json:
        abort(400, description="Not a JSON")

    data = request.get_json()

    ignore_keys = ["id", "created_at", "updated_at"]

    for key, value in data.items():
        if key not in ignore_keys:
            setattr(customer, key, value)

    customer.save()

    return jsonify(customer.to_dict()), 201


# Implementation of DELETE method might be disabled

@app_views.route("/customers/<customer_id>", methods=['DELETE'])
@jwt_required
def delete_customer(customer_id):
    """Deletes a Customer object"""

    claims = get_jwt()
    role = claims.get("role")
    if role != "superuser":
        return jsonify({"error": "Access denied"}), 403

    customer = storage.get(Customer, customer_id)

    if not customer:
        abort(404)

    storage.delete(customer)
    storage.save()

    return jsonify({}), 200
