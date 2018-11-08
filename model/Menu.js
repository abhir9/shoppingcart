/**
 * Created by abhi .
 */
"use strict";

const config = require('../config.json'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    Q = require('q'),
    mongo = require('mongoskin'),
    db = mongo.db(config.connectionString, { native_parser: true });

db.bind('menus');

var service = {};

service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.getAllMenu = getAllMenu;
module.exports = service;


function getById(_id) {
    var deferred = Q.defer();

    db.menus.findById(_id, function (err, menu) {
        if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
    });

    return deferred.promise;
}

function create(menuParam) {
    var deferred = Q.defer();

    // validation
    db.menus.findOne(
        { name: menuParam.name },
        function (err, menu) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (menu) {
                // menuname already exists
                deferred.reject('Menu-name "' + menuParam.name + '" is already taken');
            } else {
                createMenu();
            }
        });

    function    createMenu() {
        db.menus.insert(
            menuParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, menuParam) {
    var deferred = Q.defer();
    // validation
    db.menus.findById(_id, function (err, menu) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (menu.name !== menuParam.name) {
            // menuname has changed so check if the new menuname is already taken
            db.menus.findOne(
                { name: menuParam.name },
                function (err, menu) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
                    if (menu) {
                        // menuname already exists
                        deferred.reject('Menuname "' + menuParam.name + '" is already taken')
                    } else {
                        updateMenu();
                    }
                });
        } else {
            updateMenu();
        }
    });

    function updateMenu() {
        // fields to update
        var set = {
            name: menuParam.name,
            price: menuParam.price,
            imageUrl: menuParam.imageUrl,
        };


        db.menus.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.menus.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function getAllMenu()
{   var deferred = Q.defer();
    var menus=[];
    var count=1;
    db.menus.find({},function (err, result) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        else
            deferred.resolve(result.toArray());

    });

    return deferred.promise;

}