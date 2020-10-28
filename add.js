const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { viewDepartments, viewRoles, viewEmployees } = require("./view");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "employee_db"
});

var prompt = inquirer.createPromptModule();

module.exports = {

    addDepartment: (addChoices) => {
        prompt({
            type: "input",
            message: "What is the name of the department you want to add?",
            name: "newDepartment"
        }).then(answer => {
            if (answer.newDepartment.length > 30) {
                console.log("Department name cannot be more than 30 characters in length. Try again...");
                addChoices();
            } else {
                connection.query("INSERT INTO department (name) VALUES (?)", [answer.newDepartment], async function (err, res) {
                    if (err) throw err;
                    let response = await res;
                    console.log("\n");
                    console.table(response);
                    console.log("Your new department has been added!")
                    addChoices();
                })
            }
        })
    },

    addRole: (addChoices) => {
        connection.query("SELECT id as department_id, name as department_name FROM department", async function (err, res) {
            if (err) throw err;
            let departments = await res;
            console.log("\n");
            console.table(departments);

            prompt([{
                type: "input",
                message: "What is the title of the role you want to add?",
                name: "title"
            },
            {
                type: "input",
                message: "What is the salary of the new role?",
                name: "salary"
            },
            {
                type: "number",
                message: "What is the ID of the department the new role is assigned to?",
                name: "department_id"
            }]).then(answer => {
                if (answer.title.length > 30) {
                    console.log("Department name cannot be more than 30 characters in length. Try again...");
                    addChoices();
                } else {
                    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.title, answer.salary, answer.department_id], async function (err, res) {
                        if (err) throw err;
                        let response = await res;
                        console.log("\n");
                        console.table(response);
                        // this causes errors because it calls viewChoices()
                        // viewRoles();
                        console.log("Your new role has been added!")
                        addChoices();
                    });
                };
            });
        });
    },

    addEmployee: (addChoices) => {
        connection.query("SELECT id as role_id, title, salary, department_id FROM role", async function (err, res) {
            if (err) throw err;
            let roles = await res;
            console.log("\n");
            console.table(roles);

            connection.query("SELECT employee.id as employee_id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id;", async function (err, res) {
                if (err) throw err;
                let employees = await res;
                console.log("\n");
                console.table(employees);



                prompt([{
                    type: "input",
                    message: "What is the first name of the employee you want to add?",
                    name: "first_name"
                },
                {
                    type: "input",
                    message: "What is the last name of the employee you want to add?",
                    name: "last_name"
                },
                {
                    type: "number",
                    message: "What is the role ID of the employee you want to add?",
                    name: "role_id"
                },
                {
                    type: "number",
                    message: "What is the ID of the manager this employee is assigned to? Enter 0 if the employee does not have a manager...",
                    name: "manager_id"
                }]).then(answer => {
                    if (answer.first_name.length > 30 || answer.last_name.length > 30) {
                        console.log("First and last names cannot be more than 30 characters in length. Try again...");
                        addChoices();
                    } else {
                        let query;
                        let values;
                        if (answer.manager_id === 0) {
                            query = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)";
                            values = [answer.first_name, answer.last_name, answer.role_id];
                        } else {
                            query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
                            values = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
                        };
                        connection.query(query, values, async function (err, res) {
                            if (err) throw err;
                            let response = await res;
                            console.table(response);
                            console.log("\n");
                            console.log("Your new employee has been added!");
                            addChoices();
                        });
                    };
                });
            });
        });
    },

};

