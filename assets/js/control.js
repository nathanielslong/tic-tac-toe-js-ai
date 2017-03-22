// This deals with the user control on the site
// set storage for variables in the site
var globals = {};

// choose difficulty level
$('.level').each(function() {
  var $this = $(this);
  $this.click(function() {
    $('.selected').toggleClass('not-selected');
    $('.selected').toggleClass('selected');
    $this.toggleClass('not-selected');
    $this.toggleClass('selected');

    ai.level = $this.attr('id');
  })
})

// Start game
$('.start').click(function() {
  var selectedDifficulty = $('.selected').attr('id');
  if (typeof selectedDifficulty !== "undefined") {
    var aiPlayer = new AI(selectedDifficulty);
    globals.game = new Game(aiPlayer);

    aiPlayer.plays(globals.game);

    globals.game.start();
  }
})

// control for the cell clicking control
$('.cell').each(function() {
  var $this = $(this);
  $this.click(function() {
    if (globals.game.status == "running" && globals.game.currentState.turn == "X" && !$this.hasClass('occupied')) {
      var index = parseInt($this.data('index'));

      var next = new State(globals.game.currentState);
      next.board[index] = "X";

      ui.insertAt(index, "X");

      next.advanceTurn();

      globals.game.advanceTo(next);
    }
  })
})
