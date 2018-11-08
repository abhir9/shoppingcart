/**
 * Created by abhi .
 */
"use strict";

require('rootpath')();
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    config = require('./config.json');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
    //next();
});
var routes = require('./routes/index')(app);


process.on('uncaughtException', function(err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
});


// start server
var server = app.listen(process.env.port||config.serverPort, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});