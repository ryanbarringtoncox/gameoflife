//for heroku deployment
var statik = require('statik');
//var server = statik.createServer();
//server.listen(process.env.PORT || 1337);
statik(5000);
