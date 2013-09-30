(function() {

  var World = require('world'),
    Canvas = require('canvas'),
    PianoSprite = require('./audio/pianosprite'),
    sound, w, canvas, startBtn, interval, slider;
 
  //default time tick in ms
  interval = 100;

  canvas = new Canvas(document, 'main',10);
  //canvas.init();
  startBtn = $('#start');
  slider = $('#slider'); 

  slider.slider({
    min: 10,
    max: 999,
    value: 100,
  })
    .on('slide', function(ev) {
      console.log(this.value);  
      interval = this.value;
    });

  w = new World(canvas.width-1,canvas.height-1,10);

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
