#!/usr/bin/python3
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt
from functools import wraps


def role_required(allowed_roles):
    """
    Decorator to enforce role-based access control.

    Args:
        allowed_roles (list): List of allowed user roles.

    Returns:
        Function: The wrapped function if access is granted.
    """
    def decorator(fn):
        @wraps(fn)
        @jwt_required()
        def wrapper(*args, **kwargs):
            claims = get_jwt()
            role = claims.get("role")

            if role not in allowed_roles:
                return jsonify({"error": "Access denied"}), 403

            return fn(*args, **kwargs)
        return wrapper
    return decorator
