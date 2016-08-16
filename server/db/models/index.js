const mongoose = require('mongoose');

const url  = new mongoose.Schema({ 
	url : {type: String, required: true},
	urlEnd: {type: String, required: true},
	dateCreated: {type: Date, default: new Date().toString()},
	whenClicked: {type: Array, default: []}
});

module.exports = mongoose.model('Url', url);