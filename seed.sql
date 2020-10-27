USE employee_db;

INSERT INTO department (name)
VALUES  ("Admin"), ("Store");

INSERT INTO role (title, salary, department_id)
    VALUES 
        ("CEO", 70000, 1), 
        ("Human Resources Lead", 70000, 1),
        ("Store Lead", 70000, 2), 
        ("Stocker", 70000, 2), 
        ("Salesperson", 70000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES 
        ("Veronica", "Corningstone", 1, null), 
        ("Brick", "Tamland", 2, 1), 
        ("Ron", "Burgundy", 3, 1), 
        ("Champ", "Kind", 4, 3), 
        ("Brian", "Fantana", 5, 3);