var Assert = require('./assert.js'),
  World = require('./world'),
  assert;

assert = new Assert("Should pass", true===true);

var w = new World(10,10);
assert = new Assert("Test stringIt()", w.stringIt(1,2)==="1_2");

var world = new World(100, 100);
assert = new Assert("Tests insertLife()", typeof world.insertLife(0,0) === "object");
assert = new Assert("Tests insertLife()",  typeof world.insertLife(100,0) === "object");
world.insertLife(0,0);
world.insertLife(1,1);
world.insertLife(22,1);
world.insertLife(11,1);
world.insertLife(1,21);
world.insertLife(1,31);
world.insertLife(1,91);
assert = new Assert("testing hasLife()", true===world.hasLife(1,1));
assert = new Assert("testing hasLife()", false===world.hasLife(99,1));
world.removeLife(1,1);
assert = new Assert("Testing removeLife()", false===world.hasLife(1,1));
world.insertLife(1,1);
assert = new Assert("Testing getLiveNabeCount()", 0===world.getLiveNabeCount(91,1));
assert = new Assert("Testing getLiveNabeCount()", 1===world.getLiveNabeCount(1,1));
assert = new Assert("Testing getLiveNabeCount()", 1===world.getLiveNabeCount(0,0));
assert = new Assert("Testing getLiveNabeCount()", 0===world.getLiveNabeCount(22,1));
world = null;

