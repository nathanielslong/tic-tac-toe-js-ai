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
