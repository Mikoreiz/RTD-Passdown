var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/rtd-passdown',{useNewUrlParser: true});
var Schema = mongoose.Schema;
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



var bus = new Schema({
	busNumber : Number,
	type: String,
	date : String,
	noPart: String,
	reason : String,
	description : String,
});

var addBus = mongoose.model('holdbus', bus);

app.post('/submit', function(request,response){
	new addBus({
		busNumber : request.body.inputBus,
		type : request.body.inputType,
		date : request.body.inputDate,
		noPart : request.body.inputNoPart,
		reason : request.body.inputReason,
		description : request.body.inputDesc
	}).save(function(err){
        if(err){
            response.status(500).send({error:"Could not save product"});
        } else {
            console.log('your form has been saved');
        }
        response.redirect('/hold');
    });
});

app.get('/hold', function(request, response){
	addBus.find({}, function(err, addBus){
			if (err){
			response.status(500).send({error:"Could not fetch data"});
		} else {
			response.render('index', {
				addBus : addBus
			});
		}
	});
});


app.listen(3000, function() {
console.log("Passdown running on port 3000...");
});



