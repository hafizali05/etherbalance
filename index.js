const express = require("express");
var handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const axios = require('axios');
const port  = process.env.PORT || 3000;

const app = express();
app.engine('handlebars', handlebars({defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.get('/', function(req, res){
	let promise = axios.get(`http://api.football-data.org/v1/competitions/426/leagueTable`);
	promise.then((response) => {
	    	return res.render('home',{data: response.data.standing});
	    }, (error) => {
	    	console.log('error:',error);	    	
	})
});

app.listen(port, () => {
  console.log('Server is up on port 3000');
});
