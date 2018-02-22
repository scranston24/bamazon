var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
console.log("Greetings, welcome to Bamazon!");

//Creating connection from MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if(err) {
    console.log("error" + err.stack);
  }
    console.log("You have successfully connected to the database!");
})

connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw (err);
  console.table(res);
  console.log("Thanks for coming!");
  connection.end();
})

// var questions = [{
//   type: "input",
//   name: "item_id",
//   message: "What would you like to purchase? Please enter the item_id!"
// }, {
//   type: "input",
//   name: "quantity",
//   message: "How many would you like to purchase?"
// }];
