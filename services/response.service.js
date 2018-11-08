/**
 * Created by abhi .
 */
"use strict";

var responseHandler = require('../utility/responseHandler');

var response = {
    validateAndSend: function(err, response,  res) {var validator = require('../utility/validator');
        if (response) {
            var flag = false;

            var finalResponse;
            var validationResult = validator.validateData('COMMON_RESPONSE_SCHEMA', response);

            if (!validationResult.isError) {
                flag = true;
                finalResponse = response;
            } else {
                finalResponse = {
                    status: 500,
                    message: validationResult.errorMessages
                };
            }

            if (!flag) {
                res.status(500).send(finalResponse);
            } else {
                res.status(200).send(finalResponse);
            }
        } else {
            finalResponse = {
                status: err.status,
                message: err.message
            };
            res.status( err.status).send(finalResponse);

        }


    }


}
module.exports = response;
