

INSERT INTO department (name)
VALUES
('Engineering'),
('Sales');


INSERT INTO role (title, salary, department_id)
VALUES
('Project Engineer', 70000, 1),
('Sales account rep', 50000, 2),
('Manager Eng', 90000, 1)
('Manager Sales', 75000, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Joe', 'Blow', 1, 3),
('Sally', 'Smith', 2, 4),
('Bob', 'EngMgr', 1, 3),
('Joyce', 'SalesMgr', 2, 4);

