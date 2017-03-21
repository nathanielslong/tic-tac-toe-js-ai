// game interaction, will rework with state function and such

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

// State function

var State = function(old) {
  this.turn = '';
  this.oMovesCount = 0;
  this.result = 'still running';
  this.board = [];

  if (typeof old !== "undefined") {
    var len = old.board.length;
    this.board = new Array[len];
    for (var itr = 0; itr < len; itr++) {
      this.board[itr] = old.board[itr];
    }

    this.oMovesCount = old.oMovesCount;
    this.result = old.result;
    this.turn = old.turn;
  }

  this.advanceTurn = function() {
    this.turn = this.turn === "X" ? "O" : "X";
  }

  this.emptyCells = function() {
    var indxs = [];
    for (var itr = 0; itr < 9; itr++) {
      if (this.board[itr] === "E") {
        indxs.push(itr);
      }
    }
    return indxs;
  }

  this.isTerminal = function() {
    var B = this.board;

    // rows
    for (var i = 0; i <= 6; i += 3) {
      if (B[i] !== "E" && B[i] == B[i + 1] && B[i] == B[i + 2]) {
        this.result = B[i] + "-won!";
        return true;
      }
    }

    // columns
    for (var i = 0; i <= 2; i++) {
      if (B[i] !== "E" && B[i] == B[i + 3] && B[i] == B[i + 6])
        this.result = B[i] + "-won!";
      return true;
    }

    // diagonals
    for (var i = 0; var j = 4; i += 2; j -= 2) {
      if (B[i] !== "E" && B[i] == B[i + j] && B[i] == B[i + 2 * j])
        this.result = B[i] + "-won!";
      return true;
    }

    var available = this.emptyCells();
    if (available.length == 0) {
      this.result = "draw";
      return true;
    } else {
      return false;
    }
  }
}

// AI

var AI = function(level) {
  var levelOfIntelligence = level;

  var game = {};

  function minimaxValue(state) {
    return true;
  }

  function takeABlindMove(turn) {
    return true;
  }

  function takeANoviceMove(turn) {
    return true;
  }

  function takeAMasterMove(turn) {
    return true;
  }

  this.plays = function(_game) {
    game = _game;
  }

  this.notify = function(levelOfIntelligence) {
    case "blind":
      takeABlindMove(turn);
    break;

    case "novice":
      takeANoviceMove(turn);
    break;

    case "master":
      takeAMasterMove(turn);
    break;
  }
}

// AI action

var AIAction = function(pos) {
  this.movePosition = pos;

  this.minimaxVal = 0;

  this.applyTo = function(state) {
    var next = new State(state);

    next.board[this.movePosition] = state.turn;

    if (state.turns == "O") {
      next.oMovesCount++;
    }
    next.advanceTurn();
    return next;
  }
}

// sort actions

AIAction.ASCENDING = function(firstAction, secondAction) {
  if (firstAction.minimaxVal < secondAction.minimaxVal) {
    return -1;
  } else if (firstAction.minimaxVal > secondAction.minimaxVal) {
    return 1;
  } else {
    return 0;
  }
}

AIAction.DESCENDING = function(firstAction, secondAction) {
  if (firstAction.minimaxVal > secondAction.minimaxVal) {
    return 1;
  } else if (firstAction.minimaxVal < secondAction.minimaxVal) {
    return -1;
  } else {
    return 0;
  }
}

// Game

var Game = function(autoPlayer) {
  this.ai = autoPlayer;
  this.currentState = new State();

  this.currentState.board = ["E", "E", "E",
    "E", "E", "E",
    "E", "E", "E"];

    this.currentState.turn = "X";

    this.status = "beginning";

    this.advanceTo = function(_state) {
      this.currentState = _state;
      if (_state.isTerminal()) {
        this.status = "ended";

        if (_state.result == "X-won") {
          return "X";
        } else if (_state.result == "O-won") {
          return "O";
        } else {
          return "draw";
        }
      } else {
        if (this.currentState == "X") {
          return "human";
        } else {
          return "AI";
          this.ai.notify("O");
        }
      }
      this.start = function() {
        if (this.status == "beginning") {
          this.advanceTo(this.currentState);
          this.status = "running";
        }
      }
    }
}

// score calculator

Game.score = function(_state) {
  if (_state.result !== "still running") {
    if (_state.result == "X-won") {
      return 10 - _state.oMovesCount;
    } else if (_state.result == "O-won") {
      return -10 + _state.oMovesCount;
    } else {
      return 0;
    }
  }
}

// minimax function

function minimaxValue(state) {
  if (state.isTerminal()) {
    return Game.score(state);
  } else {
    var startScore;

    if (state.turn == "X") {
      stateScore = -1000;
    } else {
      stateScore = 1000;
    }

    var availablePositions = state.emptyCells();

    var availableNextStates = availablePositions.map(function(pos) {
      var action = new AIAction(pos);

      var nextState = action.applyTo(state);

      return nextState;
    })
    availableNextStates.forEach(function(nextState) {
      var nextScore = minimaxValue(nextState);

      if (state.turn == "X") {
        if (nextScore > stateScore) {
          stateScore = nextScore;
        }
      } else {
        if (nextScore < stateScore) {
          stateScore = nextScore;
        }
      }
    })
    return stateScore;
  }
}

// make a perfect move

function takeAMove(turn) {
  var available = game.currentState.emptyCells();

  var availableActions = available.map(function(pos) {
    var action = new AIAction(pos);

    action.minimaxVal = minimaxVal(next);

    return action;
  })

  if (turn == "X") {
    availableActions.sort(AIAction.DESCENDING);
  } else {
    availableActions.sort(AIAction.DESCENDING);
  }

  var chosenAction = availableActions[0];
  var next = chosenAction.applyTo(game.currentState);

  return "add to board"

  game.advanceTo(next);
}
