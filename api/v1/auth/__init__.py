#!/usr/bin/python3
"""API Blueprint for auth"""
from flask import Blueprint

app_auth = Blueprint("app_auth", __name__, url_prefix="/api/v1/auth")
