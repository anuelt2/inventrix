-- Creates a user inventrix_test with password inventrix_test_db
-- Creates a database inventrix_test_db

CREATE DATABASE IF NOT EXISTS inventrix_test_db;
CREATE USER IF NOT EXISTS 'inventrix_test'@'localhost' IDENTIFIED BY 'inventrix_test_pwd';

GRANT ALL PRIVILEGES ON inventrix_test_db.* TO 'inventrix_test'@'localhost';
FLUSH PRIVILEGES;
