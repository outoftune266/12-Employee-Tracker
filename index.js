// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { viewDepartments, viewRoles, viewEmployees } = require("./view");
const { addDepartment, addRole, addEmployee } = require("./add");

const connection = mysql.createConnection({
    host: "localhost",

    port: "3306",

    user: "root",

    password: "octogon86",
    database: "employee_db"
});

var prompt = inquirer.createPromptModule();

connection.connect(function (err) {
    if (err) throw err;
    startApp();
});

function startApp() {
    console.log("Welcome to the Employee Management System")
    prompt({
        type: "list",
        message: "What function would you like to preform?",
        choices: ["View Departments/Roles/Employees", "Add Departments/Roles/Employees", "Update Employee Roles", "Quit"],
        name: "choice"
    }).then(response => {
        if (response.choice === "View Departments/Roles/Employees") {
            viewChoices();
        } else if (response.choice === "Add Departments/Roles/Employees") {
            addChoices();
        } else if (response.choice === "Update Employee Roles") {
            getEmployees();
        } else if (response.choice === "Quit") {
            connection.end();
            process.exit();
        };
    });
};

function viewChoices() {
    prompt({
        type: "list",
        message: "What information do you want to view?",
        choices: ["Departments", "Roles", "Employees", "Exit to main menu"],
        name: "choice"
    }).then(response => {
        if (response.choice === "Departments") {
            viewDepartments(viewChoices);
        } else if (response.choice === "Roles") {
            viewRoles(viewChoices);
        } else if (response.choice === "Employees") {
            viewEmployees(viewChoices);
        } else if (response.choice === "Exit to main menu") {
            startApp();
        };
    });
};

function addChoices() {
    prompt({
        type: "list",
        message: "What type of information do you want to add?",
        choices: ["Add new Departments", "Add new Roles", "Add new Employees", "Exit to main menu"],
        name: "choice"
    }).then(response => {
        if (response.choice === "Add new Departments") {
            addDepartment(addChoices);
        } else if (response.choice === "Add new Roles") {
            addRole(addChoices);
        } else if (response.choice === "Add new Employees") {
            addEmployee(addChoices);
        } else if (response.choice === "Exit to main menu") {
            startApp();
        };
    });
};

// Variables used to update roles
let employeeList = [];
let employeeQuestion = {
    type: "list",
    message: "What is the last name of the Employee do you want to update roles for?",
    name: "employee"
};
let roleList = [];
let roleQuestion = {
    type: "list",
    message: "What is the new Role you are assigning the employee to?",
    name: "role"
};
let updateQuestions = [];
let roles;

// Functions that update roles
function getEmployees() {
    connection.query("SELECT * FROM employee", async function (err, res) {
        if (err) throw err;
        let employees = await res;
        for (var i = 0; i < employees.length; i++) {
            employeeList.push(res[i].last_name);
        };
        getRoles()
    });
};

function getRoles() {
    connection.query("SELECT * FROM role;", async function (err, res) {
        if (err) throw err;
        roles = await res;
        for (var i = 0; i < roles.length; i++) {
            roleList.push(roles[i].title);
        };
        console.log(roles);
        combineQuestions();
    });

};

function combineQuestions() {
    Object.assign(employeeQuestion, { choices: employeeList });
    Object.assign(roleQuestion, { choices: roleList });
    updateQuestions.push(employeeQuestion);
    updateQuestions.push(roleQuestion);
    //console.log(updateQuestions);
    updateEmployee();
};

function updateEmployee() {
    console.log(roleList);
    //console.table(employees);
    let roleID;
    prompt(updateQuestions).then(response => {
        console.log(response.role);
        for (var i = 0; i < roles.length; i++) {
            if (roles[i].title === response.role) {
                roleID = roles[i].id;
            };
        };
        connection.query("UPDATE employee SET role_id = ? WHERE last_name = ?;", [roleID, response.employee], async function (err, res) {
            if (err) throw err;
            let response = await res;
            console.log(response);
            viewEmployees(viewChoices);
        });
    });
};
