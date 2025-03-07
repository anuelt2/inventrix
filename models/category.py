#!/usr/bin/python3
"""Contains Category model"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String


class Category(BaseModel, Base):
    """Defines the cateory model"""
    __tablename__ = 'categories'

    name = Column(String(60),
                  unique=True,
                  nullable=False)

    description = Column(String(1024))
