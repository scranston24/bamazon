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
    loadProducts();
})

function loadProducts(inventory) {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw (err);
    console.table(res);
    promptForProduct(res);
  })
}

function promptForProduct(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "enter item ID"
      }
    ])

    .then(function(answer) {
      var choiceID = parseInt(answer.choice);
      console.log(choiceID);
      var product = checkInventory(choiceID, inventory);
      console.log(product);
      if(product) {
        promptForQuantity(product)
      } else {
        console.log("Sorry, we don't have that product...");
        loadProducts();
      }
    })
}

function promptForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase? "
      }
    ])

    .then(function(answer) {
      var quantity = parseInt(answer.quantity);
      console.log("Inside quantity prompt", quantity);
      if (quantity > product.stock_quantity) {
        console.log("Sorry, we don't have enough in stock to fulfill your order...");
        loadProducts();
      } else {
        makePurchase(product, quantity)
      }
    })
}

function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id =?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("\nYou have successfully purchased " + quantity + " " + product.product_name + "s for $" + product.price*quantity + "!");
      loadProducts();
    }
  )
}

function checkInventory(choiceID, inventory) {
  for (i = 0; i < inventory.length; i++) {
    if(inventory[i].item_id === choiceID) {
      return inventory[i];
    }
  }
  return null;
}
