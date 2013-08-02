var World = require('../world.js');

var w = new World(10,10);
w.insertLife(0,0);
w.insertLife(0,2);
w.insertLife(1,1);
w.insertLife(1,2);
w.insertLife(2,1);

setInterval(function() {
  w.printWorld();
  w.update();
},500);
