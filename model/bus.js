const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bus = new Schema({
	number : Number,
	type: String,
	date : {type: Date, default: new Date()},
	noPart: Boolean,
	description : String,
	status: String,
	rtsDate: {type: Date, default: new Date()},
	fixed: {type: Boolean, default: false},
	dateFixed: {type: Date, default: null}
},
{ collection: "bus" })

module.exports = PassDown = mongoose.model('Bus', bus)
	