#!/usr/bin/python3
"""Implement RESTFul APIs for Transaction object"""
from flask import jsonify, abort, make_response, request

from api.v1.views import app_views
from models import storage
from models.transaction import Transaction
from models.user import User
from models.customer import Customer
from models.supplier import Supplier


@app_views.route('/transactions', methods=['GET'])
def get_transactions():
    """Retrieve the list of all transactions"""
    try:
        total = storage.count(Transaction)

        # Get query parameters (default to page 1, all items)
        page = request.args.get('page', default=1, type=int)
        limit = request.args.get('limit', default=total, type=int)
        if page < 1 or limit < 1:
            abort(404)

        # Fetch paginated data
        transactions = storage.paginate_data(Transaction, page, limit)

        transactions_list = [transact.to_dict() for transact in transactions]
        if not transactions_list:
            abort(404)

        return make_response(jsonify({
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": (total // limit) + (1 if total % limit else 0),
            "data": transactions_list
        }), 200)

    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 500)


@app_views.route('/transactions/<transaction_id>', methods=['GET'])
def get_transaction(transaction_id):
    """Retrieves a transaction"""
    transaction = storage.get(Transaction, transaction_id)
    if not transaction:
        abort(404)
    return jsonify(transaction.to_dict())


@app_views.route('/transactions/<transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    """Deletes a transaction object"""
    transaction = storage.get(Transaction, transaction_id)
    if not transaction:
        abort(404)

    storage.delete(transaction)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/transactions', methods=['POST'])
def post_transaction():
    """Add a new transaction object"""
    data = request.get_json(silent=True)
    if data is None:
        abort(400, "Not a JSON")
    if 'transaction_type' not in data:
        abort(400, "Missing transaction_type")
    if 'user_id' not in data:
        abort(400, "Missing user_id")
    if 'total_amount' not in data:
        abort(400, "Missing total_amount")
    if not data.get("customer_id") and not data.get("supplier_id"):
        abort(400, "Missing customer_id or supplier_id")

    # Ensure user is a valid user
    a_valid_user = storage.get(User, data['user_id'])
    if not a_valid_user:
        abort(404)

    # Validate transaction by transaction type
    try:
        transaction = Transaction(**data)
    except Exception as e:
        return make_response(jsonify({"error": str(e)})), 409

    # Enusure customer or supplier is valid
    if transaction.transaction_type == 'sale':
        a_valid_customer = storage.get(Customer, transaction.customer_id)
        if not a_valid_customer:
            abort(404)
    else:
        a_valid_supplier = storage.get(Supplier, transaction.supplier_id)
        if not a_valid_supplier:
            abort(404)

    transaction.save()
    return make_response(jsonify(transaction.to_dict()), 201)


@app_views.route('/transactions/<transaction_id>', methods=['PUT'])
def put_transaction(transaction_id):
    """Updates exiting data of a transaction object"""
    transaction = storage.get(Transaction, transaction_id)
    if not transaction:
        abort(404)

    data = request.get_json(silent=True)
    if data is None:
        abort(400, "Not a JSON")

    # Skip data
    skip = ['id', 'user_id', 'created_at', 'updated_at']

    # Set attributes and validate transaction by transaction type
    try:
        for key, value in data.items():
            if key not in skip:
                setattr(transaction, key, value)
    except Exception as e:
        return make_response(jsonify({"error": str(e)})), 409

    # Enusure customer or supplier is valid
    if transaction.transaction_type == 'sale':
        a_valid_customer = storage.get(Customer, transaction.customer_id)
        if not a_valid_customer:
            abort(404)
    else:
        a_valid_supplier = storage.get(Supplier, transaction.supplier_id)
        if not a_valid_supplier:
            abort(404)

    transaction.save()
    return make_response(jsonify(transaction.to_dict()), 200)
