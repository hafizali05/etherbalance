//index file with no express-handlebars, serves as base

var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.sendFile(__dirname + '/home.html');
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
})