(function() {

  var World = require('world'),
    Canvas = require('canvas'),
    PianoSprite = require('./audio/pianosprite'),
    sound, w, canvas, startBtn, interval, slider;


  canvas = new Canvas(document, 'main');
  canvas.init();
  startBtn = $('#start');
  slider = $('#slider'); 

  //slider listener
  slider.change(function() {
    //console.log("slider changed to " + this.value);
    interval = this.value;
  });
  
  //how often game ticks in ms
  interval = 300;

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
