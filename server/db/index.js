const mongoose = require('mongoose');
const path = require('path');
const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;
const Promise = require('bluebird');
const chalk = require('chalk');
mongoose.Promise = Promise;

const db = mongoose.connect(DATABASE_URI).connection;
require('./models');

const startDbPromise = new Promise((resolve, reject) => {
	db.on('open', () => resolve(db));
	db.on('error', reject);
});

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
startDbPromise.then(() => console.log(chalk.green('MongoDB connection opened!')));

module.exports = startDbPromise;



