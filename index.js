const mysql = require("mysql");
const inquirer = require("inquirer");
const consoletable = require("console.table");

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
    connection.end()
}