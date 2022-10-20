const { isEmpty } = require('./functions');

/**
 * Validate
 * @param {} variables it's the array that contains the variables to validate if exists.
 * Example:
 *  [ "DDB_USER_CREDENTIALS" ]
 */
const checkEnvVariablesAreDefined = (variables) => {
    if (isEmpty(variables) || !Array.isArray(variables)) {
        throw new Error('NullPointerException at: not variables list found');
    }
    variables.forEach(env => getEnvironmentVariable(env));
};

/**
 * Return environmentVariable
 * @param {*} name The name of env variable. If doesn't exist return NullPointer exception
 */
const getEnvironmentVariable = (name) => {
    const variable = process.env[name];
    if (!variable) {
        throw new Error(`NullPointerException at: ${name} variable not defined`);
    }
    return variable;
};

module.exports = {
    checkEnvVariablesAreDefined,
    getEnvironmentVariable
};
