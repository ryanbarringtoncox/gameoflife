var World = require('world');
var DrumSprite = require('drumsprite');
var sound = new DrumSprite();

var w = new World(10,10);
w.toString();


var playIt = function(key, sound) {
console.log("playIt() called with key " + key);
  sound.play(key);
};


function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playSounds() {
  var rand1 = getRandomInt(1,7);
  playIt(rand1, sound);
  var rand2 = getRandomInt(1,5);
  while (rand1 === rand2) {
    rand2 = getRandomInt(1,5);
  }
  playIt(rand2, sound);
}

setInterval(playSounds, 301);
