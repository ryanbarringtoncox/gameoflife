function Canvas(document,canvasId,cellSize) {

  //private vars
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext('2d');
  var addedCells = [];
  var mouseDown = false;
  var capturedCells = [];

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
    if (addedCells.indexOf(p) < 0) {
      addedCells.push(p);
      fillRect(x, y);
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

      var p = x+"_"+y;
      if (addedCells.indexOf(p) < 0) {
        addedCells.push(p);
        fillRect(x, y);
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
    context.beginPath();
    context.rect(x, y, cellSize, cellSize );
    context.fillStyle = '#000';
    context.fill();
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

      context.clearRect(0,0,canvas.width,canvas.height);

      //drawGrid();

      var lives = w.getLives();

      for (var key in lives) {
        var cellStr = key;
        var cellArr = cellStr.split("_");
        var x = parseInt(cellArr[0], 10);
        var y = parseInt(cellArr[1], 10);

        x = snapToGrid(x);
        y = snapToGrid(y);

        fillRect(x, y);

       }
    }
  };
}

module.exports = Canvas;
