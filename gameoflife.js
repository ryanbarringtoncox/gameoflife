function assert(descrip, stmt) {

  if (stmt) {
    console.log("PASS: " + descrip);
  } else {
    console.log("FAIL: " + descrip);
  }

}

var World = function(x,y) {

  var getNeighborhood, width, height, lives, offsets;

  width = x;
  height = y;
  lives = {}; 
  offsets = [[-1,-1], [-1,0],  [-1,1],  [0,-1],  [0,1],  [1,-1],  [1,0],  [1,1] ];

  getNeighborhood = function(x,y) {
    var neighborhood = [];
    offsets.forEach(function(offset) {
      var curr = (x+offset[0]) + "_" + (y+offset[1]);
      neighborhood.push(curr);
    });
    return neighborhood;
  }; 

  return {

    toString: function() {
      console.log("This world is " + width + " by " + height);
    },
   
    hasLife: function(x,y) {
      if (lives[x+"_"+y]) {
        return true;
      }  else {
        return false;
      }
    },

    getNeighborCount: function(x,y) {
      if (this.hasLife(x,y)) {
        var living = 0;
        var candidates = getNeighborhood(x,y);
        candidates.forEach(function(c) {
          if (lives[c]) {
            living = living + 1; 
          }  
        });
        return living;  
      }  else {
        return -1;
      }
    },

    insertLife: function(x,y) {
      if(x >= width || y >= height || y < 0 || x < 0) {
        return -1;
      } else {
        var lifeString = x+"_"+y;
        lives[lifeString] = true;
        return lives;
      }
    },

    printLives: function() {
      console.log(Object.keys(lives).length + " lives are:");
      for (var key in lives) {
        console.log(key);
      };
    }, 

    printWorld: function() {
      for (var i = 0; i < y; i = i + 1) {
        var currLine = ""; 
        for (var j = 0; j < x; j = j + 1) {
          if (this.hasLife(j,i)) {
            currLine += "x";
          } else {
            currLine += " "; 
          }
        }
        console.log(currLine);
      }
    },

    removeLife: function(x,y) {
      delete lives[x+"_"+y];
    },

    update: function() {
      for (var key in lives) {
        console.log(key);
      }
    }
  }

};

var world = new World(100, 100);
//world.toString();
assert("Tests insertLife()", 1!==world.insertLife(0,0));
assert("Tests insertLife()", -1===world.insertLife(100,0));
world.insertLife(0,0);
world.insertLife(1,1);
world.insertLife(22,1);
world.insertLife(11,1);
world.insertLife(1,21);
world.insertLife(1,31);
world.insertLife(1,91);
//world.printLives();
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
//w.printWorld();
