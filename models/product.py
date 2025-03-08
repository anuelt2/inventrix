#!/usr/bin/python3
"""Defines the Product model for inventrix"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, Text, Numeric, ForeignKey, Table
from sqlalchemy.orm import relationship


product_supplier = Table(
    'product_supplier', Base.metadata,
    Column('product_id', Integer, ForeignKey('products.id')),
    Column('supplier_id', Integer, ForeignKey('suppliers.id'))
)

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
    category_id = Column(String(60), ForeignKey('category.id'), nullable=False)
    reorder_level = Column(Integer, nullable=False, default=10)
    supplier_id = Column(String(60), ForeignKey('supplier.id'), nullable=False)
    suppliers = relationship(
        'Supplier', secondary=product_supplier, backref='products')

    def __init__(self, *args, **kwargs):
        """Initializes products"""
        super().__init__(*args, **kwargs)
