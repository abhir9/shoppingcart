/**
 * Created by abhi .
 */
"use strict";

var config = require('../config.json');
var express = require('express');
var router = express.Router();
var menuModel = require('../model/Menu');
var responseHandler = require('../utility/responseHandler');
const responseService = require('../services/response.service');
var menuServices = {


    registerMenu: function(req, res) {
        menuModel.create(req.body)
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
    getMenuById: function(req, res) {
        menuModel.getById(req.params.id)
        .then(function (menu) {
            if (menu) {
                res.send(menu);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
},
    getAllMenu: function(req, res) {
        menuModel.getAllMenu()
            .then(function (menu) {
                if (menu) {
                    responseService.validateAndSend(null, responseHandler.setSuccessResponse({
                        "message":"menu processed successful",
                        "content":{"menus":menu}
                    }),  res);
                } else {
                    responseService.validateAndSend(responseHandler.setErrorResponse({
                        "message":"menu could not processed successful",
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
    updateMenuById: function(req, res) {

   var menuId = req.params.id;
        menuModel.update(menuId, req.body)
        .then(function () {
            responseService.validateAndSend(null, responseHandler.setSuccessResponse({
                "message":"menu updated successful",
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
    deleteMenuById: function(req, res) {
    menuModel.delete(req.params.id)
        .then(function () {
            responseService.validateAndSend(null, responseHandler.setSuccessResponse({
                "message":"menu deleted successful",
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


module.exports = menuServices;
