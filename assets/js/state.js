// This function constructs and initiates all states in the game. Each state is essentially a configuration of the game grid, including whose turn it is, result of the current game state, and how many moves remain for the computer player.

// Game is represented as an array of length 9 containing each square.

// State is initialized with the old state of the game, in order to have a reference to advance the game.
var State = function(old) {
  // Sets whose turn it is (human or ai)
  this.turn = "";
  // O Moves Count: number of moves for the AI player
  this.oMovesCount = 0;
  // result: the result of the game given the current state
  this.result = "still running";

  this.board = [];

  // This conditional is the object constructor. if old exists, the state is constructed given the parameters of the old state.
  if (typeof old !== "undefined") {
    // the next 5 lines copy the previous board state to the current board
    var len = old.board.length;
    this.board = new Array(len);
    for (var i = 0; i < len; i++) {
      this.board[i] = old.board[i];
    }

    this.oMovesCount = old.oMovesCount;
    this.result = old.result;
    this.turn = old.turn;
  }

  // Now we define functions of state
  this.advanceTurn = function() {
    this.turn = this.turn == "X" ? "O" : "X";
  }

  // EmptyCells returns the indexes of the empty cells in the function
  this.emptyCells = function() {
    var indexes = [];
    for (i = 0; i < 9; i++) {
      if (this.board[i] == "E") {
        indexes.push(i)
      }
    }
    return indexes;
  }

  // IsTerminal checks if the current state is a terminal state by checking each possible win condition and draw condition. Returns true if terminal, false if not.
  this.isTerminal = function() {
    var B = this.board;

    // First, check row win conditions
    for (i = 0; i <= 6; i += 3) {
      if (B[i] !== "E" && B[i] == B[i + 1] && B[i] == B[i + 2]) {
        this.result = B[i] + " won";
        return true;
      }
    }

    // Then, check columns
    for (i = 0; i <= 2; i++) {
      if (B[i] !== "E" && B[i] == B[i + 3] && B[i] == B[i + 6]) {
        this.result = B[i] + " won";
        return true;
      }
    }

    // Then diagonals
    for (i = 0, j = 4; i <= 2; i += 2, j -= 2) {
      if (B[i] !== "E" && B[i] == B[i + j] && B[i] == B[i + 2 * j]) {
        this.result = B[i] + " won";
        return true;
      }
    }

    // Check if draw, and if not draw, not terminal
    var available = this.emptyCells();
    if (available.length == 0) {
      this.result = "draw";
      return true;
    } else {
      return false;
    }
  }
}

// This function defines the game itself. this contains the information of what sort of AI player, current game state, and whether the game is still running. It also controls moving the game to different states and a way to start the game.

var Game = function(autoPlayer) {
  this.ai = autoPlayer;

  // Initializes to an empty board configuration
  this.currentState = new State();

  this.currentState.board = ["E","E","E",
                             "E","E","E",
                             "E","E","E"];

  this.currentState.turn = "X";

  this.status = "beginning";

  // This next function advances the game ahead one state
  this.advanceTo = function(_state) {
    this.currentState = _state;
    // we check if the state is terminal
    if (_state.isTerminal()) {
      this.status = "ended";

      if (_state.result == "X won") {
        human.switchViewTo("won")
      } else if (_state.result == "O won") {
        human.switchViewTo("lost");
      } else {
        human.switchViewTo("draw");
      }
    } else { // the game is still running, so we switch players
      if (this.currentState.turn == "X") {
        human.switchViewTo("human");
      } else {
        human.switchViewTo("robot");

        this.ai.notify("O");
      }
    }
  }

  // This function starts the game
  this.start = function() {
    if (this.status == "beginning") {
      this.advanceTo(this.currentState);
      this.status = "running";
    }
  }
}

// This function calculates the score of the game based on the human players position, needed for minimaxing
Game.score = function(_state) {
  if (_state.result !== "still running") {
    if (_state.result == "X won") {
      return 10 - _state.oMovesCount;
    } else if (_state.result == "O won") {
      return -10 + _state.oMovesCount;
    } else {
      return 0;
    }
  }
}
