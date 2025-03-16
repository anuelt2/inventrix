#!/usr/bin/python3
"""User API Routes utility method"""

from models import storage
from models.user import User, UserRole


def serialize_user_role(user):
    """Converts User instance to dict and stringify `role` value"""

    if user is None:
        return {}

    if isinstance(user, dict):
        user_dict = user
    else:
        user_dict = user.to_dict()

    if "role" in user_dict and isinstance(user_dict["role"], UserRole):
        user_dict["role"] = user_dict["role"].value

    return user_dict
