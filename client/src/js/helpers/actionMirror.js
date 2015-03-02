'use strict';

var _ = require('ramda');

/**
 * actionMirror
 *
 * @param {Object} obj Nested Constants object
 * @param {String} prefix Optional prefix for all constants
 * @return {Object} Prefixed and promisified constants
 *
 * @example
 *
 *      actionMirror({
 *          "admin": {
 *              "AUTH": null
 *          },
 *          "LOAD": null
 *      });
 *
 *      // {
 *      //     admin: {
 *      //         ADMIN_AUTH        : 'ADMIN_AUTH',
 *      //         ADMIN_AUTH_STARTED: 'ADMIN_AUTH_STARTED',
 *      //         ADMIN_AUTH_SUCCESS: 'ADMIN_AUTH_SUCCESS',
 *      //         ADMIN_AUTH_FAILURE: 'ADMIN_AUTH_FAILURE'
 *      //     },
 *      //     LOAD        : 'LOAD',
 *      //     LOAD_STARTED: 'LOAD_STARTED',
 *      //     LOAD_SUCCESS: 'LOAD_SUCCESS',
 *      //     LOAD_FAILURE: 'LOAD_FAILURE'
 *      // }
 */
var actionMirror = function (obj, prefix) {
    if (!_.is(Object, obj) || _.is(Array, obj)) {
        throw new Error('actionMirror(...): Argument must be an object.');
    }

    prefix = (prefix || '').toUpperCase();
    var mirror = _.reduce(function (memo, kvPair) {
        var key = _.head(kvPair);
        var value = _.last(kvPair);
        var toConcat = [];

        if (_.is(Object, value)) {
            toConcat = [[key, actionMirror(value, key + "_")]];
        } else if (value === null)  {
            key = key.toUpperCase();
            var actionName = (prefix + key);

            toConcat = [
                        [key, actionName],
                        [key + '_STARTED', actionName + '_STARTED'],
                        [key + '_SUCCESS', actionName + '_SUCCESS'],
                        [key + '_FAILURE', actionName + '_FAILURE'],
                        [key + '_FINALLY', actionName + '_FINALLY']];
        } else {
            toConcat = [[key, value]];
        }

        return _.concat(memo, toConcat);
    }, []);

    return _.compose(_.fromPairs, mirror, _.toPairs)(obj);
};


module.exports = actionMirror;
