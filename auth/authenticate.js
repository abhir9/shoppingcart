/**
 * Created by abhi .
 */
"use strict";

const responseHandler = require('../utility/responseHandler'),
    responseService = require('../services/response.service'),
    jwt = require('jsonwebtoken'),
    config = require('../config.json'),
        exceptionUrl = [config.appName+'signin',config.appName+'signup',config.appName+'order'];

module.exports= function (req, res, next) {

    if (exceptionUrl.some(function(v) { return req.originalUrl === v; }))
    {//by pass authentication
        next();
    }
    else
    {
        jwt.verify(req.get("Authorization"), config.secretKey, function (err, user) {
            if (err) {
                responseService.validateAndSend(null, responseHandler.setErrorResponse({
                    "status": 401,
                    "message": 'no token provided'
                }), res);
            }
            else
            {
                next();
            }
        });

    }
}