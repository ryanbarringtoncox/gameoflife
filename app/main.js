var World = require('world'),
  PianoSprite = require('pianosprite'),
  sound, w;

sound = new PianoSprite();
w = new World(10,10);

w.insertLife(0,0);
w.insertLife(0,2);
w.insertLife(1,1);
w.insertLife(1,2);
w.insertLife(2,1);

//simple x axis lo to high scheme
setInterval(function() {
  var key, notes=[], lives = w.getLives();
  for (key in lives) {
    var x = key[0];
    if (notes.indexOf(x) < 0) {
      notes.push(x);
    }
  }
  //console.log("notes are");
  notes.forEach(function(note) {
    //console.log(note);
    sound.play(note);
  });
  w.printWorld();
  w.update();
},500);
