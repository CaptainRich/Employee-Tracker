
/* Commnands to recreate and use the database */
DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;
USE staff_db;

/* Define the employee table */
CREATE TABLE employee (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(11) UNSIGNED NOT NULL,
  manager_id INTEGER(11) UNSIGNED,
  department_id INTEGER(11) UNSIGNED,
  PRIMARY KEY (id) 
);

/* Define the employee role */
CREATE TABLE role (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INTEGER(11) UNSIGNED NOT NULL,
  PRIMARY KEY (id) 
);

/* Define the departments employees can belong to */
CREATE TABLE department (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id) 
);

/* Define the manager table */
CREATE TABLE managers (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  manager_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id) 
);