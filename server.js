const express = require("express");
const bodyParser = require('body-parser');
const axios = require('axios');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const port  = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'pug');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.get('/', (req, res)=> {
  res.render('index');
})

app.post('/', async ((req, res)=> {
	fetchData(req.body.address)
	    .then((bal) => {
			return res.render('index', { message: bal });
	    }, (error) => {
		    return res.render('index', { message: error });;
		})
}))

const fetchData = async ((address)=>{
	const promise = axios.get(`https://api.blockcypher.com/v1/eth/main/addrs/${address}/balance`);
	const res = await(promise);
  	const bal =  res.data.balance /Math.pow(10, 18);
	return bal;
})

app.listen(port, () => {
  console.log('Server is up on port 3000');
});
