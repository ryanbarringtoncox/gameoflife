function assert(descrip, stmt) {

  if (stmt) {
    console.log("PASS: " + descrip);
  } else {
    console.log("FAIL: " + descrip);
  }

}

var World = function(x,y) {

  var self = this;
  this.x = x;
  this.y = y;

  this.lives = {}; 

  return {

    toString: function() {
      console.log("This world is " + self.x + " by " + self.y);
    },
   
    hasLife: function(x,y) {
      if (self.lives[x+"_"+y]) {
        return true;
      }  else {
        return false;
      }
    },

    insertLife: function(x,y) {
      if(x >= self.x || y >= self.y || y < 0 || x < 0) {
        return -1;
      } else {
        var lifeString = x+"_"+y;
        self.lives[lifeString] = true;
        return self.lives;
      }
    },

    printLives: function(x,y) {
      console.log(Object.keys(self.lives).length + " lives are:");
      for (var key in self.lives) {
        console.log(key);
      };
    }, 

    removeLife: function(x,y) {
      delete self.lives[x+"_"+y];
    }
  }

};

var world = new World(100, 100);
//world.toString();
assert("should pass", 1===world.insertLife(0,0));
assert("should fail", 1===world.insertLife(100,0));
world.insertLife(1,1);
world.insertLife(22,1);
world.insertLife(11,1);
world.insertLife(1,21);
world.insertLife(1,31);
world.insertLife(1,91);
world.printLives();
assert("testing hasLife()", true===world.hasLife(1,1));
assert("testing hasLife()", false===world.hasLife(99,1));
world.removeLife(1,1);
assert("Testing removeLife()", false===world.hasLife(1,1));
