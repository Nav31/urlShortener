const router = require('express').Router();
const mongoose = require('mongoose');
const Url = mongoose.model('Url');
module.exports = router;

router.get('/:buffr', (req, res, next) => {
	Url.findOne({urlEnd: req.params.buffr})
	.then(url => {
		url.whenClicked.push(Date.now());
		return url.save();
	})
	.then(url  => {
		console.log('saved: ',url.whenClicked)
		res.redirect(url.url)
	})
	.catch(console.log.bind(console));
});