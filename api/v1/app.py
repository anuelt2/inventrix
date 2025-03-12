#!/usr/bin/python3
"""Flask Application"""
from os import getenv

from flask import Flask, jsonify, make_response

from models import storage
from api.v1.views import app_views
from api.v1.auth import app_auth
from config import Config
from api.v1.auth.jwt_setup import jwt

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config.from_object(Config)

jwt.init_app(app)

from api.v1.auth.jwt_helpers import check_token_blocklist

app.register_blueprint(app_views)
app.register_blueprint(app_auth)


@jwt.token_in_blocklist_loader
def check_token_revoke_status(jwt_header, jwt_payload):
    """Checks revoke status of token"""
    return check_token_blocklist(jwt_header, jwt_payload)


@app.teardown_appcontext
def close_storage(exceptions=None):
    """Close storage"""
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """404 Error"""
    response = make_response(jsonify({"error": error.description}), 404)
    return response


@app.errorhandler(400)
def bad_request(error):
    """400 error"""
    response = make_response(jsonify({"error": error.description}), 400)
    return response


if __name__ == "__main__":
    app.run(
            host=getenv("IMS_API_HOST", default="0.0.0.0"),
            port=int(getenv("IMS_API_PORT", default="5000")),
            threaded=True,
            debug=True  # Change to False for production
            )
