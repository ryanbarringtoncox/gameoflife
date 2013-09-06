(function() {

  var World = require('world'),
    Canvas = require('canvas'),
    PianoSprite = require('./audio/pianosprite'),
    sound, w, canvas, startBtn;

  //sound = new PianoSprite();

  canvas = new Canvas(document, 'main');
  canvas.init();
  startBtn = $('#start');

  w = new World(canvas.width-1,canvas.height-1);

  startBtn.click(function() {

    console.log(canvas.addedSquares);
    w.insertLives(canvas.addedSquares);
    w.toString();
    
    setInterval(function() {
      //console.log("canvas addedSquares:" + canvas.addedSquares);
      //canvas.clear();
      w.update();
      canvas.render(w);
    }, 500);

  });


})();

/*
//main loop
setInterval(function() {

  //get lives of current world
  var key, notes=[], lives = w.getLives();

  //push into notes array
  for (key in lives) {
    console.log("key is " + key);
    var xArr = key.split("_"); 
    console.log("xArr is " + xArr);
    var x = xArr[0];
    console.log("x is " + x);
    if (notes.indexOf(x) < 0) {
      notes.push(x);
    }
  }
  
  //play each note
  notes.forEach(function(note) {
    console.log("playing " + note);
    sound.play(note);
  });
    
  //clear the board!
  canvas.context.clearRect(0,0,100,100);

  //render on canvas
  for (key in lives) {
    var cellStr = key;
    var cellArr = cellStr.split("_");
    var x = parseInt(cellArr[0]);
    var y = parseInt(cellArr[1]);
    console.log("cell is " + x + "," + y);
    canvas = document.getElementById('main');
    canvas.context = canvas.getContext('2d');
    canvas.context.beginPath();
    canvas.context.rect(x,y,1,1);
    canvas.context.fillStyle = "black";
    canvas.context.fill();
  }

  //w.printWorld();
  //console.log("lives are " + lives);
  w.update();
},200);
*/
