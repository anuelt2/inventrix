#!/usr/bin/python3
"""Index"""
from flask import jsonify

from api.v1.views import app_views
from models import storage
from models.category import Category
from models.customer import Customer
from models.product import Product
from models.supplier import Supplier
from models.transaction import Transaction
from models.transaction_item import TransactionItem
from models.user import User


@app_views.route("/status")
def status():
    """Status of API"""
    return jsonify({"status": "OK"})


@app_views.route("/stats")
def count():
    """Retrieves the number of objects by type"""
    return jsonify(
            {
                "categories": storage.count(Category),
                "customers": storage.count(Customer),
                "products": storage.count(Product),
                "suppliers": storage.count(Supplier),
                "transactions": storage.count(Transaction),
                "transaction_items": storage.count(TransactionItem),
                "users": storage.count(User)
                }
            )
