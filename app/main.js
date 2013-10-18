(function() {

  var World = require('world'),
    Canvas = require('canvas'),
    PianoSprite = require('./audio/pianosprite'),
    sprite, w, canvas, startBtn, interval, slider,
    resetBtn, isRunning, spriteSize, minLives, maxLives,
    lastNotePlayed;
 
  //init
  initBoard();
  startBtn = $('#start');
  resetBtn = $('#reset');
  slider = $('#slider'); 
  lastNotePlayed = 0;

  //default time tick in ms
  interval = 100;

  //this shouldn't be hard-coded
  spriteSize = 10;

  //init bootstrap slider
  slider.slider({
    min: 40,
    max: 300,
    value: 100,
    step: 10,
  }).on('slide', function(ev) {
      interval = this.value;
    });

  //main game loop  
  var gameLoop = function () {
    if (isRunning) {
      capturedCells = canvas.captureCells();
      w.insertLives(capturedCells);
      w.update();
      canvas.clearCapturedCells();
      canvas.render(w);
      noteHandler();
      setTimeout(gameLoop,interval);
    }
  };

  //when start is clicked
  startBtn.click(function() {
    toggleButton();
    var capturedCells = canvas.captureCells();
    w.insertLives(capturedCells);
    canvas.clearCapturedCells();
    setTimeout(gameLoop,interval);
  });

  //when reset is clicked
  resetBtn.click(function() {
    initBoard();
    canvas.clear();
    startBtn.html("Go!");
  });

  //clear and start a new game
  function initBoard() {
    isRunning = false;
    sprite = new PianoSprite();
    canvas = new Canvas(document, 'main',10,sprite);
    w = new World(canvas.width-1,canvas.height-1,10);
  }

  //toggles state of go button
  function toggleButton() {
    isRunning = !(isRunning);
    if (isRunning) {
      startBtn.html("Stop");
    } else {
      startBtn.html("Go!");
    }
  }

  //instrument grows dynamically with range of cell lives
  function noteHandler() {
    
    //get live current cell count
    currNumCells = w.getNumCells();
    
    //get min, max number of lives that have lived
    minLives = w.getMinLives(); 
    maxLives = w.getMaxLives(); 

    //this is the overall width of our musical instrument
    var range = maxLives-minLives;
    //console.log("range is " + range);

    //play note based on calculations
    notePlayer(currNumCells, range, spriteSize, minLives);

  }

  //plays the notes
  function notePlayer(currNumCells, range, spriteSize, offset) {

    //slice is 'width' of note 
    var slice = range/spriteSize;

    //map currNumCells to sprite note, this is basically a dynamic switch statement
    for (var i=1; i<=spriteSize; i++) {

      if (currNumCells < (slice*i)+offset) {

        //if note is same as last note played then exit, no need to play again
        //if (i === lastNotePlayed) {return;}

        //sprite.stop();
        sprite.play(i);
        console.log("currNumCells is " + currNumCells + " and range is " + range + " and offset is " + offset);
        console.log("notePlayer() just played sprite note " + i);

        //keep track of note
        lastNotePlayed = i;

        //once we play a note, exit this loop
        return;
      } 
    } 
  }

})();
