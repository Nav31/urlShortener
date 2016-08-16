const mongoose = require('mongoose');

const url  = new mongoose.Schema({ 
	url : {type: String, required: true},
	urlEnd: {type: String, required: true},
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Url', url);