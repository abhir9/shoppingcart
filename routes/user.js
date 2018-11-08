/**
 * Created by abhi .
 */
"use strict";

const express = require('express'),
    router = express.Router(),
    userServices = require('../services/user.services'),
    validator = require('../utility/validator'),
    config = require('config.json'),
    responseHandler = require('../utility/responseHandler');

module.exports = function(router) {
    // get all user
    router.route('/').get(function (req, res) {
        userServices.getAllUser(req, res);
    });

    // get user by id
    router.route('/:id').get(function (req, res) {
        userServices.getUserById(req, res);
    });

    // delete user by id
    router.route('/:id').delete(function (req, res) {
        userServices.deleteUserById(req, res);
    });

    // update user by id
    router.route('/:id').put(function (req, res) {
        userServices.updateUserById(req, res);
    });


}
