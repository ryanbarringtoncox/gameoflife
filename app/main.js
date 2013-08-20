var World = require('world'),
  PianoSprite = require('pianosprite'),
  sound, w;

canvas = document.getElementById('main');
context = canvas.getContext('2d');
context.beginPath();
context.rect(0,0,1,1);
context.fillStyle = "black";
context.fill();

sound = new PianoSprite();
w = new World(100,100);

w.insertLife(0,0);
w.insertLife(0,2);
w.insertLife(1,1);
w.insertLife(1,2);
w.insertLife(2,1);

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
  context.clearRect(0,0,100,100);

  //render on canvas
  for (key in lives) {
    var cellStr = key;
    var cellArr = cellStr.split("_");
    var x = parseInt(cellArr[0]);
    var y = parseInt(cellArr[1]);
    console.log("cell is " + x + "," + y);
    canvas = document.getElementById('main');
    context = canvas.getContext('2d');
    context.beginPath();
    context.rect(x,y,1,1);
    context.fillStyle = "black";
    context.fill();
  }

  //w.printWorld();
  //console.log("lives are " + lives);
  w.update();
},200);
