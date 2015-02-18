'use strict';

var _ = require('ramda');

/**
 * invertObject
 *
 * NB: An error will be thrown if multiple methods listen to the same constant
 *
 * @param {Object} actions An object with keys of method names and values are Strings or Arrays of Strings
 * @return {Object} The action object with keys flipped and arrays expanded
 *
 * @example
 *
 *      invertactions({
 *          login: Constats.LOGIN,
 *          showError: [Constants.LOGIN_FAILURE, Constants.SHOW_ERROR]
 *      });
 */
var invertObject = function(object) {

    var kvPairs = _.toPairs(object || {});

    return _.reduce(function(memo, [action, constant]) {
        if (_.is(String, constant)) {
            memo[constant] = action;
        }

        if (_.is(Array, constant)) {
            _.forEach(constantVal => memo[constantVal] = action);
        }

        return memo;
    }, {}, kvPairs);


};

module.exports = invertObject;

