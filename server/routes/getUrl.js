const router = require('express').Router();
const mongoose = require('mongoose');
const Url = mongoose.model('Url');
module.exports = router;

router.get('/:buffr', (req, res, next) => {
	Url.findOne({urlEnd: req.params.buffr})
	.then(url  => {
		res.redirect(url.url);
	})
	.catch(console.log.bind(console));
});