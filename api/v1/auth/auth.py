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
from api.utils.serialize_user_role import serialize_user_role


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

    existing_user = storage.get_by_attr(User, username=data["username"])

    if existing_user:
        abort(400, description="Username already exists")

    existing_user = storage.get_by_attr(User, email=data["email"])

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

    users = storage.get_by_attr(User, email=data["email"])

    if not users:
        return jsonify({"error": "Invalid email or password"}), 400

    user = users[0]

    if user.check_password(password=data["password"]):
        role = user.role.value
        access_token = create_access_token(identity=user.id,
                                           additional_claims={"role": role})
        refresh_token = create_refresh_token(identity=user.id)

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


@app_auth.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    """Fetch logged-in user details"""

    print(request.headers.get("Authorization")) # Debugging
    current_user_id = get_jwt_identity()
    user = storage.get(User, current_user_id)

    if not user:
        abort(404, description="User not found")

    return jsonify(serialize_user_role(user)), 200


@app_auth.route("/logout", methods=['POST'])
@jwt_required()
def logout_user():
    """Log user out"""

    jti = get_jwt()["jti"]
    blocklist.add(jti)

    return jsonify({"message": "Logged out"}), 200


@app_auth.route("/refresh", methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    """Generates new access token utilizing a refresh token"""

    current_user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user_id)

    return jsonify({"access_token": new_access_token}), 200
