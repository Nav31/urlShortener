'use strict';

var app = angular.module('urlShortener', []);

app.controller('shortenerCtrl',function($scope, UrlFactory, $log){
	var clipboard = new Clipboard('.btn');
	$scope.shortUrl = null;
	$scope.getShortUrl = function(){
		if(!$scope.inputUrl) return;	
		UrlFactory.getShortUrl($scope.inputUrl)
		.then(function(shortUrl){
			$scope.clickCount = shortUrl.whenClicked.length;
			if(shortUrl.whenClicked.length > 0) {
				$scope.lastClicked = shortUrl.whenClicked[shortUrl.whenClicked.length - 1];
			} else $scope.lastClicked = "never"
			$scope.shortUrl = 'http://imp.nyc/' + shortUrl.urlEnd;
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