const router = require('express').Router();
const mongoose = require('mongoose');
const Url = mongoose.model('Url');
const crypto = require('crypto');
module.exports = router;

router.post('/', (req, res, next) => {
	let buffr;
	let fixedUrl = parseUrl(req.body.url);
	Url.findOne({ url: fixedUrl })
	.then(url => { 
		if(url) return url;
		else {
			buffr = crypto.randomBytes(5).toString('hex');
			return Url.find({ urlEnd: buffr });
		}
	})
	.then(allUrls => {
		if(!Array.isArray(allUrls)) return allUrls
		else {
			while(true){
				let filteredUrls = allUrls.filter(ele => ele.urlEnd === buffr)
				if(filteredUrls.length === 0) break
				else buffr = crypto.randomBytes(5).toString('hex');
			}
			return Url.create({url: fixedUrl, urlEnd: buffr})
		}
	})
	.then(url => res.send(url))
	.catch(console.log.bind(console))
})


function parseUrl(url) {
	const httpStr = 'http://';
	const www = 'www.';
	const httpReg = /^https?:\/\/www\./;
	const wwwReg = new RegExp(www);
	if(!httpReg.test(url) && wwwReg.test(url)) url = httpStr + url;
	else if(!httpReg.test(url) && !wwwReg.test(url)) url = httpStr + www + url;
	return url;
}