(function() {

  var World = require('world'),
    PianoSprite = require('pianosprite'),
    sound, w;

  sound = new PianoSprite();

  var canvas = document.getElementById('main');
  var canvasSelector = $('#main');
  var context = canvas.getContext('2d');
  var width = canvas.width;
  var height = canvas.height;
  console.log("canvas is " + width + "," + height);
  var squares = [];
  var startBtn = $('#start');


  w = new World(canvas.width-1,canvas.height-1);

  startBtn.click(function() {
    console.log(squares);
    w.insertLives(squares);
    w.toString();
    
    setInterval(function() {
      //console.log("updating world");
      w.update();
      context.clearRect(0,0,canvas.width,canvas.height);
      drawGrid();
      renderCanvas(w);
    }, 500);

  });

  function renderCanvas(w) {
    console.log("renderCanvas called");
    var lives = w.getLives();

    console.log("lives are " + JSON.stringify(lives));
    for (key in lives) {
      console.log("inside loop");
      var cellStr = key;
      var cellArr = cellStr.split("_");
      var x = parseInt(cellArr[0]);
      var y = parseInt(cellArr[1]);
      console.log("cell is " + x + "," + y);

      x = snapToGrid(x);
      y = snapToGrid(y);

      fillRect(x, y);

     }
    
  }

  function drawGrid() {

    //draw grid on canvas
    for (var x = 0; x < width; x+=10) {
      context.moveTo(x,0);
      context.lineTo(x, height);
    }

    for (var y = 0; y < width; y+=10) {
      context.moveTo(0,y);
      context.lineTo(width, y);
    }
     
    context.strokeStyle = "#ddd";
    context.stroke();

  }
 
  drawGrid();

  var mouseDown = false;
  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mouseup", onMouseUp, false);
  canvas.addEventListener("mousemove", onMouseMove, false);
 
  function onMouseDown(e) {
    mouseDown = true;
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
    x = snapToGrid(x);
    y = snapToGrid(y);

    var p = x+"_"+y;
    if (squares.indexOf(p) < 0) {
      squares.push(p);
      fillRect(x, y);
    }
  }

  function onMouseMove(e) {
    
    //is mousedown?
    if (mouseDown) {

      //if so, is there a square here?
      var x = e.pageX - canvas.offsetLeft;
      var y = e.pageY - canvas.offsetTop;
      x = snapToGrid(x);
      y = snapToGrid(y);

      var p = x+"_"+y;
      if (squares.indexOf(p) < 0) {
        squares.push(p);
        fillRect(x, y);
      }

    }
    
  }

  function onMouseUp(e) {
    mouseDown = false;
  }

  function snapToGrid(x) {
    var snapped = x - x%10;
    return (snapped);
  }

  function fillRect(x,y) {
    context.beginPath();
    context.rect(x, y, 10, 10 );
    context.fillStyle = '#ddd';
    context.fill();
  }

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
*/
