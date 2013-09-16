function Canvas(document,canvasId) {

  //private vars
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext('2d');
  var addedCells = [];
  var mouseDown = false;
  var capturedCells = [];

  //event listeners
  function onMouseDown(e) {
    mouseDown = true;
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

  function onMouseMove(e) {
    
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
  }

  function onMouseUp(e) {
    mouseDown = false;
  }

  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mouseup", onMouseUp, false);
  canvas.addEventListener("mousemove", onMouseMove, false);
 
  //helpers 
  function drawGrid() {

    //draw grid on canvas
    for (var x = 0; x < canvas.width; x+=10) {
      context.moveTo(x,0);
      context.lineTo(x, canvas.height);
    }

    for (var y = 0; y < canvas.height; y+=10) {
      context.moveTo(0,y);
      context.lineTo(canvas.width, y);
    }
     
    context.strokeStyle = "#ddd";
    context.stroke();

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

  //api
  return {
  
    context: context,

    width: canvas.width,

    height: canvas.height,

    init: drawGrid,

    captureCells: function() {

      console.log("captureCells called");
      console.log("addedCells are " + addedCells);
      capturedCells = addedCells;
      console.log("populated capturedCells " + capturedCells);
      addedCells = [];
      return capturedCells;

    },

    clearCapturedCells: function() {
      capturedCells = [];  
    },

    render: function(w) {

      console.log("render called and addedCells are:");
      console.log(addedCells);
      context.clearRect(0,0,canvas.width,canvas.height);

      drawGrid();

      var lives = w.getLives();

      //console.log("lives are " + JSON.stringify(lives));
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
  }
}

module.exports = Canvas;
