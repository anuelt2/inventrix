#!/usr/bin/python3
"""Contains Supplier model"""

from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from models.base_model import BaseModel, Base


class Supplier(BaseModel, Base):
    """Defines Supplier model"""
    __tablename__ = 'suppliers'
    name = Column(String(128),
                  unique=True,
                  nullable=False)
    contact_person = Column(String(128))
    phone = Column(String(60),
                   nullable=False)
    email = Column(String(60),
                   unique=True)
    address = Column(String(1024))
    products = relationship("Product",
                            backref="supplier",
                            cascade="save-update, merge")
