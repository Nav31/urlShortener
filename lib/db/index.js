'use strict';

var mongoose = require('mongoose');
var path = require('path');
var DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;
var Promise = require('bluebird');
var chalk = require('chalk');
mongoose.Promise = Promise;

var db = mongoose.connect(DATABASE_URI).connection;
require('./models');

var startDbPromise = new Promise(function (resolve, reject) {
	db.on('open', function () {
		return resolve(db);
	});
	db.on('error', reject);
});

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
startDbPromise.then(function () {
	return console.log(chalk.green('MongoDB connection opened!'));
});

module.exports = startDbPromise;