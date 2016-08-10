const router = require('express').Router();
const mongoose = require('mongoose');
const Url = mongoose.model('Url');
const crypto = require('crypto');
module.exports = router;

router.get('/:url', (req, res, next) => {
	let buffr;
	Url.findOne({url: req.params.url})
	.then(url => { 
		if(url) return url;
		else {
			buffr = crypto.randomBytes(5).toString('hex');
			return Url.find({})
		}
	})
	.then(allUrls => {
		if(!Array.isArray(allUrls)) return allUrls;
		while(true){
			let filteredUrls = allUrls.filter(ele => ele.urlEnd === buffr)
			if(filteredUrls.length === 0) break
			else buffr = crypto.randomBytes(5).toString('hex');
		}
		return Url.create({url: req.params.url, urlEnd: buffr})
	})
	.then(url => res.send(url))
	.catch(console.log.bind(console))
})
