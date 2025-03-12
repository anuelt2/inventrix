#!/usr/bin/python3
"""View for auth"""
import sys
from flask import jsonify, abort, request
from flask_jwt_extended import create_access_token, create_refresh_token
from flask_jwt_extended import JWTManager, get_jwt
from flask_jwt_extended import jwt_required, get_jwt_identity
from email_validator import validate_email, EmailNotValidError

from api.v1.auth import app_auth
from api.v1.auth.blocklist import blocklist
from models import storage
from models.user import User, UserRole


@app_auth.route("/register", methods=['POST'])
def register_user():
    """Create new user"""
    if not request.is_json:
        abort(400, description="Not a JSON")

    data = request.get_json()

    required_fields = ["first_name", "last_name",
                       "username", "email", "password"]
    for field in required_fields:
        if field not in data:
            abort(400, description=f"Missing {field}")

    email = data.get("email")
    try:
        valid = validate_email(email, check_deliverability=False)  # Change to True for production
        email = valid.email
    except EmailNotValidError:
        abort(400, description="Email not valid")

    existing_user = storage.get_by_attr(User, "username", data["username"])
    if existing_user:
        abort(400, description="Username already exists")

    existing_user = storage.get_by_attr(User, "email", data["email"])
    if existing_user:
        abort(400, description="Email already exists")

    new_user = User(**data)
    new_user.set_password(password=data["password"])
    new_user.save()
    return jsonify(serialize_user_role(new_user)), 201


@app_auth.route("/login", methods=['POST'])
def login_user():
    """Log user in"""
    if not request.is_json:
        abort(400, description="Not a JSON")

    data = request.get_json()

    required_fields = ["email", "password"]
    for field in required_fields:
        if field not in data:
            abort(400, description=f"Missing {field}")

    users = storage.get_by_attr(User, "email", data["email"])
    if users:
        user = users[0]
    if user.check_password(password=data["password"]):
        access_token = create_access_token(identity=user.email)
        refresh_token = create_refresh_token(identity=user.email)

        return jsonify(
                {
                    "message": "Logged In",
                    "tokens": {
                        "access": access_token,
                        "refresh": refresh_token
                        }
                    }
                ), 200
    return jsonify({"error": "Invalid email or password"}), 400


@app_auth.route("/logout", methods=['POST'])
@jwt_required()
def logout_user():
    """Log user out"""
    jti = get_jwt()["jti"]
    blocklist.add(jti)
    return jsonify({"message": "Logged out"}), 200


def serialize_user_role(user):
    """Converts User instance to dict and stringify `role` value"""
    user_dict = user.to_dict()
    if isinstance(user_dict["role"], UserRole):
        user_dict["role"] = user_dict["role"].value
    return user_dict
