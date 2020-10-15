DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT, 
    department_name VARCHAR(30) NOT NULL, 
    PRIMARY KEY (id)

); 

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR (30) NOT NULL, 
    salary DECIMAL (10, 2), 
    department_id INTEGER NOT NULL, 
    FOREIGN KEY (department_id) REFERENCES department(id), 
    PRIMARY KEY (id)
); 

CREATE TABLE emp (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR (30) NOT NULL, 
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER NOT NULL, 
    FOREIGN KEY (role_id) REFERENCES roles(id), 
    manager_id INTEGER, 
    FOREIGN KEY (manager_id) REFERENCES emp(id),
    PRIMARY KEY (id)
); 