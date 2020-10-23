const mysql = require("mysql");
const cTable = require("console.table");
const cTable = require("console.table");
const {viewDepartments, viewRoles, viewEmployees} = require("./view");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "octogon86",
    database: "employee_db"
});

var prompt = inquirer.createPromptModule();

module.exports = {
    
}