#!/usr/bin/python3
"""Contains Customer model"""

from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from models.base_model import BaseModel, Base


class Customer(BaseModel, Base):
    """Defines Customer model"""
    __tablename__ = 'customers'

    name = Column(String(128))
    phone = Column(String(20),
                   unique=True)
    email = Column(String(60),
                   unique=True)
    address = Column(String(1024))
    transactions = relationship("Transaction",
                                backref="customer",
                                cascade="all, delete, delete-orphan")
