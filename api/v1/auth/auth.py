#!/usr/bin/python3
"""View for auth"""
from flask import jsonify, abort, request
from flask_jwt_extended import create_access_token, create_refresh_token

from api.v1.auth import app_auth
from models import storage
from models.user import User


@app_auth.route("/register", methods=['POST'])
def register_user():
    """"""
    pass


@app_auth.route("/login", methods=['POST'])
def login_user():
    """"""
    pass
