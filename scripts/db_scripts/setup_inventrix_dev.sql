-- Creates a user inventrix_dev with password inventrix_dev_db
-- Creates a database inventrix_dev_db

CREATE USER IF NOT EXISTS 'inventrix_dev'@'localhost' IDENTIFIED BY 'inventrix_dev_pwd';
CREATE DATABASE IF NOT EXISTS inventrix_dev_db;

GRANT ALL PRIVILEGES ON inventrix_dev_db.* TO 'inventrix'@'localhost';
FLUSH PRIVILEGES;
