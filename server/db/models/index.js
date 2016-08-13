const mongoose = require('mongoose');
const crypto = require('crypto');

const url  = new mongoose.Schema({ 
	url : {type: String, required: true},
	urlEnd: {type: String, required: true},
	date: { type: Date, default: Date.now }
});

// Build pre-hook that attaches the http or www to the url in case they are missing;

module.exports = mongoose.model('Url', url);