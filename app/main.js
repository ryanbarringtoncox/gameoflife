(function() {

  var World = require('world'),
    Canvas = require('canvas'),
    PianoSprite = require('./audio/pianosprite'),
    DrumSprite = require('./audio/drumsprite'),
    BassSprite = require('./audio/basssprite'),
    pianoSprite, w, canvas, startBtn, interval, slider,
    resetBtn, isRunning, pianoSpriteSize, minLives, maxLives,
    lastNotePlayed, sliderMax, beatBtn, drumSprite, loopCounter,
    bassSprite;
 
  //init
  initBoard();
  startBtn = $('#start');
  resetBtn = $('#reset');
  beatBtn = $('#beats');
  slider = $('#slider'); 
  lastNotePlayed = 0;
  sliderMax = 400
  beatsOn = true;
  loopCounter = 0;

  //default time tick in ms
  interval = 200;

  //this shouldn't be hard-coded
  pianoSpriteSize = 10;

  //init bootstrap slider
  slider.slider({
    min: 100,
    max: sliderMax,
    value: interval,
    step: 10,
  }).on('slide', function(ev) {
      interval = sliderMax-this.value;
    });

  //main game loop  
  var gameLoop = function () {
    if (isRunning) {
      loopCounter++;
      capturedCells = canvas.captureCells();
      w.insertLives(capturedCells);
      w.update();
      canvas.clearCapturedCells();
      canvas.render(w);
      
      //calling noteHandler plays the melody, bassIndex stores current sprite index for melody
      var bassIndex = noteHandler()%3+1;
      console.log("bassIndex is " + bassIndex);
      
      //kick
      if (loopCounter%4==0 && beatsOn) {
        drumSprite.play(1); 
        bassSprite.play(bassIndex);
      }

      //hihat
      if (loopCounter%4==2 && beatsOn) {
        drumSprite.play(2); 
      }

      //backbeat
      if (loopCounter%8==0 && beatsOn) {
        //drumSprite.play(17); 
        //bassSprite.play(bassIndex);
      }

      if (loopCounter%8==3 && beatsOn) {
        //bassSprite.play(bassIndex);
      }

      if (loopCounter%8==4 && beatsOn) {
        //bassSprite.play((bassIndex+1)%3+1);
      }

      //ting!
      if (loopCounter%8==7 && beatsOn) {
        //drumSprite.play(6); 
      }

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

  //when reset is clicked
  beatBtn.click(function() {
    if (beatsOn) {
      beatBtn.html("BeatsOn");
      beatsOn=false;
    } else {
      beatBtn.html("BeatsOff");
      beatsOn=true;
    }
  });

  //clear and start a new game
  function initBoard() {
    isRunning = false;
    pianoSprite = new PianoSprite();
    drumSprite = new DrumSprite();
    bassSprite = new BassSprite();
    canvas = new Canvas(document, 'main',10);
    w = new World(canvas.width-1,canvas.height-1,10);
  }

  //toggles state of go button
  function toggleButton() {
    isRunning = !(isRunning);
    if (isRunning) {
      startBtn.html("Pause");
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
    var bassIndex = notePlayer(currNumCells, range, pianoSpriteSize, minLives);

    //send this back to game loop for bass notes
    return bassIndex;

  }

  //plays the notes
  function notePlayer(currNumCells, range, pianoSpriteSize, offset) {

    //slice is 'width' of note 
    var slice = range/pianoSpriteSize;

    //map currNumCells to pianoSprite note, this is basically a dynamic switch statement
    for (var i=1; i<=pianoSpriteSize; i++) {

      if (currNumCells < (slice*i)+offset) {

        //if note is same as last note played then exit, no need to play again
        //if (i === lastNotePlayed) {return;}

        //pianoSprite.stop();
        pianoSprite.play(i);
        //console.log("currNumCells is " + currNumCells + " and range is " + range + " and offset is " + offset);
        //console.log("notePlayer() just played pianoSprite note " + i);

        //keep track of note
        lastNotePlayed = i;

        //once we play a note, exit this loop, return index for bass
        return i;
      } 
    } 

    //fallback in case we don't enter 'if' condition, play highest note
    pianoSprite.play(pianoSpriteSize);
    return pianoSpriteSize;
  }

})();
