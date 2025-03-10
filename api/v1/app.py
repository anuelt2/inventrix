#!/usr/bin/python3
"""Flask Application"""
from os import getenv

from flask import Flask, jsonify

from models import storage
from api.v1.views import app_views
from api.v1.auth import app_auth

app = Flask(__name__)
app.url_map.strict_slashes = False

app.register_blueprint(app_views)
app.register_blueprint(app_auth)


@app.teardown_appcontext
def close_storage(exceptions=None):
    """Close storage"""
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """404 Error"""
    return jsonify({"error": "Not found"}), 404


if __name__ == "__main__":
    app.run(
            host=getenv("IMS_API_HOST", default="0.0.0.0"),
            port=int(getenv("IMS_API_PORT", default="5000")),
            threaded=True,
            debug=True
            )
