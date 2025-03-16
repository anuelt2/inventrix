#!/usr/bin/python3
"""View for User objects that handle all refault RESTFul API actions"""
from flask import jsonify, abort, request
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity

from api.v1.views import app_views
from models import storage
from models.user import User, UserRole
from models.transaction import Transaction
from api.utils.paginate import paginate, get_paginate_args
from api.utils.serialize_user_role import serialize_user_role


@app_views.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    """Retrieves list of all User objects"""

    claims = get_jwt()
    role = claims.get("role")
    if role not in ["superuser", "admin"]:
        return jsonify({"error": "Access denied"}), 403

    paginate_args = get_paginate_args(User, **request.args)
    paginated_users = paginate(**paginate_args)

    paginated_users["data"] = [serialize_user_role(user)
                               for user in paginated_users["data"]]

    if role == "admin":
        paginated_user["data"] = [user for user in paginated_users["data"]
                                  if user["role"] == "staff"]

    return jsonify(paginated_users), 200


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

    paginate_args = get_paginate_args(Transaction, **request.args)

    transactions_query = (storage.paginate_filter_data(
        Transaction, "user_id", user_id))

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
