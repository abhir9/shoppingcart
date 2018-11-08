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

db.bind('orders');

var service = {};

service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.getAllOrder = getAllOrder;
module.exports = service;


function getById(_id) {
    var deferred = Q.defer();

    db.orders.findById(_id, function (err, order) {
        if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
    });

    return deferred.promise;
}

function create(orderParam) {
    var deferred = Q.defer();
    // validation
        db.orders.insert(
            orderParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve();
            });

    return deferred.promise;
}

function update(_id, orderParam) {
    var deferred = Q.defer();
    // validation
    db.orders.findById(_id, function (err, order) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (order.name !== orderParam.name) {
            // ordername has changed so check if the new ordername is already taken
            db.orders.findOne(
                { name: orderParam.name },
                function (err, order) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
                    if (order) {
                        // ordername already exists
                        deferred.reject('Ordername "' + orderParam.name + '" is already taken')
                    } else {
                        updateOrder();
                    }
                });
        } else {
            updateOrder();
        }
    });

    function updateOrder() {
        // fields to update
        var set = {
            name: orderParam.name,
            price: orderParam.price,
            imageUrl: orderParam.imageUrl,
        };


        db.orders.update(
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

    db.orders.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function getAllOrder()
{   var deferred = Q.defer();
    var orders=[];
    var count=1;
    db.orders.find({},function (err, result) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        else
            deferred.resolve(result.toArray());

    });

    return deferred.promise;

}