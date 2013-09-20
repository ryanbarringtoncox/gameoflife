(function() {

  var World = require('world'),
    Canvas = require('canvas'),
    PianoSprite = require('./audio/pianosprite'),
    sound, w, canvas, startBtn, interval, slider;
  
  var canvasElement = document.getElementById('main');
/*
  // do nothing in the event handler except canceling the event
  canvasElement.ondragstart = function(e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      if (e && e.stopPropagation) { e.stopPropagation(); }
      return false;
  }

  // do nothing in the event handler except canceling the event
  canvasElement.onselectstart = function(e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      if (e && e.stopPropagation) { e.stopPropagation(); }
      return false;
  }
*/
  //cancel mobile window movement
  document.body.ontouchstart = function(e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      if (e && e.stopPropagation) { e.stopPropagation(); }
      return false;
  }

  document.body.ontouchmove = function(e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      if (e && e.stopPropagation) { e.stopPropagation(); }
      return false;
  }

  //default time tick in ms
  interval = 300;

  canvas = new Canvas(document, 'main');
  canvas.init();
  startBtn = $('#start');
  slider = $('#slider'); 

  //slider listener
  slider.change(function() {
    //console.log("slider changed to " + this.value);
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
