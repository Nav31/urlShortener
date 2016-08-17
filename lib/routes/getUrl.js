'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Url = mongoose.model('Url');
module.exports = router;

router.get('/:buffr', function (req, res, next) {
	Url.findOne({ urlEnd: req.params.buffr }).then(function (url) {
		var now = new Date();
		url.whenClicked.push(now.toString());
		return url.save();
	}).then(function (url) {
		return res.redirect(url.url);
	}).catch(console.log.bind(console));
});