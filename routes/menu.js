/**
 * Created by abhi .
 */
"use strict";

const express = require('express'),
    router = express.Router(),
    menuServices = require('../services/menu.services'),
    validator = require('../utility/validator'),
    config = require('config.json'),
    responseHandler = require('../utility/responseHandler');

module.exports = function(router) {
    // get all menu
    router.route('/').get(function (req, res) {
        menuServices.getAllMenu(req, res);
    });

    // get menu by id
    router.route('/:id').get(function (req, res) {
        menuServices.getMenuById(req, res);
    });

    // delete menu by id
    router.route('/:id').delete(function (req, res) {
        menuServices.deleteMenuById(req, res);
    });

    // update menu by id
    router.route('/:id').put(function (req, res) {
        menuServices.updateMenuById(req, res);
    });


}
