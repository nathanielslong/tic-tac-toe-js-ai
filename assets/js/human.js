// this function represents the actions of the ui player in the game.

// First, we define a ui object
var ui = {};

// Then we set the initial controls visible, so that when we load the page, the ui is set and sees the controls for the game.
ui.initialControlsVisible = true;

// When the AI is going, we want to have some sort of effect, so we set a robot flickering attribute
ui.robotFlickerHandle = 0;

// We also want something to mark down what view the ui player should be seeing at any given point, so we'll mark that here.
ui.currentView = "";

// Function starts the robot flickering with a set interval
ui.startRobotFlickering = function() {
  ui.robotFlickeringHandle = setInverval(function() {
    $('#robot').toggleClass('robot');
  }, 500);
}

// Stops the flickering effect
ui.stopRobotFlickering = function() {
  clearInterval(ui.robotFlickeringHandle);
}

// Function switches the view depending on the current player turn
ui.switchViewTo = function(turn) {
  //Since we may have async calls, let's define a helper method. This will find the id representing the current view and fade it in
  function _switch(_turn) {
    ui.currentView = "#" + _turn;
    $(ui.currentView).fadeIn("fast");

    if (_turn == "ai") {
      ui.StartRobotFlickering();
    }
  }

  // If the game is just starting, we fade out the initial content; otherwise, we fade out the current player status
  if (ui.initialControlsVisible) {
    ui.initialControlsVisible = false;
    $('.initial').fadeOut({
      duration: "slow",
      done: function() {
        _switch(turn);
      }
    })
  } else {
    $(ui.currentView).fadeOut({
      duration: "fast",
      done: function() {
        _switch(turn);
      }
    })
  }
}

// Insert at function takes care of actually playing the X or O characters
ui.insertAt = function(index, symbol) {
  var board = $('.cell');
  var targetCell = $(board[index]);

  if (!targetCell.hasClass('occupied')) {
    targetCell.html(symbol);
    targetCell.css({
      color: symbol == "X" ? "green" : "red"
    })
    targetCell.addClass('occupied');
  }
}
