function World(x,y) {

  var width, height, lives, offsets;

  width = x;
  height = y;
  lives = {}; 
  offsets = [[-1,-1], [-1,0],  [-1,1],  [0,-1],  [0,1],  [1,-1],  [1,0],  [1,1] ];

  return {

    toString: function() {
      console.log("This world is " + width + " by " + height);
      console.log(Object.keys(lives).length + " lives are:");
      for (var key in lives) {
        console.log(key);
      } 
    }, 

    stringIt: function(x,y) {
      return x+"_"+y; 
    },

    hasLife: function(x,y) {
      if (lives[x+"_"+y]) {
        return true;
      }  else {
        return false;
      }
    },

    getNeighborhood: function(x,y) {
      var neighborhood = [];
      offsets.forEach(function(offset) {
        var curr = (x+offset[0]) + "_" + (y+offset[1]);
        neighborhood.push(curr);
      });
      return neighborhood;
    },

    getNeighborhoodString: function(life) {
      var nums = life.split("_");
      var nabeHood = this.getNeighborhood(parseInt(nums[0],10), parseInt(nums[1],10));
      return nabeHood;
    },

    getLiveNabeCount: function(x,y) {
      var living = 0;
      var candidates = this.getNeighborhood(x,y);
      candidates.forEach(function(c) {
        if (lives[c]) {
          living = living + 1; 
        }  
      });
      return living;  
    },

    getLiveNabeCountString: function(nabe) {
      var nums = nabe.split("_");
      var count = this.getLiveNabeCount(parseInt(nums[0],10), parseInt(nums[1],10));
      return count;
    },

    insertLife: function(x,y) {
      if(x >= width || y >= height || y < 0 || x < 0) {
        return new Error("Coords not within bounds of this world!");
      } else {
        var lifeString = x+"_"+y;
        lives[lifeString] = true;
        return lives;
      }
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
      var nextGeneration = {};
      var self = this;
      function nabeCallback(nabe) {
        if (!nextGeneration[nabe]) {
          var count = self.getLiveNabeCountString(nabe);
          if (count === 3) {
            nextGeneration[nabe] = true;
          }
        }
      }
      for (var key in lives) {
        //will this life survive?
        var count = this.getLiveNabeCountString(key);
        //console.log(key + " has " + count + " living neighbors");
        if (count === 2 || count ===3) {
          nextGeneration[key] = true;
        }
        //will birth occur?
        var nabes = this.getNeighborhoodString(key);
        nabes.forEach(nabeCallback);
      }
      lives = nextGeneration;
    }
  };

}

module.exports = World;
