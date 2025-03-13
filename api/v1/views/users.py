#!/usr/bin/python3
"""View for User objects that handle all refault RESTFul API actions"""
from flask import jsonify, abort, request
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity

from api.v1.views import app_views
from models import storage
from models.user import User, UserRole


@app_views.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    """Retrieves list of all User objects"""

    claims = get_jwt()
    role = claims.get("role")
    if role not in ["superuser", "admin"]:
        return jsonify({"error": "Access denied"}), 403

    all_users = storage.all(User).values()

    users_list = []

    for user in all_users:
        user_dict = serialize_user_role(user)
        users_list.append(user_dict)

    if role == "admin":
        staff_users_list = []
        for staff_user in users_list:
            if staff_user["role"] == "staff":
                staff_users_list.append(staff_user)

        return jsonify(staff_users_list)

    return jsonify(users_list), 200


@app_views.route("/users/<user_id>/profile", methods=["GET"])
@jwt_required()
def get_user(user_id):
    """Retrieves a specific User profile"""

    current_user_id = get_jwt_identity()
    claims = get_jwt()
    current_user_role = claims.get("role")

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if current_user_id == user_id:
        pass

    elif current_user_role == "admin" and user.role.value == "staff":
        pass

    elif current_user_role == "superuser":
        pass

    else:
        return jsonify({"error": "Access denied"}), 403

    return jsonify(serialize_user_role(user)), 200


@app_views.route("/users/<user_id>/transactions", methods=["GET"])
@jwt_required()
def get_all_user_transactions(user_id):
    """Retrieves a specific User transactions"""

    current_user_id = get_jwt_identity()
    claims = get_jwt()
    current_user_role = claims.get("role")

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if (current_user_id != user_id and
            current_user_role not in ["superuser", "admin"]):
        return jsonify({"error": "Access denied"}), 403

    transactions = user.transactions

    return (jsonify([transaction.to_dict() for transaction in transactions]),
            200)


@app_views.route("/users/<user_id>/update-profile", methods=["PUT"])
@jwt_required()
def put_user(user_id):
    """Updates a User profile"""

    current_user_id = get_jwt_identity()

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if current_user_id == user_id:
        pass
    else:
        return jsonify({"error": "Access denied"}), 403

    if not request.is_json:
        abort(400, description="Not a JSON")

    data = request.get_json()

    ignore_keys = ["id", "created_at", "updated_at", "email",
                   "password", "role", "is_active"]

    for key, value in data.items():
        if key not in ignore_keys:
            setattr(user, key, value)

    user.save()

    return jsonify(serialize_user_role(user)), 200


@app_views.route("/users/<user_id>/status", methods=["PUT"])
@jwt_required()
def put_user_status(user_id):
    """Sets the `is_active` state of a User"""

    claims = get_jwt()
    current_user_role = claims.get("role")

    if current_user_role not in ["superuser", "admin"]:
        return jsonify({"error": "Access denied"}), 403

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if current_user_role == "admin" and user.role.value != "staff":
        return jsonify({"error": "Access denied"}), 403

    if not request.is_json:
        abort(400, description="Not a JSON")

    data = request.get_json()

    if "is_active" not in data:
        abort(400, description="Missing active status")

    if not isinstance(data["is_active"], bool):
        abort(400, description="Invalid status, must be true or false")

    user.is_active = data["is_active"]
    user.save()

    return jsonify(serialize_user_role(user)), 200


@app_views.route("/users/<user_id>/role", methods=["PUT"])
@jwt_required()
def put_user_role(user_id):
    """Sets the role of a User"""

    claims = get_jwt()
    role = claims.get("role")
    if role != "superuser":
        return jsonify({"error": "Access denied"}), 403

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if not request.is_json:
        abort(400, description="Not a JSON")

    data = request.get_json()

    if "role" not in data:
        abort(400, description="Missing role")

    value = data["role"]

    try:
        value = UserRole(value)
    except ValueError:
        abort(400, description="Invalid role")

    user.role = value
    user.save()

    return jsonify(serialize_user_role(user)), 200


@app_views.route("/users/<user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    """Deletes a User object"""

    claims = get_jwt()
    role = claims.get("role")
    if role != "superuser":
        return jsonify({"error": "Access denied"}), 403

    user = storage.get(User, user_id)

    if not user:
        abort(400)

    storage.delete(user)
    storage.save()

    return jsonify({}), 200


def serialize_user_role(user):
    """Converts User instance to dict and stringify `role` value"""

    user_dict = user.to_dict()

    if isinstance(user_dict["role"], UserRole):
        user_dict["role"] = user_dict["role"].value

    return user_dict
