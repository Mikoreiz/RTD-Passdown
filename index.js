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

var bus = new Schema({
	busNumber   : Number,
	type        : String,
	date        : Date,
	noPart      : String,
	reason      : String,
	description : String
});

var arch = new Schema({
	busNumber   : Number,
	type        : String,
	date        : Date,
	noPart      : String,
	reason      : String,
	description : String,
	daysOut     : Number
});

var addBus = mongoose.model('holdbus', bus);
var archBus = mongoose.model('archbus', arch);

app.post('/submit', function(request,response){
	new addBus({
		busNumber   : request.body.inputBus,
		type        : request.body.inputType,
		date        : request.body.inputDate,
		noPart      : request.body.inputNoPart,
		reason      : request.body.inputReason,
		description : request.body.inputDesc
	}).save(function(err){
        if(err){
            response.status(500).send({error:"Could not save bus"});
        } else {
            console.log('Bus has been saved');
        }
        response.redirect('/');
    });
});

app.get('/', function(request, response){
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

app.post('/updateBus/:_id', function(request, response){
	var updatedBus = {
	    busNumber   : request.body.upBus,
		type        : request.body.upType,
		date        : request.body.upDate,
		noPart      : request.body.upNoPart,
		reason      : request.body.upReason,
		description : request.body.upDesc
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

app.post('/archiveBus', function(request, response) {
	new archBus({
		busNumber   : request.body.arcNum,
		type        : request.body.arcType,
		date        : request.body.arcDate,
		noPart      : request.body.arcPart,
		reason      : request.body.arcReason,
		description : request.body.arcDesc,
		daysOut     : request.body.arcServ
	}).save(function(err){
        if(err){
            response.status(500).send({error:"Could not archive bus"});
        } else {
            console.log('Bus has been archived');
        }
        response.redirect('/');
	});
});

app.get('/archive', function(request, response){
	archBus.find({}, function(err, obj){
		if (err){
			console.log('Could not find');	 
		} else {
			response.render('archive', {archBus : obj});
			console.log('Fetching history');
		}
	});
});

app.listen(3000, function() {
console.log("Passdown running on port 3000...");
});
