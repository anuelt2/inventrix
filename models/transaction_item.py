#!/usr/bin/python3
"""TransactionItem Model"""
from models.base_model import Base, BaseModel
from sqlalchemy import Column, Integer, String, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship


class TransactionItem(BaseModel, Base):
    """Defines the TransactionItem model"""
    __tablename__ = 'transaction_items'

    quantity = Column(Integer,
                      nullable=False,
                      default=0)

    unit_price = Column(DECIMAL(10, 2),
                        nullable=False,
                        default=0.0)

    total = Column(DECIMAL(10, 2),
                   nullable=False,
                   default=quantity * unit_price)

    transaction_id = Column(String(60),
                            ForeignKey('transactions.id'),
                            nullable=False)

    product_id = Column(String(60),
                        ForeignKey('products.id'),
                        nullable=False)

    product = relationship('Product', backref='transaction_items')
