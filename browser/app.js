'use strict';

var app = angular.module('urlShortener', []);

app.controller('shortenerCtrl',function($scope, UrlFactory, $log){
	var clipboard = new Clipboard('.btn');
	$scope.shortUrl = null;
	$scope.getShortUrl = function(){	
		UrlFactory.getShortUrl($scope.inputUrl)
		.then(function(shortUrl){
			$scope.clickCount = shortUrl.whenClicked.length;
			$scope.lastClicked = shortUrl.whenClicked[shortUrl.whenClicked.length - 1];
			$scope.shortUrl = 'localhost:1337/' + shortUrl.urlEnd;
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