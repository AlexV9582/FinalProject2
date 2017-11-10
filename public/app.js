function displayResults(songs) {
    // First, empty the table
    $("tbody").empty();
  
    // Then, for each entry of that json...
    songs.forEach(function(song) {
      // Append each of the song's properties to the table
      $("tbody").append(`<tr><td>${song.title}</td><td>${song.key}</td></tr>`);
    });
  }
  
  // 1: On Load
// ==========

// First thing: ask the back end for json with all songs
$.getJSON("/addSongs", function(data) {
    // Call our function to generate a table body
    displayResults(data);
  });