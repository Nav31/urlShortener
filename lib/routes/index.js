'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Url = mongoose.model('Url');
var crypto = require('crypto');
module.exports = router;

router.post('/', function (req, res, next) {
	var buffr = void 0;
	var fixedUrl = parseUrl(req.body.url);
	Url.findOne({ url: fixedUrl }).then(function (url) {
		if (url) return url;else {
			buffr = crypto.randomBytes(5).toString('hex');
			return Url.find({ urlEnd: buffr });
		}
	}).then(function (allUrls) {
		if (!Array.isArray(allUrls)) return allUrls;else {
			while (true) {
				var filteredUrls = allUrls.filter(function (ele) {
					return ele.urlEnd === buffr;
				});
				if (filteredUrls.length === 0) break;else buffr = crypto.randomBytes(5).toString('hex');
			}
			return Url.create({ url: fixedUrl, urlEnd: buffr });
		}
	}).then(function (url) {
		return res.send(url);
	}).catch(console.log.bind(console));
});

function parseUrl(url) {
	var httpStr = 'http://';
	var www = 'www.';
	var httpReg = /^https?:\/\/www\./;
	var wwwReg = new RegExp(www);
	if (!httpReg.test(url) && wwwReg.test(url)) url = httpStr + url;else if (!httpReg.test(url) && !wwwReg.test(url)) url = httpStr + www + url;
	return url;
}