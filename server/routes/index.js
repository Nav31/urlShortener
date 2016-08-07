const router = require('express').Router();
const mongoose = require('mongoose');
const Url = mongoose.model('Url');
module.exports = router;

router.get('/:url', (req, res, next) => {
	// /api/www.google.com
	Url.findOne({url: req.params.url})
	.then(url => { return url ? url : Url.create({url: url})})
	.then(url => res.send(url))
	.catch(console.log.bind(console))
})
