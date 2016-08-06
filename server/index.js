const express = require('express');
const app = express();
const server = require('http').Server(app);
const routes = require('./routes');
const path = require('path');
const startDb = require('./db');

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, "browser")));

app.use('/api', routes);

const port = process.env.PORT || 1337;

startDb.then(() => server.listen(port, () => console.log('Chillin on Port: ', port)))
	   .catch(error => console.error(error));

