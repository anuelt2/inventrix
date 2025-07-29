from models.engine.db_storage import DBStorage
from models.base_model import Base

storage = DBStorage()
storage.reload()
