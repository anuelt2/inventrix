#!/usr/bin/python3
"""
Database Storage Engine
"""

from os import getenv

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from models.base_model import BaseModel, Base
from models.category import Category
from models.customer import Customer
from models.supplier import Supplier
from models.product import Product
from models.transaction import Transaction
from models.user import User
from models.transaction_item import TransactionItem


classes = {
            'Category': Category,
            'Customer': Customer,
            'Supplier': Supplier,
            'Product': Product,
            'Transaction': Transaction,
            'User': User,
            'TransactionItem': TransactionItem
            }


class DBStorage:
    """Interacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        IMS_MYSQL_USER = getenv('IMS_MYSQL_USER', 'inventrix_dev')
        IMS_MYSQL_PWD = getenv('IMS_MYSQL_PWD', 'inventrix_dev_pwd')
        IMS_MYSQL_HOST = getenv('IMS_MYSQL_HOST', 'localhost')
        IMS_MYSQL_DB = getenv('IMS_MYSQL_DB', 'inventrix_dev_db')
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
        self.__session = scoped_session(sess_factory)

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

        all_cls = self.all(cls)
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
                count += len(self.all(clas).values())
        else:
            count = len(self.all(cls).values())

        return count

    def get_by_attr(self, cls, key, value):
        """
        Retrieve object(s) of cls with attribute matching key: value

        Parameters:
            cls (class): Model to query
            key (str): Attribute to filter by
            value (str): Value of @key

        Returns: A list of all object(s) that fit the criteria
        """

        query = self.__session.query(cls).filter_by(**{key: value}).all()
        return query

    def paginate_data(self, cls, page, limit):
        """Return the output from parginated requests"""
        return self.__session.query(cls).offset(
            (page - 1) * limit).limit(limit).all()
