#!/usr/bin/python3
"""View for Supplier objects that handle all default RESTFul API actions"""
from flask import jsonify, abort, request

from api.v1.views import app_views
from models import storage
from models.supplier import Supplier


@app_views.route("/suppliers", methods=['GET'])
def get_suppliers():
    """Retrieves list of all Supplier objects"""
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
def post_supplier():
    """Creates a new Supplier"""
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
def put_supplier(supplier_id):
    """Updates a Supplier"""
    supplier = storage.get(Supplier, supplier_id)
    if not supplier:
        abort(404)
    if not request.is_json:
        abort(400, description="Not a JSON")

    data = request.get_json()
    ignore_keys = ["id", "created_at", "updated_at"]

    if "name" in data and data["name"] != supplier.name:
        existing_supplier = storage.get_by_attr(Supplier, "name", data["name"])
        if existing_supplier and existing_supplier[0].id != supplier.id:
            abort(400, description="Supplier name taken")

    if "phone" in data and data["phone"] != supplier.name:
        existing_supplier = storage.get_by_attr(Supplier, "phone", data["phone"])
        if existing_supplier and existing_supplier[0].id != supplier.id:
            abort(400, description="Supplier phone number taken")

    if "email" in data and data["email"] != supplier.name:
        existing_supplier = storage.get_by_attr(Supplier, "email", data["email"])
        if existing_supplier and existing_supplier[0].id != supplier.id:
            abort(400, description="Supplier email taken")

    for key, value in data.items():
        if key not in ignore_keys:
            setattr(supplier, key, value)
    supplier.save()
    return jsonify(supplier.to_dict()), 200


# Implementation of DELETE method might be disabled

@app_views.route("/suppliers/<supplier_id>", methods=['DELETE'])
def delete_supplier(supplier_id):
    """Deletes a Supplier object"""
    supplier = storage.get(Supplier, supplier_id)
    if not supplier:
        abort(400)
    storage.delete(supplier)
    storage.save()
    return jsonify({}), 200
