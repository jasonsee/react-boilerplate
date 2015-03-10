'use strict';

var _ = require('ramda');
var Promise = require('bluebird');
var reqwest = require('reqwest');
var constants = require('constants');
var Routes = constants.Routes || {};

var preCallbacks = [];
var postCallbacks = [];

// Swallow all uncaught Promises
Promise.onPossiblyUnhandledRejection(function(e, promise) { return [e, promise]; });

/**
 * Simple constructor function that
 * manages concurrnet XHR requests.
 *
 * @class RequestManager
 */
var requestManager = (function() {
    var requestHash = {};

    /**
     * Checks the current request and aborts
     * it, then adds the current request to the slot.
     *
     * @param {Object} request Reqwest object
     * @method addRequest
     */
    var addRequest = function(name, request) {
        var storedRequest = requestHash[name];

        if (storedRequest) {
            storedRequest.abort();
        }

        request.always(() => requestHash[name] = null);

        requestHash[name] = request;
    };

    return addRequest;
})();


/**
 * Turns an object into a URL-safe query string.
 *
 * @method serializeQueryParams
 * @return {String}
 */
var serializeQueryParams = function(data) {
    if (!data) { return ''; }

    /**
     * Provides a simple check for an empty value and joins
     * and then turns the param into a valid query param
     *
     * @method parameterize
     * @return {Array}
     */
    var parameterize = function(pair) {
        if (_.isEmpty(_.last(pair))) { return []; }
        return [_.join('=', pair)];
    };

    /**
     * If a query param is an array, `toArrayParam`
     * returns a parameterized version of each index
     *
     * @method toArrayParam
     * @return {Array}
     */
    var toArrayParam = function(pair) {
        return _.map(function(item) {
            return parameterize([pair[0] + '[]', item]);
        }, _.last(pair));
    };

    /**
     * Returns an array of parameterized elements
     *
     * @method keyVals
     * @return {Array}
     */
    var keyVals = function(pair) {
        if (_.isArrayLike(_.last(pair))) {
            return toArrayParam(pair);
        }
        return parameterize(pair);
    };

    return '?' + _.join('&', _.flatten(_.map(keyVals, _.toPairs(data))));
};


/**
 * Helper method that ensures options are passed
 * in as an object or will be set as an object.
 *
 * @param {Object} options
 *
 * @method setOptionsHash
 * @return {Object} options
 */
var setOptionsHash = function(options) {
    options = options || {};

    if (_.type(options) !== 'Object') {
        return {};
    }

    return options;
};


/**
 * Wrapper around `reqwest` (XHR library)
 * that return a promise with the server response.
 *
 * @method buildRequest
 * @return {Promise}
 */
var buildRequest = function(options) {
    options = setOptionsHash(options);

    /**
     * Options
     *                            DEFAULTS
     *
     * route        (Required)
     * queryParams  (Optional)
     * type         (Optional)    'json'
     * method       (Required)
     * data         (Optional)
     * contentType  (Optional)    'application/x-www-form-urlencoded'
     * crossOrigin  (Optional)    false
     */
    options = _.merge({
        route: '',
        queryParams: '',
        type: 'json',
        method: '',
        data: null,
        contentType: 'application/x-www-form-urlencoded',
        crossOrigin: false
    }, options);

    var requestOptions = {
        url: (Routes[options.route] || options.route),
        type: options.type,
        method: options.method,
        data: options.data,
        contentType: options.contentType,
        crossOrigin: options.crossOrigin,
        headers: options.headers
    };

    // Allow all preHooks to modify the request options before execution
    var finalizedOptions = _.reduce(function(options, callback) {
        return callback(options);
    }, requestOptions, preCallbacks);

    finalizedOptions.url = finalizedOptions.url + finalizedOptions.queryParams;

    // Fire off the requeset and cast it to a Promise
    var request = Promise.resolve(reqwest(finalizedOptions));

    // If the user wants to queue this, send it to the requestManager
    if (options.queueRequest) {
        requestManager.addRequest(options.queueRequest, request);
    }

    // Allow all postHooks to tap into the promise before passing it back
    return _.reduce(function(promise, [success, error]) {
        return promise.then(success, error);
    }, request, postCallbacks);
};


// Public interface. Unified API between gets and posts/puts,
// all data is passed in as an object.
var AJAX = {

    get: function(route, params, options) {
        options = setOptionsHash(options);

        var defaults = {
            route: route,
            queryParams: serializeQueryParams(params),
            method: 'GET'
        };

        return buildRequest(_.merge(defaults, options));
    },

    post: function(route, data, options) {
        options = setOptionsHash(options);

        var defaults = {
            route: route,
            contentType: 'application/json',
            data: JSON.stringify(data),
            method: 'POST'
        };

        return buildRequest(_.merge(defaults, options));
    },

    put: function(route, data, options) {
        options = setOptionsHash(options);

        var defaults = {
            route: route,
            contentType: 'application/json',
            data: JSON.stringify(data),
            method: 'PUT'
        };

        return buildRequest(_.merge(defaults, options));
    },

    del: function(route, options) {
        options = setOptionsHash(options);

        var defaults = {
            route: route,
            method: 'DELETE'
        };

        return buildRequest(_.merge(defaults, options));
    },

    preHook: function(fn) {
        preCallbacks.push(fn);
    },

    postHook: function(success, err) {
        postCallbacks.push([success, err]);
    },

    serializeQueryParams: serializeQueryParams

};

module.exports = AJAX;
