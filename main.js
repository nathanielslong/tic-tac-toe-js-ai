var current_letter = "X"

$('.clickable').click( function() {
  if ($(this).html() == "") {
    $(this).html(current_letter)
    current_letter = current_letter == "X" ? "O" : "X";
    $('#messages').html("");
    checkIfWon();
  } else {
    $('#messages').html("Please click a blank space!");
  }
})

function youWin(letter) {
  $('#messages').html(letter + " player won!");
  $('.display-none').removeClass('display-none')
}

function checkIfEmpty(id1, id2, id3) {
  return $(id1).html() !== "" && $(id2).html() !== "" && $(id3).html() !== "";
}

function checkIfWon() {
  switch(true) {
    case $('#sq1').html() == $('#sq2').html() && $('#sq1').html() == $('#sq3').html() && checkIfEmpty(sq1, sq2, sq3):
      youWin(current_letter);

    case $('#sq1').html() == $('#sq4').html() && $('#sq1').html() == $('#sq7').html() && checkIfEmpty(sq1, sq4, sq7):
      youWin(current_letter);

    case $('#sq1').html() == $('#sq5').html() && $('#sq1').html() == $('#sq9').html() && checkIfEmpty(sq1, sq5, sq9):
      youWin(current_letter);

    case $('#sq2').html() == $('#sq5').html() && $('#sq2').html() == $('#sq8').html() && checkIfEmpty(sq2, sq5, sq8):
      youWin(current_letter);

    case $('#sq3').html() == $('#sq6').html() && $('#sq3').html() == $('#sq9').html() && checkIfEmpty(sq3, sq6, sq9):
      youWin(current_letter);

    case $('#sq3').html() == $('#sq5').html() && $('#sq3').html() == $('#sq7').html() && checkIfEmpty(sq3, sq5, sq7):
      youWin(current_letter);

    case $('#sq4').html() == $('#sq5').html() && $('#sq4').html() == $('#sq6').html() && checkIfEmpty(sq4, sq5, sq6):
      youWin(current_letter);

    case $('#sq7').html() == $('#sq8').html() && $('#sq7').html() == $('#sq9').html() && checkIfEmpty(sq7, sq8, sq9):
      youWin(current_letter);

    default:
      break;
  }
}

function startNewGame() {
  for (i = 0; i < 9; i++) {
    $('#sq' + (i + 1)).html("");
  }
  current_letter = "X";
  $('#messages').html("");
  $('button').addClass('display-none')
}
