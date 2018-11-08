/**
 * Created by abhi .
 */

"use strict";
const express = require('express'),
    routes = require('require-dir')(),
    config = require('../config.json'),
    auth = require('../auth/authenticate'),
    responseService = require('../services/response.service'),
    responseHandler = require('../utility/responseHandler');
module.exports=function (app) {

    // Initialize all routes
    Object.keys(routes).forEach(function(routeName) {
        var router = express.Router();
        /*
         want some middleware :- add here
          */
        require('./' + routeName)(router);
        app.use(config.appName+routeName, auth,router);
    });
    app.get('/*', function (req, res) {
        responseService.validateAndSend(null,responseHandler.setErrorResponse({"status":401,"message":'bad request'}),  res);
    });

}