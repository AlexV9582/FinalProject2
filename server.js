// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var nodemon = require("nodemon")
var mongoose   = require("mongoose");

var User = require("./models/userModel")
var Song = require("./models/songModel")

// Initialize Express
var app = express();

// Use body parser with our app
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./routes/htmlRoutes")(app);

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/setList");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

var userName;
// Routes
app.get("/api/addSongs/:username", function(req, res) {
    Song.find({username: req.params.userName}, function(error, songs) {
      if (error) {
        res.send(error);
      } else {
        res.send(songs)
      }
    })
  });

// This will get the users from the mongoDB
app.post("/api/users", function(req, res) {
   // FInd user info in collection
   console.log(req.body)
   User.find({ username: req.body.username, password: req.body.password }, function(error, user) {
    if (error) {
      res.send(error);
    } else if (user.length) {
      userName = user[0].username
      res.send(user[0].username);
    } else {
      res.send("User not found")
    }
  })
}); 

//Add new user to db
app.post("/api/newUser", function(req, res) {
  var info = new User(req.body);
  // Now, save that entry to the db
  info.save(function(err, doc) {
    // Log any errors
    if (err) {
      res.send(err);
    }
    // Or log the doc
    else {
      res.send(doc);
    }
  })
});

//Add new song to db
app.post("/api/newSong", function(req, res) {
  var info = new Song(req.body);
  // Now, save that entry to the db
  info.save(function(err, doc) {
    // Log any errors
    if (err) {
      res.send(err);
    }
    // Or log the doc
    else {
      res.send(doc);
    }
  })
});

  // Set the app to listen on port 8080
app.listen(8080, function() {
    console.log("App running on port 8080!");
  });
