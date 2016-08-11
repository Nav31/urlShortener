'use strict';

var app = angular.module('urlShortener', []);

app.controller('shortenerCtrl',function($scope, UrlFactory, $log){
	$scope.shortUrl = null;
	$scope.getShortUrl = function(){	
		UrlFactory.getShortUrl($scope.inputUrl)
		.then(function(shortUrl){
			$scope.shortUrl = shortUrl;
		})
		.catch($log);
	}
})


app.factory('UrlFactory', function($http) {
	function parseData (res){ return res.data};
	return {
		getShortUrl: function(longUrl) {
			return $http.get('api/' + longUrl).then(parseData);
		}
	}
})