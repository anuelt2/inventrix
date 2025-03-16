#!/usr/bin/python3
"""View for Supplier objects that handle all default RESTFul API actions"""
from flask import jsonify, abort, request
from flask_jwt_extended import jwt_required, get_jwt

from api.v1.views import app_views
from models import storage
from models.supplier import Supplier
from models.product import Product
from models.transaction import Transaction
from api.utils.paginate import paginate, get_paginate_args


@app_views.route("/suppliers", methods=['GET'])
@jwt_required()
def get_suppliers():
    """Retrieves list of all Supplier objects"""

    paginate_args = get_paginate_args(Supplier, **request.args)
    suppliers = paginate(**paginate_args)

    return jsonify(suppliers), 200


@app_views.route("/suppliers/<supplier_id>", methods=['GET'])
@jwt_required()
def get_supplier(supplier_id):
    """Retrieves a specific Supplier"""

    supplier = storage.get(Supplier, supplier_id)

    if not supplier:
        abort(404)

    return jsonify(supplier.to_dict())


@app_views.route("/suppliers/<supplier_id>/transactions", methods=['GET'])
@jwt_required()
def get_all_supplier_transactions(supplier_id):
    """Retrieves a specific Supplier transactions"""

    supplier = storage.get(Supplier, supplier_id)

    if not supplier:
        abort(404)

    paginate_args = get_paginate_args(Transaction, **request.args)

    transactions_query = (storage.paginate_filter_data(
        Transaction, "supplier_id", supplier_id))

    paginate_args["total"] = transactions_query.count()

    paginate_args["total_pages"] = ((paginate_args[
        "total"] + paginate_args["limit"] - 1) // paginate_args["limit"])

    model = paginate_args.get("type")

    transactions = (transactions_query.offset((
        paginate_args["page"] - 1) * paginate_args["limit"]).
                    limit(paginate_args["limit"]).all())

    transactions_data = [transaction.to_dict() for transaction in transactions]

    return jsonify({
        "page": paginate_args["page"],
        "limit": paginate_args["limit"],
        "total": paginate_args["total"],
        "total_pages": paginate_args["total_pages"],
        "type": model.__name__,
        "data": transactions_data
        }), 200


@app_views.route("/suppliers/<supplier_id>/products", methods=['GET'])
@jwt_required()
def get_all_supplier_products(supplier_id):
    """Retrieves a specific Supplier products"""

    supplier = storage.get(Supplier, supplier_id)

    if not supplier:
        abort(404)

    paginate_args = get_paginate_args(Product, **request.args)

    products_query = (storage.paginate_filter_data(
        Product, "supplier_id", supplier_id))

    paginate_args["total"] = products_query.count()

    paginate_args["total_pages"] = ((paginate_args[
        "total"] + paginate_args["limit"] - 1) // paginate_args["limit"])

    model = paginate_args.get("type")

    products = (products_query.offset((
        paginate_args["page"] - 1) * paginate_args["limit"]).
                    limit(paginate_args["limit"]).all())

    products_data = [product.to_dict() for product in products]

    return jsonify({
        "page": paginate_args["page"],
        "limit": paginate_args["limit"],
        "total": paginate_args["total"],
        "total_pages": paginate_args["total_pages"],
        "type": model.__name__,
        "data": products_data
        }), 200


@app_views.route("/suppliers", methods=['POST'])
@jwt_required()
def post_supplier():
    """Creates a new Supplier"""

    claims = get_jwt()
    role = claims.get("role")
    if role not in ["superuser", "admin"]:
        return jsonify({"error": "Access denied"}), 403

    if not request.is_json:
        abort(400, description="Not a JSON")

    data = request.get_json()

    if "name" not in data:
        abort(400, description="Missing name")
    if "phone" not in data:
        abort(400, description="Missing phone")
    if "email" not in data:
        abort(400, description="Missing email")

    existing_supplier = storage.get_by_attr(Supplier, name=data["name"])
    if existing_supplier:
        abort(400, description="Supplier name taken")

    existing_supplier = storage.get_by_attr(Supplier, phone=data["phone"])
    if existing_supplier:
        abort(400, description="Supplier phone number taken")

    existing_supplier = storage.get_by_attr(Supplier, email=data["email"])
    if existing_supplier:
        abort(400, description="Supplier email taken")

    new_supplier = Supplier(**data)
    new_supplier.save()

    return jsonify(new_supplier.to_dict()), 201


@app_views.route("/suppliers/<supplier_id>", methods=['PUT'])
@jwt_required()
def put_supplier(supplier_id):
    """Updates a Supplier"""

    claims = get_jwt()
    role = claims.get("role")
    if role not in ["superuser", "admin"]:
        return jsonify({"error": "Access denied"}), 403

    supplier = storage.get(Supplier, supplier_id)

    if not supplier:
        abort(404)

    if not request.is_json:
        abort(400, description="Not a JSON")

    data = request.get_json()
    ignore_keys = ["id", "created_at", "updated_at"]

    supplier_name = data.get("name")

    if supplier_name and supplier_name != supplier.name:
        existing_supplier = storage.get_by_attr(Supplier, name=data["name"])
        if existing_supplier and existing_supplier[0].id != supplier.id:
            abort(400, description="Supplier name taken")

    supplier_phone = data.get("phone")

    if supplier_phone and supplier_phone != supplier.phone:
        existing_supplier = storage.get_by_attr(Supplier, phone=data["phone"])
        if existing_supplier and existing_supplier[0].id != supplier.id:
            abort(400, description="Supplier phone number taken")

    supplier_email = data.get("email")

    if supplier_email and supplier_email != supplier.email:
        existing_supplier = storage.get_by_attr(Supplier, email=data["email"])
        if existing_supplier and existing_supplier[0].id != supplier.id:
            abort(400, description="Supplier email taken")

    for key, value in data.items():
        if key not in ignore_keys:
            setattr(supplier, key, value)

    supplier.save()

    return jsonify(supplier.to_dict()), 200


# Implementation of DELETE method might be disabled

@app_views.route("/suppliers/<supplier_id>", methods=['DELETE'])
@jwt_required()
def delete_supplier(supplier_id):
    """Deletes a Supplier object"""

    claims = get_jwt()
    role = claims.get("role")
    if role != "superuser":
        return jsonify({"error": "Access denied"}), 403

    supplier = storage.get(Supplier, supplier_id)

    if not supplier:
        abort(400)

    storage.delete(supplier)
    storage.save()

    return jsonify({}), 200
