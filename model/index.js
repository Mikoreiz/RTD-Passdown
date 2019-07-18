var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/rtd-passdown',{useNewUrlParser: true});
var Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false)

app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.locals.moment = require('moment');

//SCHEMA OF BUS
var bus = new Schema({
	busNumber   : {type: Number},
	type        : {type: String},
	date        : {type: Date},
	noPart      : {type: String},
	reason      : {type: String},
	description : {type: String},
	fixed       : {type: String, default: "False"},
	dateFixed   : {type: Date, default: Date()}
});

var addBus = mongoose.model('holdbus', bus);

//ADDS NEW BUS FROM FORM
app.post('/submit', function(request,response){
	new addBus({
		busNumber   : request.body.inputBus,
		type        : request.body.inputType,
		date        : request.body.inputDate,
		noPart      : request.body.inputNoPart,
		reason      : request.body.inputReason,
		description : request.body.inputDesc,
		fixed       : "False",
		fixDate     : "0"
	}).save(function(err){
        if(err){
            response.redirect('/');
        } else {
            console.log('Bus has been saved');
        }
        response.redirect('/');
    });
});

//RETRIEVES BUS ON HOLD
app.get('/', function(request, response){
	addBus.find({fixed : "False"}, function(err, addBus){
		if (err){
		response.status(500).send({error:"Could not fetch data"});
		
		} else {
			response.render('index', {
				addBus : addBus
			});
		}
	});
});

//RETIRVES BUS HISTORY OF FIXES
app.get('/archive', function(request, response){
	addBus.find({fixed : "True"}, function(err, addBus){
		if (err){
		response.status(500).send({error:"Could not fetch data"});
		
		} else {
			response.render('archive', {
				addBus : addBus
			});
		}
	});
});

//VIEW OF CURRENT BUSES ON HOLD FOR MECHANICS
app.get('/screen', function(request, response){
	addBus.find({}, function(err, addBus){
		if (err){
		response.status(500).send({error:"Could not fetch data"});
		} else {
			response.render('screen', {
				addBus : addBus
			});
		}
	});
});

//MOVES YOU TO UPDATE PAGE
app.get('/toEditPage/:_id', function(request, response){
	addBus.findById(request.params._id, function(err, obj){
		if (err) {
			console.log('Could not find');
		} else {
			response.render('update', {editBus : obj});
			console.log('Moved to edit page');
		}
	});
});

//UPDATES STATUS OF BUS THROUGH FORM
app.post('/updateBus/:_id', function(request, response){
	var updatedBus = {
	    busNumber   : request.body.upBus,
		type        : request.body.upType,
		date        : request.body.upDate,
		noPart      : request.body.upNoPart,
		reason      : request.body.upReason,
		description : request.body.upDesc,
		fixed       : request.body.fixed,
		dateFixed   : request.body.fixDate
	};
	addBus.findOneAndUpdate({_id : request.params._id}, updatedBus, {upsert:true, new:true}, function(err, doc){
		if (err) {
			console.log('Could not update');
		} else {
			console.log('Updated');
			response.redirect('/');
		}
	});
});

//DELETES RECORD OF BUS
app.get('/delete/:_id', function(request,response){
	addBus.deleteOne({_id : request.params._id}, function(err){
		if (err) {
			console.log('Could not remove');
		} else {
			console.log('Removed');
			response.redirect('/');
		}
	});

});

app.listen(3000, function() {
console.log("Passdown running on port 3000...");
});
