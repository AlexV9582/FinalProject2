function displaySet(songs) {
    // First, empty the table
    $("tbody").empty();

    for (i=0; i < songs.length; i++) {
      $("tbody").append(`<tr><td>${songs[i].title}</td><td>${songs[i].key}</td></tr>`);
    }
  }

    // Then, for each entry of that json...
  //   songs.forEach(function(song) {
  //     // Append each of the song's properties to the table
  //     $("tbody").append(`<tr><td>${song.title}</td><td>${song.key}</td></tr>`);
  //   });
  // }
  
  // 1: On Load
// ==========
var url = window.location.href;
var splitUrl = url.split("/");

// First thing: ask the back end for json with all songs
$.getJSON("/addSongs/" + splitUrl[4]).done(function(data) {
  // Call our function to generate a table body
  displaySet(data);
  console.log(data)
}) 

$("#newSong").on("click", function() {
  event.preventDefault();
  var songInfo = {
      userName: splitUrl[4],
      songName: $("#songName").val(),
      Key: $("#key").val(),
      Set: $("#set").val()
  }
  console.log(songInfo)
  $.post("/newSong", songInfo, function(songdata) {
      console.log(songdata);
  })
  $("#songName").val("");
  $("#key").val("");
  $("#set").val("");
})