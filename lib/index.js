'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var startDb = require('./db');
var routes = require('./routes');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

app.use(express.static(path.join(__dirname, '/../node_modules')));
app.use(express.static(path.join(__dirname, "/../browser")));
app.use(express.static(path.join(__dirname, "/../public")));
app.use(favicon(path.join(__dirname, "/../public/favicon.ico")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);
app.use('/', require('./routes/getUrl'));

app.get('/*', function (req, res, next) {
  return res.sendFile(path.join(__dirname, 'index.html'));
});

var port = process.env.PORT || 1337;

startDb.then(function () {
  return server.listen(port, function () {
    return console.log('Chillin on Port:', port);
  });
}).catch(function (error) {
  return console.error(error);
});