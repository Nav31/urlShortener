const mongoose = require('mongoose');
const crypto = require('crypto');

const url  = new mongoose.Schema({ 
	url : {type: String, required: true},
	urlEnd: {type: String, required: true},
	date: { type: Date, default: Date.now }
});

url.pre("save", function(next) {
	const httpStr = 'http://';
	const www = 'www.';
	const httpReg = /^https?:\/\/www\./;
	const wwwReg = new RegExp(www);
	if(!httpReg.test(this.url) && wwwReg.test(this.url)) this.url = httpStr + this.url;
	else if(!httpReg.test(this.url) && !wwwReg.test(this.url)) this.url = httpStr + www + this.url;
	next();
})

module.exports = mongoose.model('Url', url);