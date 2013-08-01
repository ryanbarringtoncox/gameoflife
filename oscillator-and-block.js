var World = require("./world.js");

var w = new World(10,10);
w.insertLife(4,4);
w.insertLife(4,5);
w.insertLife(4,6);
w.insertLife(9,9);
w.insertLife(9,8);
w.insertLife(8,9);
w.insertLife(8,8);

setInterval(function() {
  w.printWorld();
  w.update();
},500);
