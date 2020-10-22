const mysql = require("mysql");
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

    viewDepartments: () => {
        console.log("Running function...");
        connection.query("SELECT * FROM department", async function (err, res) {
            if (err) throw err;
            let departments = await res;
            console.log(departments);
        })
    },

    viewRoles: () => {
        console.log("Running function...")

    },

    viewEmployees: () => {
        console.log("Running function...")

    },

};