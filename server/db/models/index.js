const mongoose = require('mongoose');

const url  = new mongoose.Schema({ 
	url : {type: String, required: true},
	urlEnd: {type: String, required: true},
	dateCreated: { type: Date, default: Date.now },
	whenClicked: {type: Array, default: []}
});

module.exports = mongoose.model('Url', url);