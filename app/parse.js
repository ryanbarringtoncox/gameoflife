var fs = require('fs');
var dataJson, spritemap;

fs.readFile('./output.json','utf8', function(err,data) {

  if (err) throw err;

  var key, counter = 0;
  dataJson = JSON.parse(data);
  spritemap = dataJson.spritemap;

  console.log("sprite: {");
  for (key in spritemap) {
    counter = counter + 1;
    var curr = spritemap[key];
    var start = parseFloat(curr.start) * 1000;
    var end = Math.ceil(parseFloat(curr.end) * 1000);
    console.log("  " + counter + ": [" + start + "," + (end-start) + "],");
  }
  console.log("}");

});

