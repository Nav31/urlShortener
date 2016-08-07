const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const startDb = require('./db');
const routes = require('./routes');

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, "browser")));

app.use('/api', routes);

const port = process.env.PORT || 1337;

startDb.then(() => server.listen(port, () => console.log('Chillin on Port: ', port)))
	   .catch(error => console.error(error));

