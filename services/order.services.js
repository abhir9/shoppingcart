/**
 * Created by abhi .
 */
"use strict";

var config = require('../config.json');
var express = require('express');
var router = express.Router();
var orderModel = require('../model/Order');
var responseHandler = require('../utility/responseHandler');
const responseService = require('../services/response.service');
var orderServices = {


    registerOrder: function(req, res) {
        orderModel.create(req.body)
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
    getOrderById: function(req, res) {
        orderModel.getById(req.params.id)
        .then(function (order) {
            if (order) {
                res.send(order);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
},
    getAllOrder: function(req, res) {
        orderModel.getAllOrder()
            .then(function (order) {
                if (order) {
                    responseService.validateAndSend(null, responseHandler.setSuccessResponse({
                        "message":"order processed successful",
                        "content":{"orders":order}
                    }),  res);
                } else {
                    responseService.validateAndSend(responseHandler.setErrorResponse({
                        "message":"order could not processed successful",
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
    updateOrderById: function(req, res) {

   var orderId = req.params.id;
        orderModel.update(orderId, req.body)
        .then(function () {
            responseService.validateAndSend(null, responseHandler.setSuccessResponse({
                "message":"order updated successful",
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
    deleteOrderById: function(req, res) {
    orderModel.delete(req.params.id)
        .then(function () {
            responseService.validateAndSend(null, responseHandler.setSuccessResponse({
                "message":"order deleted successful",
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


module.exports = orderServices;
