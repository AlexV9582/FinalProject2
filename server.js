// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var nodemon = require("nodemon")

var User = require("./models/userModel")
var Song = require("./models/songModel")

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "setList";
var collections = ["songs"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get("/index", function(req, res) {
    res.send("Hello World");
  });
  
  // 3. At the "/name" path, display every entry in the songs collection, sorted by name
  app.get("/name", function(req, res) {
    // Query: In our database, go to the songs collection, then "find" everything,
    // but this time, sort it by name (1 means ascending order)
    db.songs.find().sort({ name: 1 }, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.json(found);
      }
    });
  });


  // Set the app to listen on port 8080
app.listen(8080, function() {
    console.log("App running on port 8080!");
  });
  