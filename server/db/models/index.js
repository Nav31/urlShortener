const mongoose = require('mongoose');
const crypto = require('crypto');

const url  = new mongoose.Schema({ 
	url : {type: String, required: true},
	urlEnd: {type: String, required: true},
	date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Url', url);