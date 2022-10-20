let isEmpty = require('lodash.isempty');
let isEqual = require('lodash.isequal');
let isObject = require('lodash.isobject');

/**
 *
 * @param value
 * @returns {boolean}
 */
const isEmptyWraper = (value) => {
    let typeofValue = typeof value;
    switch (typeofValue) {
        case 'number':
            return !value;
        default:
            return isEmpty(value);
    }
};

const encodeBase64 = (data) => {
    const dataToConvert = isObject(data) ? JSON.stringify(data) : data;
    const buffer = Buffer.from(dataToConvert);
    return buffer.toString('base64');
};

const decodeBase64 = (data) => {
    const buffer = Buffer.from(data, 'base64');
    return buffer.toString('ascii');
};

module.exports = {
    isEmpty: isEmptyWraper,
    isEqual,
    isObject,
    encodeBase64,
    decodeBase64
};
