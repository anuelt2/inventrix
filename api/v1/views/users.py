#!/usr/bin/python3
"""View for User objects that handle all refault RESTFul API actions"""
from flask import jsonify, abort, request

from api.v1.views import app_views
from models import storage
from models.user import User, UserRole


# @app_views.route("/users", methods=["GET"])
# def get_users():
#     """Retrieves list of all User objects"""
#     all_users = storage.all(User).values()
#     users_list = []
#     for user in all_users:
#         user_dict = serialize_user_role(user)
#         users_list.append(user_dict)
#     return jsonify(users_list)


@app_views.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    """Retrieves a specific User"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)
    return jsonify(serialize_user_role(user))


@app_views.route("/users/<user_id>", methods=["PUT"])
def put_user(user_id):
    """Updates a User"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)
    if not request.is_json:
        abort(400, description="Not a JSON")
    data = request.get_json()
    ignore_keys = ["id", "created_at", "updated_at",
                   "email", "role", "is_active"]
    for key, value in data.items():
        if key not in ignore_keys:
            setattr(user, key, value)
    user.save()
    return jsonify(serialize_user_role(user)), 200


@app_views.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    """Deletes a User object"""
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
