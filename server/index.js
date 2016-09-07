const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const startDb = require('./db');
const routes = require('./routes');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

app.use(express.static(path.join(__dirname, '/../node_modules')));
app.use(express.static(path.join(__dirname, "/../public")));
app.use(express.static(path.join(__dirname, "/../bin")));
app.use(favicon(path.join(__dirname, "/../public/favicon.ico")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);
app.use('/', require('./routes/getUrl'));

app.get('/*', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

const port = process.env.PORT || 80;

startDb.then(() => server.listen(port, () => console.log('Chillin on Port:', port)))	   
.catch(error => console.error(error));