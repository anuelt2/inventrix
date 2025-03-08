#!/usr/bin/python3
"""Defines the Transaction model for inventrix"""
from models.base_model import BaseModel, Base
from sqlalchemy import (
        Column, String, Enum, ForeignKey, Numeric, DateTime, CheckConstraint)
from sqlalchemy.orm import relationship, validates
from datetime import datetime


class Transaction(BaseModel, Base):
    """Defines the transaction model"""
    __tablename__ = 'transactions'

    transaction_type = Column(Enum(
        'purchase', 'sale', name='transaction_type_enum'), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    supplier_id = Column(String(60), ForeignKey('suppliers.id'), nullable=True)
    customer_id = Column(String(60), ForeignKey('customers.id'), nullable=True)
    total_amount = Column(Numeric(10, 2), nullable=False, default=0.00)
    transaction_date = Column(
            DateTime, nullable=False, default=datetime.utcnow)
    transaction_items = relationship(
        'Transaction_item', backref='transaction', cascade="all, delete")

    __table_args__ = (
        CheckConstraint(
            "(transaction_type = 'sale' AND customer_id IS NOT NULL \
                    AND supplier_id IS NULL) OR "
            "(transaction_type = 'purchase' AND supplier_id IS NOT NULL \
                    AND customer_id IS NULL)",
            name="check_transaction_type"
        ),
    )

    def __init__(self, *args, **kwargs):
        """Initializes transaction"""
        super().__init__(*args, **kwargs)

    @validates('transaction_type', 'customer_id', 'supplier_id')
    def validate_transaction(self, key, value):
        """
        Ensures that customer_id and supplier_id are used
        correctly based on transaction_type.
        """
        if key in ['customer_id', 'supplier_id']:
            transaction_type = self.transaction_type

            if key == 'customer_id' and transaction_type == 'purchase':
                raise ValueError(
                        "customer_id should be NULL for purchase transactions")
            elif key == 'supplier_id' and transaction_type == 'sale':
                raise ValueError(
                        "supplier_id should be NULL for sale transactions")

        return value
