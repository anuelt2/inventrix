#!/usr/bin/python3
"""Implement RESTFul APIs for Transaction object"""
from flask import jsonify, abort, make_response, request

from api.v1.views import app_views
from models import storage
from models.transaction import Transaction
from models.user import User
from models.customer import Customer
from models.supplier import Supplier
from models.product import Product
from models.transaction_item import TransactionItem
from api.utils.role_decorator import role_required


@app_views.route('/transactions', methods=['GET'])
@role_required(["superuser", "admin", "staff"])
def get_transactions():
    """Retrieve the list of all transactions"""
    total = storage.count(Transaction)

    # Get query parameters (default to page 1, all items)
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=10, type=int)
    if page < 1 or limit < 1:
        abort(404)

    total_pages = (total // limit) + (1 if total % limit else 0)
    if page > total_pages or limit > total:
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
        "total_pages": total_pages,
        "data": transactions_list
    }), 200)


@app_views.route('/transactions/<transaction_id>', methods=['GET'])
@role_required(["superuser", "admin", "user"])
def get_transaction(transaction_id):
    """Retrieves a transaction"""
    transaction = storage.get(Transaction, transaction_id)
    if not transaction:
        abort(404)
    return jsonify(transaction.to_dict())


@app_views.route('/transactions/<transaction_id>', methods=['DELETE'])
@role_required(["superuser"])
def delete_transaction(transaction_id):
    """Deletes a transaction object"""
    transaction = storage.get(Transaction, transaction_id)
    if not transaction:
        abort(404)

    storage.delete(transaction)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/transactions', methods=['POST'])
@role_required(["superuser", "admin", "staff"])
def post_transact():
    """Add a new transaction object"""
    data = request.get_json(silent=True)
    if data is None:
        abort(400, "Not a JSON")
    if 'transaction_type' not in data:
        abort(400, "Missing transaction_type")
    if 'user_id' not in data:
        abort(400, "Missing user_id")
    if 'transaction_items' not in data:
        abort(400, "Missing transaction_item(s)")
    if not isinstance(data['transaction_items'], list):
        abort(400, "Invalid transaction_items (must be a list)")

    # Ensure user is a valid user
    a_valid_user = storage.get(User, data['user_id'])
    if not a_valid_user:
        abort(404)

    transaction_items = data['transaction_items']
    del data['transaction_items']

    # Enusure customer or supplier is valid
    if data['transaction_type'] == 'sale':
        if data['customer_id']:
            a_valid_customer = storage.get(Customer, data['customer_id'])

            if not not a_valid_customer:
                new_customer = Customer()
                new_customer.save()
                data['customer_id'] = new_customer.id
        else:
            new_customer = Customer()
            new_customer.save()
            data['customer_id'] = new_customer.id
    else:
        if data['supplier_id']:
            a_valid_supplier = storage.get(Supplier, data['supplier_id'])

            if not a_valid_supplier:
                abort(404)

    # Validate transaction by transaction type
    try:
        transaction = Transaction(**data)
    except Exception as e:
        return make_response(jsonify({"error": str(e)})), 409

    transaction_item_objs = []
    total_amount = 0

    # Process transaction items
    items = transaction_items
    if not items:
        abort(400, "Transaction must contain at least an item")

    for item in items:
        item = dict(item)
        if not isinstance(item, dict):
            abort(400, "Invalid transaction item format")

        product_id = item.get("product_id")
        quantity = item.get("quantity")
        unit_price = item.get("unit_price")
        total = item.get("total")

        if not product_id:
            abort(400, "Missing product_id in transaction item")
        if not quantity:
            abort(400, f"Missing quantity for product_id {product_id}")
        if not unit_price:
            abort(400, f"Missing unit_price for product_id {product_id}")
        if not total:
            abort(400, f"Missing total for product_id {product_id}")

        # Ensure the product exists
        product = storage.get(Product, product_id)
        if not product:
            abort(404, f"Product with id {product_id} not found")

        # Create transaction item object
        transaction_item = TransactionItem(**item)
        transaction_item.transaction_id = transaction.id
        transaction_item_objs.append(transaction_item)
        total_amount += total

    # Assign total amount and save transaction
    transaction.total_amount = total_amount
    transaction.save()

    # Save all transaction items
    for transaction_item in transaction_item_objs:
        transaction_item.save()

    # Retrieve and format response
    transaction = storage.get(Transaction, transaction.id)
    if not transaction:
        abort(404, "Invalid transaction")

    transaction_items = [
            t_item.to_dict() for t_item in transaction.transaction_items]
    transaction_dict = transaction.to_dict()
    transaction_dict.update({'transaction_items': transaction_items})

    return make_response(jsonify(transaction_dict), 201)


@app_views.route('/transactions/<transaction_id>', methods=['PUT'])
@role_required(["superuser", "staff"])
def put_transaction(transaction_id):
    """Updates exiting data of a transaction object"""
    transaction = storage.get(Transaction, transaction_id)
    if not transaction:
        abort(404)

    data = request.get_json(silent=True)
    if data is None:
        abort(400, "Not a JSON")

    if 'transaction_items' in data:
        transaction_items = data['transaction_items']
        del data['transaction_items']
    # Skip data
    skip = ['id', 'user_id', 'total_amount', 'created_at', 'updated_at']

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

    # Process transaction items
    items = transaction_items
    if not items:
        transaction.save()

        # Retrieve and format response
        transaction = storage.get(Transaction, transaction.id)
        if not transaction:
            abort(404, "Invalid transaction")
        transaction_items = [
            t_item.to_dict() for t_item in transaction.transaction_items]
        transaction_dict = transaction.to_dict()
        transaction_dict.update({'transaction_items': transaction_items})

        return make_response(jsonify(transaction_dict), 200)

    transaction_item_objs = []
    total_amount = 0

    for item in items:
        item = dict(item)
        if not isinstance(item, dict):
            abort(400, "Invalid transaction item format")

        product_id = item.get("product_id")
        quantity = item.get("quantity")
        unit_price = item.get("unit_price")
        total = item.get("total")

        if not product_id:
            abort(400, "Missing product_id in transaction item")
        if not quantity:
            abort(400, f"Missing quantity for product_id {product_id}")
        if not unit_price:
            abort(400, f"Missing unit_price for product_id {product_id}")
        if not total:
            abort(400, f"Missing total for product_id {product_id}")

        # Ensure the product exists
        product = storage.get(Product, product_id)
        if not product:
            abort(404, f"Product with id {product_id} not found")

        # Create transaction item object
        transaction_item = TransactionItem(**item)
        transaction_item.transaction_id = transaction.id
        transaction_item_objs.append(transaction_item)
        total_amount += total

    # Assign total amount and save transaction
    transaction.total_amount = total_amount
    transaction.save()

    # Save all transaction items
    for transaction_item in transaction_item_objs:
        transaction_item.save()

    # Retrieve and format response
    transaction = storage.get(Transaction, transaction.id)
    if not transaction:
        abort(404, "Invalid transaction")

    transaction_items = [
            t_item.to_dict() for t_item in transaction.transaction_items]
    transaction_dict = transaction.to_dict()
    transaction_dict.update({'transaction_items': transaction_items})

    return make_response(jsonify(transaction_dict), 200)
