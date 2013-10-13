(function() {

  var World = require('world'),
    Canvas = require('canvas'),
    PianoSprite = require('./audio/pianosprite'),
    sprite, w, canvas, startBtn, interval, slider,
    resetBtn, isRunning;
 
  initBoard();
  startBtn = $('#start');
  resetBtn = $('#reset');
  slider = $('#slider'); 

  //default time tick in ms
  interval = 100;

  //init bootstrap slider
  slider.slider({
    min: 40,
    max: 300,
    value: 100,
    step: 10,
  })
    .on('slide', function(ev) {
      interval = this.value;
    });

  var gameLoop = function () {
    if (isRunning) {
      capturedCells = canvas.captureCells();
      w.insertLives(capturedCells);
      w.update();
      canvas.clearCapturedCells();
      canvas.render(w);
      setTimeout(gameLoop,interval);
    }
  }

  startBtn.click(function() {
    toggleButton();
    var capturedCells = canvas.captureCells();
    w.insertLives(capturedCells);
    canvas.clearCapturedCells();
    setTimeout(gameLoop,interval);
  });

  resetBtn.click(function() {
    initBoard();
    canvas.clear();
    startBtn.html("Go!");
  });

  function initBoard() {
    isRunning = false;
    sprite = new PianoSprite();
    canvas = new Canvas(document, 'main',10,sprite);
    w = new World(canvas.width-1,canvas.height-1,10);
  }

  function toggleButton() {
    isRunning = !(isRunning);
    if (isRunning) {
      startBtn.html("Stop");
    } else {
      startBtn.html("Go!");
    }
  }

})();
