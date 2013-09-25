(function() {

  var World = require('world'),
    Canvas = require('canvas'),
    PianoSprite = require('./audio/pianosprite'),
    sound, w, canvas, startBtn, interval, slider;
 
  //default time tick in ms
  interval = 50;

  canvas = new Canvas(document, 'main',5);
  canvas.init();
  startBtn = $('#start');
  slider = $('#slider'); 

  //slider listener
  slider.change(function() {
    //console.log("slider changed to " + this.value);
    interval = this.value;
  });
  
  w = new World(canvas.width-1,canvas.height-1,5);

  var gameLoop = function () {
    capturedCells = canvas.captureCells();
      w.insertLives(capturedCells);
      w.update();
      canvas.clearCapturedCells();
      canvas.render(w);
      setTimeout(gameLoop,interval);
  }

  startBtn.click(function() {
    var capturedCells = canvas.captureCells();
    w.insertLives(capturedCells);
    canvas.clearCapturedCells();
    setTimeout(gameLoop,interval);
  });

  //start game loop automatically
  gameLoop();

})();
