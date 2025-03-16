#!/usr/bin/python3
"""API Blueprint for views"""
from flask import Blueprint

app_views = Blueprint("app_views", __name__, url_prefix="/api/v1")
from api.v1.views.index import *
from api.v1.views.products import *
from api.v1.views.transactions import *
from api.v1.views.suppliers import *
from api.v1.views.customers import *
from api.v1.views.users import *
from api.v1.views.categories import *
from api.v1.views.transaction_items import *
