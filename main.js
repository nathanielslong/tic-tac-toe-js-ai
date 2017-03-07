// Thoughts: eventually want to add a bot of some sort to this, so make sure we set this up fairly nicely
// 3x3 board
// alternating O and X
// Three in a row wins

var current_letter = "X"

$('.clickable').click( function() {
  if ($(this).html == "") {
    $(this).html(current_letter);
    current_letter = current_letter == "X" ? "O" : "X";
    $('#messages').html("");
  } else {
    $('#messages').html("Click a blank space!");
  }
})

