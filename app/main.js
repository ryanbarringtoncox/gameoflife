(function() {

  var World = require('world'),
    Canvas = require('canvas'),
    PianoSprite = require('./audio/pianosprite'),
    sound, w, canvas, startBtn;


  canvas = new Canvas(document, 'main');
  canvas.init();
  startBtn = $('#start');

  w = new World(canvas.width-1,canvas.height-1,10);

  startBtn.click(function() {

    var capturedCells = canvas.captureCells();
    w.insertLives(capturedCells);
    canvas.clearCapturedCells();
    
    setInterval(function() {
      capturedCells = canvas.captureCells();
      w.insertLives(capturedCells);
      w.update();
      canvas.clearCapturedCells();
      canvas.render(w);
    }, 500);

  });


})();
