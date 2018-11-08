/**
 * Created by abhi .
 */
"use strict";

var config = require('../config.json');
var express = require('express');
var router = express.Router();
var userModel = require('../model/User');
var responseHandler = require('../utility/responseHandler');
const responseService = require('../services/response.service');
var userServices = {
    authenticateUser: function(req, res) {
        return   userModel.authenticate(req.body.username, req.body.password)
        .then(function (response) {
            if (response && response.token) {
                // authentication successful
                responseService.validateAndSend(null, responseHandler.setSuccessResponse({
                    "message":"authentication successfull",
                    "content":{"token":response.token,"user":response.user}
                }),  res);

            } else {
                // authentication failed
                responseService.validateAndSend(responseHandler.setErrorResponse({
                    "status":403,
                    "message":"authentication failed"
                }), null,  res);
            }
        })
        .catch(function (err) {
            responseService.validateAndSend(responseHandler.setErrorResponse({
                "status":400,
                "message":err.message
            }), null,  res);
        });
},

    registerUser: function(req, res) {
        userModel.create(req.body)
        .then(function () {

            responseService.validateAndSend(null, responseHandler.setSuccessResponse({
                "message":"registration successful"
            }),  res);
        })
        .catch(function (err) {
            responseService.validateAndSend(responseHandler.setErrorResponse({
                "status":401,
                "message":err
            }),null,res);
        });
},
    getUserById: function(req, res) {
        userModel.getById(req.params.id)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
},
    getAllUser: function(req, res) {
        userModel.getAllUser()
            .then(function (user) {
                if (user) {
                    responseService.validateAndSend(null, responseHandler.setSuccessResponse({
                        "message":"user processed successful",
                        "content":{"users":user}
                    }),  res);

                } else {
                    responseService.validateAndSend(responseHandler.setErrorResponse({
                        "message":"user could not processed successful",
                        "status":401
                    }),  res);
                }
            })
            .catch(function (err) {
                responseService.validateAndSend(responseHandler.setErrorResponse({
                    "message":err,
                    "status":400
                }),  res);
            });
    },
    updateUserById: function(req, res) {

   var userId = req.params.id;
        userModel.update(userId, req.body)
        .then(function () {
            responseService.validateAndSend(null, responseHandler.setSuccessResponse({
                "message":"user updated successful",
                "content":{}
            }),  res);
        })
        .catch(function (err) {
            responseService.validateAndSend(responseHandler.setErrorResponse({
                "message":err,
                "status":400
            }),  res);
        });
},
    deleteUserById: function(req, res) {
    userModel.delete(req.params.id)
        .then(function () {
            responseService.validateAndSend(null, responseHandler.setSuccessResponse({
                "message":"user deleted successful",
                "content":{}
            }),  res);
        })
        .catch(function (err) {
            responseService.validateAndSend(responseHandler.setErrorResponse({
                "message":err,
                "status":400
            }),  res);
        });
}
}


module.exports = userServices;
