/* Mongoose Example (Solution) (18.3.03)
 * ===================================== */

// Dependency
var mongoose = require("mongoose");

// Create the Schema class
var Schema = mongoose.Schema;

// Instantiate a userSchema object with the Schema class we just made
var SongSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  // songName is a string. We will trim any trailing whitespace. It's also required
  songName: {
    type: String,
    trim: true,
    required: "Song Name is Required"
  },
  // Key is a string. We will trim any trailing whitespace. It's also required
  // It has a custom validate function that checks the length of the input
  // If it's less than six chars, mongoose will throw an error
  Key: {
    type: String,
    trim: true,
    required: "Key is Required",
  },
  // Set is a string, and it must be a unique one in our collection
  // Notice how it must match our regex, which checks for Set
  Set: {
    type: String,
    unique: true,
  },
  // This will make a userCreated entry in our doc, by default the current time string.
  userCreated: {
    type: Date,
    default: Date.now
  }
});

// Create the "Song" model with our SongSchema schema
var Song = mongoose.model("Song", SongSchema);

// Export the Song model, so it can be used in server.js with a require
module.exports = Song;
