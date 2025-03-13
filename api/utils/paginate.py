#!/usr/bin/python3
"""API Utility methods"""

from models import storage
from flask import abort


def paginate(cls, page, limit, total, total_pages):
    """
    Paginate data from a `cls`.

    Parameters:
    - cls (model): Model to paginate data of
    - page (int): page number data to return
    - limit (int): limit of data for each page
    - total (int): total data of cls
    - total_pages (int): total number of pages

    Returns:
    - 400 BAD REQUEST: If `total` < `limit` < 1
    - 400 BAD REQUEST: If `total_pages` < `page` < 1
    - 200 OK: The body of the response will contain the paginated data
    """

    if limit < 1 or limit > total:
        message = f"Query parameter 'limit={limit}' is out of bounds. \
limit must be from 1 to {total}"
        return abort(400, message)

    if page < 1 or page > total_pages:
        message = f"Query paramter 'page={page}' is out of bounds. \
page must be from 1 to {total_pages}"
        return abort(400, message)

    results = storage.paginate_data(cls, page, limit)
    if len(results) < 1:
        message = f"No results to show for {cls.__class__.__name__}"
        return abort(404, message)

    data = [result.to_dict() for result in results]
    results = {"page": page,
               "limit": limit,
               "total": total,
               "total_pages": total_pages,
               "data": data
               }

    return results
