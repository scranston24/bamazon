var mysql = require("mysql");
var inquirer = require("inquirer");

//Creating connection from MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
// });

var questions = [{
  type: "input",
  name: "item_id",
  message: "What would you like to purchase? Please enter the item_id!"
}, {
  type: "input",
  name: "quantity",
  message: "How many would you like to purchase?"
}];
