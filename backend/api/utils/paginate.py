#!/usr/bin/python3
"""API Utility methods"""

from models import storage
from flask import abort


def get_paginate_args(cls, **request_args):
    """
    Retrieve pagination arguments from a flask request.args object

    Paramaters:
    - request_args (dict): Flask request.args object

    Returns:
    - A dictionary containing pagination parameters or None
    """

    request_args.setdefault('page', 1)
    request_args.setdefault('limit', 10)

    page = int(request_args.get('page', 1))
    limit = int(request_args.get('limit', 10))
    total = storage.count(cls)
    total_pages = (total // limit) + (1 if total % limit else 0)

    request_args.update({'page': int(page),
                         'limit': limit,
                         'total': total,
                         'total_pages': int(total_pages),
                         'type': cls
                         })

    return request_args


def paginate(**paginate_args):
    """
    Paginate data.

    Parameters:
    - paginate_args (dict): A dictionary with at least the following keys:
        - cls (class): Model to paginate data of
        - page (int): page number data to return
        - limit (int): limit of data for each page
        - total (int): total data of cls
        - total_pages (int): total number of pages

    Returns:
    - 400 BAD REQUEST: If `total` < `limit` < 1
    - 400 BAD REQUEST: If `total_pages` < `page` < 1
    - paginate_args (dict): The same as the paginate_args argument updated
    with the paginated data in the key `data`
    """

    model = paginate_args.get('type')
    page = paginate_args.get('page')
    limit = paginate_args.get('limit')
    total = paginate_args.get('total')
    total_pages = paginate_args.get('total_pages')

# Modify (remove or limit > total)
    if limit < 1:
        message = f"Query parameter 'limit={limit}' is out of bounds. \
limit must be from 1 to {total}"
        return abort(400, message)

    if page < 1 or page > total_pages:
        message = f"Query paramter 'page={page}' is out of bounds. \
page must be from 1 to {total_pages}"
        return abort(400, message)

    results = storage.paginate_data(model, page, limit)
    if len(results) < 1:
        message = f"No results to show for {model.__class__.__name__}"
        return abort(404, message)

    data = [result.to_dict() for result in results]
    paginate_args.update({"data": data, 'type': model.__name__})

    return paginate_args
