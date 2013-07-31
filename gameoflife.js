var World = require("./world.js"), assert;

assert = function(descrip, stmt) {
  if (stmt) {
    console.log("PASS: " + descrip);
  } else {
    console.log("FAIL: " + descrip);
  }
}

var world = new World(100, 100);
assert("Tests insertLife()", 1!==world.insertLife(0,0));
assert("Tests insertLife()", -1===world.insertLife(100,0));
world.insertLife(0,0);
world.insertLife(1,1);
world.insertLife(22,1);
world.insertLife(11,1);
world.insertLife(1,21);
world.insertLife(1,31);
world.insertLife(1,91);
assert("testing hasLife()", true===world.hasLife(1,1));
assert("testing hasLife()", false===world.hasLife(99,1));
world.removeLife(1,1);
assert("Testing removeLife()", false===world.hasLife(1,1));
world.insertLife(1,1);
assert("Testing getNeighborCount()", -1===world.getNeighborCount(91,1));
assert("Testing getNeighborCount()", 1===world.getNeighborCount(1,1));
assert("Testing getNeighborCount()", 1===world.getNeighborCount(0,0));
assert("Testing getNeighborCount()", 0===world.getNeighborCount(22,1));
delete world;

var w = new World(10,10);
w.insertLife(4,4);
w.insertLife(4,5);
w.insertLife(4,6);
w.printWorld();
w.update();
w.printWorld();
w.update();
w.printWorld();
w.update();

