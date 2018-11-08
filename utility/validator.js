/**
 * Created by abhi .
 */
var exports = module.exports = {};
var Ajv = require('ajv');
var ajv = Ajv({
    allErrors: true
});
var schemaMapper = require("./schema.mapper");


exports.validateData = function(key, dataTovalidate) {
    var validate = ajv.compile(schemaMapper.getSchema(key));
    var valid = validate(dataTovalidate);
    if (valid) {
        return result = {
            isError: false
        };
    } else {
        return result = {
            isError: true,
            errorMessages: ajv.errorsText(validate.errors)
        };
    }
}
