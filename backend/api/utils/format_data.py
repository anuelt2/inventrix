#!/usr/bin/python3
"""Utility method to format data to arrange columns in specific order"""
from collections import OrderedDict

def format_data(data_dict, column_order):
    """Format table data to order columns in specific order"""

    if not isinstance(data_dict, dict) or "data" not in data_dict:
        return []
    
    data = data_dict["data"]

    if not isinstance(data, list):
        return []
    
    formatted = []
    for row in data:
        if isinstance(row, dict):
            formatted_row = OrderedDict((col, row.get(col, None)) for col in column_order)
            formatted.append(formatted_row)

    data_dict["data"] = formatted
    return data_dict