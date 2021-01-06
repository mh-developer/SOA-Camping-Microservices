var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var logsRouter = require('./routes/logs');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/logs', logsRouter);

module.exports = app;
