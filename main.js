var current_letter = "X"

$('.clickable').on('click', clickEvent)

function checkIfAllOccupied(id1, id2, id3, id4, id5, id6, id7, id8, id9) {
  return $(id1).html() !== "" &&
         $(id2).html() !== "" &&
         $(id3).html() !== "" &&
         $(id4).html() !== "" &&
         $(id5).html() !== "" &&
         $(id6).html() !== "" &&
         $(id7).html() !== "" &&
         $(id8).html() !== "" &&
         $(id9).html() !== "";
}

function checkIfEmpty(id1, id2, id3) {
  return $(id1).html() !== "" && $(id2).html() !== "" && $(id3).html() !== "";
}

function checkIfEqual(id1, id2, id3) {
  return $(id1).html() == $(id2).html() && $(id1).html() == $(id3).html();
}

function checkIfWon() {
  switch(true) {
    case checkIfEqual(sq1, sq2, sq3) && checkIfEmpty(sq1, sq2, sq3):
      youWin(current_letter);
      break;

    case checkIfEqual(sq1, sq4, sq7) && checkIfEmpty(sq1, sq4, sq7):
      youWin(current_letter);
      break;

    case checkIfEqual(sq1, sq5, sq9) && checkIfEmpty(sq1, sq5, sq9):
      youWin(current_letter);
      break;

    case checkIfEqual(sq2, sq5, sq8) && checkIfEmpty(sq2, sq5, sq8):
      youWin(current_letter);
      break;

    case checkIfEqual(sq3, sq6, sq9) && checkIfEmpty(sq3, sq6, sq9):
      youWin(current_letter);
      break;

    case checkIfEqual(sq3, sq5, sq7) && checkIfEmpty(sq3, sq5, sq7):
      youWin(current_letter);
      break;

    case checkIfEqual(sq4, sq5, sq6) && checkIfEmpty(sq4, sq5, sq6):
      youWin(current_letter);
      break;

    case checkIfEqual(sq7, sq8, sq9) && checkIfEmpty(sq7, sq8, sq9):
      youWin(current_letter);
      break;

    case checkIfAllOccupied(sq1, sq2, sq3, sq4, sq5, sq6, sq7, sq8, sq9):
      $('#messages').html("It's a draw! Play again?");
      $('.display-none').removeClass('display-none');
      break;

    default:
      break;
  }
}

function clickEvent() {
  if ($(this).html() == "") {
    $(this).html(current_letter)
    $('#messages').html("");
    $(this).removeClass('clickable').off('click');
    checkIfWon();
    current_letter = current_letter == "X" ? "O" : "X";
  }
}

function startNewGame() {
  for (i = 0; i < 9; i++) {
    $('#sq' + (i + 1)).html("").addClass('clickable').on('click', clickEvent);
  }
  current_letter = "X";
  $('#messages').html("");
  $('button').addClass('display-none')
}

function youWin(letter) {
  $('#messages').html(letter + " player won!");
  $('.display-none').removeClass('display-none');
  for (i = 0; i < 9; i++) {
    $('#sq' + (i + 1)).removeClass('clickable').off('click');
  }
}
