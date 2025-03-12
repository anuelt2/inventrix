#!/usr/bin/python3
"""View for Supplier objects that handle all default RESTFul API actions"""
from flask import jsonify, abort, request
from flask_jwt_extended import JWTManager, jwt_required, get_jwt

from api.v1.views import app_views
from models import storage
from models.supplier import Supplier


@app_views.route("/suppliers", methods=['GET'])
@jwt_required()
def get_suppliers():
    """Retrieves list of all Supplier objects"""

    claims = get_jwt()
    role = claims.get("role")
    if role != "superuser" or role != "admin":
        return jsonify({"error": "Access denied"}), 403

    all_suppliers = storage.all(Supplier).values()

    return jsonify([supplier.to_dict() for supplier in all_suppliers])


@app_views.route("/suppliers/<supplier_id>", methods=['GET'])
def get_supplier(supplier_id):
    """Retrieves a specific Supplier"""

    supplier = storage.get(Supplier, supplier_id)

    if not supplier:
        abort(404)

    return jsonify(supplier.to_dict())


@app_views.route("/suppliers", methods=['POST'])
@jwt_required()
def post_supplier():
    """Creates a new Supplier"""

    claims = get_jwt()
    role = claims.get("role")
    if role != "superuser" or role != "admin":
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

    existing_supplier = storage.get_by_attr(Supplier, "name", data["name"])
    if existing_supplier:
        abort(400, description="Supplier name taken")

    existing_supplier = storage.get_by_attr(Supplier, "phone", data["phone"])
    if existing_supplier:
        abort(400, description="Supplier phone number taken")

    existing_supplier = storage.get_by_attr(Supplier, "email", data["email"])
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
    if role != "superuser" or role != "admin":
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
        existing_supplier = storage.get_by_attr(Supplier, "name", data["name"])
        if existing_supplier and existing_supplier[0].id != supplier.id:
            abort(400, description="Supplier name taken")

    supplier_phone = data.get("phone")

    if supplier_phone and supplier_phone != supplier.phone:
        existing_supplier = storage.get_by_attr(Supplier,
                                                "phone", data["phone"])
        if existing_supplier and existing_supplier[0].id != supplier.id:
            abort(400, description="Supplier phone number taken")

    supplier_email = data.get("email")

    if supplier_email and supplier_email != supplier.email:
        existing_supplier = storage.get_by_attr(Supplier,
                                                "email", data["email"])
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
