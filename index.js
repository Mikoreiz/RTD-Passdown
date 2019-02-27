var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/rtd-passdown',{useNewUrlParser: true});

var Bus = require('./model/bus');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(3000, function() {
	console.log("Passdown running on port 3000...");
});

app.post('/bus', function(request, response){
	var bus = new Bus();
	bus.busNumber = request.body.busNumber;
	bus.type = request.body.type;
	bus.date = request.body.date;
	bus.noPart = request.body.noPart;
	bus.reason = request.body.reason;
	bus.description = request.body.description;
	bus.save(function(err, savedBus){
		if (err) {
			response.status(500).send({error:"Could not save bus"});
		} else {
			response.send(savedBus);
		}
	});
});

app.get('/bus', function(request, response) {
	Bus.find({}, function(err, buses){
		if (err){
			response.status(500).send({error:"Could not fetch bus"});
		} else {
			response.send(buses);
		}
	});
});