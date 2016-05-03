var express = require('express');
var app = express();
var port = 3000;


app.use(express.static(__dirname + '/'));

/**
app.get("/foo", function(req, res, next) {
	console.log("xxxxx/foo");
	if (next) {
		console.log("next()");
	}
   res.header("Content-Type", "application/json");
   res.end("<h1>Welcome to Audacy SpaceConnected XXX!</h1>");
});
**/

app.listen(port, function() {
   console.log("NodeJS server listening to port " + port);
});
