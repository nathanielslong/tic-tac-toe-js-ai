// This function represents the basic AI class in the game. The AI's primary functions are to know its intelligence level and what game it's playing.

var AI = function(level) {
  var levelOfIntelligence = level;

  // Stores the game being played
  var game = {};

  // function that returns the minimax Value of a given game state
  function minimaxValue(state) {...};

  // move functions based on a given level of intelligence. turn is the player to play, either x or o
  function takeABlindMove(turn) {...};

  function takeANoviceMove(turn) {...};

  function takeAMasterMove(turn) {...};

  // function that specifies the game to be played
  this.plays = function(_game) {
    game = _game;
  }

  // Method to specify the level of intelligence
  this.notify = function(turn) {
    switch(levelOfIntelligence) {
      case "blind": 
        takeABlindMove(turn); 
        break;

      case "blind": 
        takeANoviceMove(turn); 
        break;

      case "master": 
        takeAMasterMove(turn); 
        break;
    }
  }
}

// The next function represents the actions of the AI, taken into its own class for modularity. It has two main roles: remembering where on the board a play is, and the minimax value calculated.

var AIAction = function(pos) {
  // specify defaults
  this.movePosition = pos;
  this.minimaxValue = 0;

  // Applies an action to the board to advance to the next state
  this.applyTo = function(state) {
    var next = new State(state);

    next.board[this.movePosition] = state.turn;

    if (state.turn == "O") {
      next.oMovesCount++;
    }

    next.advanceTurn();

    return next;
  }
}

// Sorting methods for minimaxValues are below. Basically, in order to determine the best outcome, we need to be able to sort given probabilities by best and worst. we return -1, 1, and 0 in order for JavaSCript's array.sort function to sort them properly.

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
    return -1;
  } else if (firstAction.minimaxVal < secondAction.minimaxVal) {
    return 1;
  } else {
    return 0;
  }
}
