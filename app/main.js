(function() {

  var World = require('world'),
    Canvas = require('canvas'),
    PianoSprite = require('./audio/pianosprite'),
    sprite, w, canvas, startBtn, interval, slider;
 
  sprite = new PianoSprite();
  canvas = new Canvas(document, 'main',10,sprite);
  w = new World(canvas.width-1,canvas.height-1,10);
  startBtn = $('#start');
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

})();
