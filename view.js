const mysql = require("mysql");
const cTable = require("console.table");

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

module.exports = {

    viewDepartments: (viewChoices) => {
        //console.log("Running function...");
        connection.query("SELECT * FROM department", async function (err, res) {
            if (err) throw err;
            departments = await res;
            console.table(departments);
            viewChoices();
        });
    },

    viewRoles: (viewChoices) => {
        //console.log("Running function...")
        connection.query("SELECT * FROM role", async function (err, res) {
            if (err) throw err;
            departments = await res;
            console.table(departments);
            viewChoices();
        });
    },

    viewEmployees: (viewChoices) => {
        //console.log("Running function...")
        connection.query("SELECT * FROM employee", async function (err, res) {
            if (err) throw err;
            departments = await res;
            console.table(departments);
            viewChoices();
        });
    },

};