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
      this.status("running");
    }
  }
}
