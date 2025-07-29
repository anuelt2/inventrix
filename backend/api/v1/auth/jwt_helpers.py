#!/usr/bin/python3
"""Check blocklist for tokens"""
from flask_jwt_extended import get_jwt

from api.v1.auth.jwt_setup import jwt
from api.v1.auth.blocklist import blocklist


@jwt.token_in_blocklist_loader
def check_token_blocklist(jwt_header, jwt_payload):
    """Checks blocklist to see if token is valid or revoked"""
    jti = jwt_payload["jti"]
    return jti in blocklist
