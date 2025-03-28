#!/usr/bin/python3
"""Contains Supplier model"""

from sqlalchemy import Column, String, Table, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship

from models.base_model import BaseModel, Base


supplier_product = Table("supplier_product", Base.metadata,
                         Column("supplier_id", String(60),
                                ForeignKey("suppliers.id",
                                           ondelete="RESTRICT"),
                                primary_key=True),
                         Column("product_id", String(60),
                                ForeignKey("products.id",
                                           ondelete="RESTRICT"),
                                primary_key=True),
                         UniqueConstraint("supplier_id",
                                          "product_id",
                                          name="uq_supplier_product"))


class Supplier(BaseModel, Base):
    """Defines Supplier model"""
    __tablename__ = 'suppliers'

    name = Column(String(128),
                  unique=True,
                  nullable=False)
    contact_person = Column(String(128))
    phone = Column(String(60),
                   unique=True,
                   nullable=False)
    email = Column(String(60),
                   unique=True,
                   nullable=False)
    address = Column(String(1024))
    products = relationship("Product",
                            secondary=supplier_product,
                            back_populates="suppliers")
    transactions = relationship("Transaction",
                                backref="supplier")
