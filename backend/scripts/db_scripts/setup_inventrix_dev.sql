-- Creates a user inventrix_dev with password inventrix_dev_db
-- Creates a database inventrix_dev_db

CREATE DATABASE IF NOT EXISTS inventrix_dev_db;
CREATE USER IF NOT EXISTS 'inventrix_dev'@'localhost' IDENTIFIED BY 'inventrix_dev_pwd';

GRANT ALL PRIVILEGES ON inventrix_dev_db.* TO 'inventrix_dev'@'localhost';
FLUSH PRIVILEGES;
