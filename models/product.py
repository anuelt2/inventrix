#!/usr/bin/python3
"""Defines the Product model for inventrix"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, Text, Numeric, ForeignKey


class Product(BaseModel, Base):
    """Defines the product class attributes"""
    __tablename__ = 'products'
    name = Column(String(128), unique=True, nullable=False)
    brand = Column(String(128), nullable=True)
    model = Column(String(128), nullable=True)
    description = Column(Text, nullable=True)
    sku = Column(String(60), unique=True, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    stock_quantity = Column(Integer, nullable=False, default=0)
    category_id = Column(String(60), ForeignKey('categories.id'), nullable=False)
    reorder_level = Column(Integer, nullable=False, default=10)
    # supplier_id = Column(String(60), ForeignKey('suppliers.id'), nullable=False)

    def __init__(self, *args, **kwargs):
        """Initializes products"""
        super().__init__(*args, **kwargs)
