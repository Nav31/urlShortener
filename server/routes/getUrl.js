const router = require('express').Router();
const mongoose = require('mongoose');
const Url = mongoose.model('Url');
module.exports = router;

router.get('/:buffr', (req, res, next) => {
	Url.findOne({urlEnd: req.params.buffr})
	.then(url  => {
		if(url) { 
			console.log('I found the url', url);
			res.send(`<script>
				(function(){
					window.location ="${  url.url  }"; 
				})();
			</script>`);
		}
		else console.log('nothing to send')
	})
	.catch(console.log.bind(console));
});

//331f70bcdf