const mysql = require("mysql");
const inquirer = require("inquirer");
const consoletable = require("console.table");
const {viewDepartments, viewRoles, viewEmployees} = require("./view");
const {addDepartment, addRole, addEmployee} = require("./add");

const connection = mysql.createConnection({
    host: "localhost",

    port: "3306",

    user: "root",

    password: "",
    database: "top_songsDB"
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
            updateRole();
        } else if (response.choice === "Quit") {
        connection.end();
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
        // needs some type async/await
        if (response.choice === "Departments") {  
            viewDepartments();
            viewChoices();
        } else if (response.choice === "Roles") {
            viewRoles();
            viewChoices();
        } else if (response.choice === "Employees") {
            viewEmployees();
            viewChoices();
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
            addDepartment();
            addChoices();
        } else if (response.choice === "Add new Roles") {
            addRole();
            addChoices();
        } else if (response.choice === "Add new Employees") {
            addEmployee();
            addChoices();
        } else if (response.choice === "Exit to main menu") {
            startApp();
        };
    });
};

function updateRole() {
    prompt({
        type: "list",
        message: "Which Employee do you want to update roles for?",
        choices: ["Exit to main menu"],
        name: "choice"
    }).then(response => {
        if (response.choice === "Exit to main menu") {
            startApp();
        };
    });
};