'use strict';

var app = angular.module('urlShortener', []);

app.controller('shortenerCtrl',function($scope, UrlFactory, $log){
	var clipboard = new Clipboard('.btn');
	const testURl = url => {
		let regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,2000}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
		return regex.test(url);
	}
	$scope.shortUrl = null;
	$scope.getShortUrl = function(){
		if(!(testURl($scope.inputUrl))) return $scope.inputUrl = "Please Enter a Valid URL"
		if(!$scope.inputUrl) return;	
		UrlFactory.getShortUrl($scope.inputUrl)
		.then(function(shortUrl){
			$scope.clickCount = shortUrl.whenClicked.length;
			if(shortUrl.whenClicked.length > 0) {
				$scope.lastClicked = shortUrl.whenClicked[shortUrl.whenClicked.length - 1];
			} else $scope.lastClicked = "never"
			$scope.shortUrl = 'imp.nyc/' + shortUrl.urlEnd;
		})
		.catch($log);
	}
})

app.factory('UrlFactory', function($http) {
	function parseData (res){ return res.data};
	return {
		getShortUrl: function(longUrl) {
			return $http.post('api/', {url: longUrl}).then(parseData);
		}
	}
})