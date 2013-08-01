var Assert = function(descrip, stmt) {
  if (stmt) {
    console.log("PASS: " + descrip);
  } else {
    console.log("FAIL: " + descrip);
  }
}

module.exports = Assert;
