#!/usr/bin/python3
"""Contains Customer model"""

from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from models.base_model import BaseModel, Base


class Customer(BaseModel, Base):
    """Defines Customer model"""
    __tablename__ = 'customers'

    name = Column(String(128))
    phone = Column(String(20))
    email = Column(String(60))
    address = Column(String(1024))
    transactions = relationship("Transaction",
                                backref="customer",
                                cascade="all, delete, delete-orphan")
