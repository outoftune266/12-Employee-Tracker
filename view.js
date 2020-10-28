const mysql = require("mysql");
const cTable = require("console.table");

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

module.exports = {

    viewDepartments: (viewChoices) => {
        //console.log("Running function...");
        connection.query("SELECT * FROM department", async function (err, res) {
            if (err) throw err;
            let departments = await res;
            console.table(departments);
            viewChoices();
        });
    },

    viewRoles: (viewChoices) => {
        //console.log("Running function...")
        connection.query("SELECT * FROM role", async function (err, res) {
            if (err) throw err;
            let roles = await res;
            console.table(roles);
            viewChoices();
        });
    },

    viewEmployees: (viewChoices) => {
        //console.log("Running function...")
        connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id;", async function (err, res) {
            if (err) throw err;
            let employees = await res;
            console.table(employees);
            viewChoices();
        });
    },

};