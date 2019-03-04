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
	    busNumber : request.body.upBus,
		type : request.body.upType,
		date : request.body.upDate,
		noPart : request.body.upNoPart,
		reason : request.body.upReason,
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

app.listen(3000, function() {
console.log("Passdown running on port 3000...");
});





