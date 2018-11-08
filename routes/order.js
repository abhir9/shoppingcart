/**
 * Created by abhi .
 */
"use strict";

const express = require('express'),
    router = express.Router(),
    orderServices = require('../services/order.services'),
    validator = require('../utility/validator'),
    config = require('config.json'),
    responseHandler = require('../utility/responseHandler');

module.exports = function(router) {
    // get all order
    router.route('/').get(function (req, res) {
        orderServices.getAllOrder(req, res);
    });

    // get order by id
    router.route('/:id').get(function (req, res) {
        orderServices.getOrderById(req, res);
    });

    // delete order by id
    router.route('/:id').delete(function (req, res) {
        orderServices.deleteOrderById(req, res);
    });

    // update order by id
    router.route('/:id').put(function (req, res) {
        orderServices.updateOrderById(req, res);
    });
    // create order by id
    router.route('/').post(function (req, res) {
        orderServices.registerOrder(req, res);
    });


}
