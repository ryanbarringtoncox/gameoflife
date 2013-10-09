function Canvas(document,canvasId,cellSize,sprite) {

  //private vars
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext('2d');
  var addedCells = [];
  var mouseDown = false;
  var capturedCells = [];

  //this should be a dynamic variable
  var spriteSize = 10;

  //event listeners
  function onMouseDown(e) {
    
    //prevent auto-scrolling on mobile
    e.preventDefault();

    mouseDown = true;
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
    //var x = e.pageX - canvas.offsetLeft;
    //var y = e.pageY - canvas.offsetTop;
    x = snapToGrid(x);
    y = snapToGrid(y);

    var p = x+"_"+y;

    //if it's available
    if (addedCells.indexOf(p) < 0) {

      //push n draw
      addedCells.push(p);
      fillRect(x, y);
      
      //play note 
      playNote(y);
    }

    return false;

   }

  function onMouseMove(e) {
    
    //prevent auto-scrolling on mobile
    e.preventDefault();

    //is mousedown?
    if (mouseDown) {

      //if so, is there a square here?
      var x = e.pageX - canvas.offsetLeft;
      var y = e.pageY - canvas.offsetTop;
      x = snapToGrid(x);
      y = snapToGrid(y);

      //if cell is free, push, draw and play note
      var p = x+"_"+y;
      if (addedCells.indexOf(p) < 0) {
        addedCells.push(p);
        fillRect(x, y);
        playNote(y)
      }
    }
    return false;
  }

  function onMouseUp(e) {
    //prevent auto-scrolling on mobile
    e.preventDefault();
    mouseDown = false;
    return false;
  }

  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("touchstart", onMouseDown, false);
  canvas.addEventListener("mouseup", onMouseUp, false);
  canvas.addEventListener("touchend", onMouseUp, false);
  canvas.addEventListener("mousemove", onMouseMove, false);
  canvas.addEventListener("touchmove", onMouseMove, false);
 
  //helpers 
  function drawGrid() {

    //draw grid on canvas
    for (var x = 0; x < canvas.width; x+=cellSize) {
      context.moveTo(x,0);
      context.lineTo(x, canvas.height);
    }

    for (var y = 0; y < canvas.height; y+=cellSize) {
      context.moveTo(0,y);
      context.lineTo(canvas.width, y);
    }
     
    context.strokeStyle = "#ddd";
    context.stroke();

  }
  
 function snapToGrid(x) {
    var snapped = x - x%cellSize;
    return (snapped);
  }

  function fillRect(x,y) {

    //fill Rectangle
    context.beginPath();
    context.rect(x, y, cellSize, cellSize );
    context.fillStyle = '#000';
    context.fill();

  }

  function playNote(index) {
    console.log("play note called with " + index);
    var note = (index/cellSize)%spriteSize + 1;
    //console.log("playing note " + note);
    sprite.play(note);
  }

  //api
  return {
  
    context: context,

    width: canvas.width,

    height: canvas.height,

    init: drawGrid,

    captureCells: function() {
      capturedCells = addedCells;
      addedCells = [];
      return capturedCells;

    },

    clearCapturedCells: function() {
      capturedCells = [];  
    },

    render: function(w) {

      //array of notes to play on this tick
      var notes = [];
      context.clearRect(0,0,canvas.width,canvas.height);

      var lives = w.getLives();

      //draw each cell
      for (var key in lives) {
        
        var cellStr = key;
        var cellArr = cellStr.split("_");
        var x = parseInt(cellArr[0], 10);
        var y = parseInt(cellArr[1], 10);

        x = snapToGrid(x);
        y = snapToGrid(y);

        fillRect(x, y);

        //figure out the note index, add to notes array if not there already
        //var note = (y/cellSize)%spriteSize + 1;
        if (notes.indexOf(y) < 0) {
          notes.push(y);  
        }
       }

      //stop all sounds first
      sprite.stop();

      for (var n in notes) {
        playNote(notes[n]);
      }
    }
  };
}

module.exports = Canvas;
