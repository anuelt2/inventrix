#!/usr/bin/python3
"""
Database Storage Engine
"""

from os import getenv

import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

import models
from models.base_model import BaseModel, Base
from models.category import Category
from models.customer import Customer
from models.product import Product
from models.supplier import Supplier
from models.transaction import Transaction
from models.transaction_item import TransactionItem
from models.user import User

classes = {
        "Category": Category,
        "Customer": Customer,
        "Product": Product,
        "Supplier": Supplier,
        "Transaction": Transaction,
        "TransactionItem": TransactionItem,
        "User": User
        }


class DBStorage:
    """Interacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        IMS_MYSQL_USER = getenv('IMS_MYSQL_USER')
        IMS_MYSQL_PWD = getenv('IMS_MYSQL_PWD')
        IMS_MYSQL_HOST = getenv('IMS_MYSQL_HOST')
        IMS_MYSQL_DB = getenv('IMS_MYSQL_DB')
        IMS_ENV = getenv('IMS_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(IMS_MYSQL_USER,
                                             IMS_MYSQL_PWD,
                                             IMS_MYSQL_HOST,
                                             IMS_MYSQL_DB))
        if IMS_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """Query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """Add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """Commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """Delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """Reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """Call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return value

        return None

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())

        return count
