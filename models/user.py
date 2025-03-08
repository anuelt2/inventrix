#!/usr/bin/python3
"""Module for User"""

import enum
from sqlalchemy import Column, String, Boolean, Enum
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

from models.base_model import BaseModel, Base


class UserRole(enum.Enum):
    """Defines user roles"""
    SUPERUSER = "superuser"
    ADMIN = "admin"
    STAFF = "staff"


class User(BaseModel, Base):
    """Defines User model"""
    __tablename__ = 'users'

    first_name = Column(String(128),
                        nullable=False)
    last_name = Column(String(128),
                       nullable=False)
    username = Column(String(60),
                      unique=True,
                      nullable=False)
    email = Column(String(128),
                   unique=True,
                   nullable=False)
    password = Column(String(128),
                           nullable=False)
    role = Column(Enum(UserRole),
                  default=UserRole.STAFF,
                  nullable=False)
    is_active = Column(Boolean,
                       default=False)
    transactions = relationship("Transaction",
                                backref="users")

    def __repr__(self):
        """String representation of User"""
        return (
                f"<User {self.username}, "
                f"Role: {self.role}, "
                f"Active: {self.is_active}>"
                )

    def set_password(self, password):
        """Hash password before storing"""
        self.password = generate_password_hash(password)

    def check_password(self, password):
        """Verify password on login"""
        return check_password_hash(self.password, password)
