import _ from 'lodash';

export default class ParameterInjector {
    /**
     * Constructor
     *
     * Sets random delimiter
     *
     * @private
     *
     * @return {null} Nothin'
     */
    constructor() {
        this.delimiter = (Math.random()*1e64).toString(36);
    }

    /**
     * Static call to inject params into an object
     *
     * @private
     *
     * @param {string|object} target Plain object or string
     * @param {array|object} params Array or plain object with params
     *
     * @return {string|object} Plain object or string with injected params
     */
    static inject(target, params) {
        var instance = (new ParameterInjector());

        if (_.isString(target)) {
            return instance.injectParams(target, params);
        }

        if (_.isPlainObject(target)) {
            return instance.injectIntoObject(target, params);
        }

        if (_.isArray(target)) {
            return instance.injectIntoObject(target, params);
        }

        return target;
    }

    /**
     * Injects params into an object
     *
     * @private
     *
     * @param {object} obj Plain object
     * @param {array|object} params Array or plain object with params
     *
     * @return {object} Plain object with injected params
     */
    injectIntoObject(obj, params) {
        var preparedString = this.injectionPreparation(obj);
        var newString = this.injectParams(preparedString, params);
        var newObject = this.injectionPreparation(newString);

        return newObject;
    }

    /**
     * Makes an object rea
     *
     * @private
     *
     * @param {string|object} obj Plain object or obj JSON string
     *
     * @return {string|object} Obj JSON string or object
     */
    injectionPreparation(obj) {
        if (_.isString(obj) && obj.indexOf(this.delimiter) !== -1) {
            var objArray = obj.split(this.delimiter);

            return JSON.parse(objArray[1]);
        }

        return this.delimiter + JSON.stringify(obj) + this.delimiter;
    }

    /**
     * Injects parameters into a string
     *
     * @private
     *
     * @param {string} str The target string
     * @param {string|array|object} params The params to be injected into the target string
     *
     * @return {string} Target string with injected parameters
     */
    injectParams(str, params) {
        if (_.isPlainObject(params)) {
            return this.injectParamsObject(str, params);
        }

        if (!_.isArray(params)) {
            params = [params];
        }

        return this.injectParamsArray(str, params);
    }

    /**
     * Injects array of parameters into the target string
     *
     * @private
     * @source https://github.com/sequelize/sequelize/blob/master/lib/sql-string.js -> SqlString.format
     *
     * @param {string} str The target string
     * @param {array} params The params to be injected into the target string
     *
     * @return {string} Target string with injected parameters
     */
    injectParamsArray(str, params) {
        return str.replace(/\?/g, (match) => {
            if (!params.length) {
                return match;
            }

            return params.shift();
        });
    }

    /**
     * Injects object of parameters into the target string
     *
     * @private
     * @source https://github.com/sequelize/sequelize/blob/master/lib/sql-string.js -> SqlString.formatNamedParameters
     *
     * @param {string} str The target string
     * @param {object} params The params to be injected into the target string
     *
     * @return {string} Target string with injected parameters
     */
    injectParamsObject(str, params) {
        return str.replace(/\:+(?!\d)(\w+)/g, (value, key) => {
            if (params[key] !== undefined) {
                return params[key];
            }

            throw new Error('[1438415385] Named parameter "' + value + '" has no value in the given object.');
        });
    }
}
