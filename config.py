#!/usr/bin/python3
"""Config file"""
from os import getenv
from dotenv import load_dotenv


load_dotenv()


class Config:
    """Config class for Flask app"""

    SECRET_KEY = getenv("SECRET_KEY")
    JWT_SECRET_KEY = getenv("JWT_SECRET_KEY")
    DEBUG = getenv("DEBUG", "True") == "True"  # False in production

    IMS_MYSQL_USER = getenv('IMS_MYSQL_USER', 'inventrix_dev')
    IMS_MYSQL_PWD = getenv('IMS_MYSQL_PWD', 'inventrix_dev_pwd')
    IMS_MYSQL_HOST = getenv('IMS_MYSQL_HOST', 'localhost')
    IMS_MYSQL_DB = getenv('IMS_MYSQL_DB', 'inventrix_dev_db')
    IMS_ENV = getenv('IMS_ENV', "development")
    IMS_MYSQL_URI = 'mysql+mysqldb://{}:{}@{}/{}'.format(IMS_MYSQL_USER,
                                                         IMS_MYSQL_PWD,
                                                         IMS_MYSQL_HOST,
                                                         IMS_MYSQL_DB)
