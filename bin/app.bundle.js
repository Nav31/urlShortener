!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}([function(module,exports){"use strict";var app=angular.module("urlShortener",[]);app.controller("shortenerCtrl",function($scope,UrlFactory,$log){new Clipboard(".btn");$scope.shortUrl=null,$scope.getShortUrl=function(){$scope.inputUrl&&UrlFactory.getShortUrl($scope.inputUrl).then(function(shortUrl){$scope.clickCount=shortUrl.whenClicked.length,shortUrl.whenClicked.length>0?$scope.lastClicked=shortUrl.whenClicked[shortUrl.whenClicked.length-1]:$scope.lastClicked="never",$scope.shortUrl="imp.nyc/"+shortUrl.urlEnd})["catch"]($log)}}),app.factory("UrlFactory",function($http){function parseData(res){return res.data}return{getShortUrl:function(longUrl){return $http.post("api/",{url:longUrl}).then(parseData)}}})}]);