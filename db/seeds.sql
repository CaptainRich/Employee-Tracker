

INSERT INTO department (name)
VALUES
('Engineering'),
('Sales');


INSERT INTO role (title, salary, department_id)
VALUES
('Project_Engineer', 70000.00, 1),
('Sales_account_rep', 50000.00, 2),
('Manager_Eng', 90000.00, 1),
('Manager_Sales', 75000.00, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Joe', 'Blow', 1, 3),
('Sally', 'Smith', 2, 4),
('Bob', 'EngMgr', 1, 3),
('Joyce', 'SalesMgr', 2, 4);

