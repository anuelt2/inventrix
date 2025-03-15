#!/usr/bin/python3
"""Define transaction_items endpoints"""

from api.v1.views import app_views
from models.transaction import Transaction
from models.transaction_item import TransactionItem
from models import storage
from flask import make_response, jsonify, abort, request
from api.utils.role_decorator import role_required


@app_views.route('/transactions/<transaction_id>/transaction_items',
                 methods=['GET'])
def get_transaction_transaction_items(transaction_id=None):
    """
    Retrieve all TransactionItem objects of a Transaction object
    linked to `transaction_id`

    Parameters:
        transaction_id (str): `id` of the Transaction object. (required)

    Returns:
        404 NOT FOUND: If `transaction_id` is not linked to any
        Transaction object.
        200 OK: If `transaction_id` is linked to a Transaction object.
        The response body will contain the Transaction object.
    """

    transaction = storage.get(Transaction, transaction_id)
    if not transaction:
        message = f"Transaction '{transaction_id}' doesn't exist"
        abort(404, message)

    transaction_items = transaction.transaction_items
    transaction_items = [transaction_item.to_dict() for transaction_item in
                         transaction_items]

    for transaction_item in transaction_items:
        total = transaction_item.get('total', None)
        unit_price = transaction_item.get('unit_price', None)
        transaction_item.update({'total': float(total),
                                 'unit_price': float(unit_price)})

    response = make_response(jsonify(transaction_items))
    return response


@app_views.route('/transactions/<transaction_id>/transaction_items/\
<transaction_item_id>', methods=['GET'])
def get_transaction_transaction_item_by_id(transaction_id,
                                           transaction_item_id):
    """
    Retrieve a TransactionItem object linked to `transaction_item_id` of a
    Transaction object linked to `transaction_id`

    Paramaters:
    - transaction_id (str): `id` of the Transaction object (required)
    - transaction_item_id (str): `id` of the TransactionItem object (required)

    Returns:
    - 404 NOT FOUND: If `transaction_id` is not linked to any
    Transaction object
    - 404 NOT FOUND: If `transaction_item_id` is not linked to any
    TransactionItem object
    - 404 NOT: If the TransactionItem object linked to `transaction_item_id`
    is not linked to the Transaction object linked to `transaction_id`
    - 200 OK: If `transaction_id` is linked to a Transaction object linked
    to a TransactionItem object linked to `transaction_item_id` exists.
    The body of the response will contain the TransactionItem object
    """

    transaction = storage.get(Transaction, transaction_id)
    if not transaction:
        message = f"Transaction '{transaction_id}' doesn't exist."
        abort(404, message)

    transaction_item = storage.get(TransactionItem, transaction_item_id)
    if not transaction_item:
        message = f"TransactionItem '{transaction_item_id}' doesn't exist."
        abort(404, message)

    if transaction_item.transaction_id != transaction_id:
        message = f"TransactionItem '{transaction_item_id}' is not linked to \
Transaction '{transaction_id}'."
        abort(404, message)

    transaction_item = transaction_item.to_dict()
    total = transaction_item.get('total', None)
    unit_price = transaction_item.get('unit_price', None)
    transaction_item.update({'total': float(total),
                             'unit_price': float(unit_price)})

    response = make_response(jsonify(transaction_item))
    return response


@app_views.route('/transactions/<transaction_id>/transaction_items/\
<transaction_item_id>', methods=['PUT'])
@role_required(['admin', 'superuser'])
def update_transaction_item_by_id(transaction_id, transaction_item_id):
    """
    Update TransactionItem object linked to `transaction_item_id` of a
    Transaction object linked to `transaction_id`

    Paramaters:
    - transaction_id (str): `id` of the Transaction object (required)
    - transaction_item_id (str): `id` of the TransactionItem object (required)

    Returns:
    - 404 NOT FOUND: If `transaction_id` is not linked to any
    Transaction object
    - 404 NOT FOUND: If `transaction_item_id` is not linked to any
    TransactionItem object
    - 404 NOT: If the TransactionItem object linked to `transaction_item_id`
    is not linked to the Transaction object linked to `transaction_id`
    - 200 OK: If `transaction_id` is linked to a Transaction object linked
    to a TransactionItem object linked to `transaction_item_id` exists.
    The body of the response will contain the TransactionItem object
    """

    if not request.is_json:
        message = "Request body is not a valid JSON object"
        abort(400, message)

    transaction = storage.get(Transaction, transaction_id)
    if not transaction:
        message = f"Transaction {transaction_id} doesn't exist."
        abort(404, message)

    transaction_item = storage.get(TransactionItem, transaction_item_id)
    if not transaction_item:
        message = f"TransactionItem {transaction_item_id} doesn't exist."
        abort(404, message)

    if transaction_item.transaction_id != transaction_id:
        message = f"TransactionItem '{transaction_item_id}' is not linked to \
Transaction '{transaction_id}'."
        abort(404, message)

    ignore_keys = ['id',
                   'created_at',
                   'updated_at',
                   'transaction_id',
                   'product_id']

    request_body = request.get_json()
    request_body = {k: v for k, v in request_body.items() if
                    k not in ignore_keys}

    unit_price = request_body.get('unit_price', None)
    quantity = request_body.get('quantity', None)
    total = unit_price * quantity
    request_body.update({'total': total})

    for key, value in request_body.items():
        setattr(transaction_item, key, value)

    transaction_item.save()

    transaction_item = storage.get(TransactionItem, transaction_item_id)

    response = make_response(jsonify(transaction_item.to_dict()))
    return response


@app_views.route('/transactions/<transaction_id>/transaction_items/\
<transaction_item_id>', methods=['DELETE'])
@role_required(['admin', 'superuser'])
def delete_transaction_item_by_id(transaction_id, transaction_item_id):
    """
    Delete a TransactionItem object linked to `transaction_item_id` of a
    Transaction object linked to `transaction_id`

    Parameters:
    - transaction_id (str): `id` of Transaction object
    - transaction_item_id (str): `id` of the TransactionItem object

    Returns:
    - 404 NOT FOUND: If `transaction_id` is not linked to any
    Transaction object
    - 404 NOT FOUND: If `transaction_item_id` is not linked to any
    TransactionItem object
    - 404 NOT: If the TransactionItem object linked to `transaction_item_id`
    is not linked to the Transaction object linked to `transaction_id`
    - 200 OK: If the TransactionItem object was successfully deleted.
    The body of the response will be an empty dictionary
    """

    transaction = storage.get(Transaction, transaction_id)
    if not transaction:
        message = f"Transaction '{transaction_id}' doesn't exist."
        abort(404, message)

    transaction_item = storage.get(TransactionItem, transaction_item_id)
    if not transaction_item:
        message = f"TransactionItem '{transaction_item_id}' doesn't exist."
        abort(404, message)

    if transaction_item.transaction_id != transaction_id:
        message = f"TransactionItem '{transaction_item_id}' is not linked to \
Transaction {transaction_id}."
        abort(404, message)

    transaction_item.delete()
    storage.save()

    response = make_response(jsonify({}))
    return response
