/**
 * Created by abhi .
 */
var exports = module.exports = {};
var commonResponseSchema = require('../schema/commonResponseSchema.json');
var userSchema = require('../schema/userSchema.json');

var schemaMap = {
    "COMMON_RESPONSE_SCHEMA" : commonResponseSchema,
    "USER_LOGIN_SCHEMA" : userSchema.userLoginSchema,
    "USER_SIGNUP_SCHEMA": userSchema.userSignUpSchema
};
exports.getSchema = function(key) {
    return schemaMap[key];
};

