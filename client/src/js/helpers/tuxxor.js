'use strict';

var _ = require('ramda');
var Fluxxor = require('fluxxor');
var invertObject = require('helpers/invertObject');
var Promise = require('bluebird');


/**
 * promiseify
 *
 * @return {Function} A high order function that wraps resolved promises
 */
var promiseify = function() {
    return function(data) {
        return Promise.resolve(data);
    };
};


/**
 * MagicDispatcher
 *
 * @param {String} actionName The constant that this action will fire events for
 * @param {Function} ServiceFunction The action function to run
 * @return {Function} The wrapped action function that fires events
 */
var MagicDispatcher = function (actionName, ServiceFunction) {
    return function(data) {
        var dispatcher = this;
        var actionId = (data || {}).actionId || '' + Date.now();
        var req = ServiceFunction.call(this, data);

        if (!req.then) { return; }

        dispatcher.dispatch(actionName + '_STARTED', [data, actionId]);

        req
            .then(function(res)  {
                dispatcher.dispatch(actionName + '_SUCCESS', [res, actionId]);
            })
            .catch(function(err)  {
                dispatcher.dispatch(actionName + '_FAILURE', [err, data, actionId]);
            })
            .finally(function(res)  {
                dispatcher.dispatch(actionName + '_FINALLY', [res, actionId]);
            });

        return req;
    };
};


/**
 * processTuple
 *
 * @param {Array} tuple A tuple array of the form [String, Function]
 * @return {Function} The wrapped action Function
 */
var processTuple = function(tuple) {

    // We have a non-promised function, just let it slide
    // Function
    if (_.is(Function, tuple)) { return tuple; }

    // We have a constant and want to generate a simple function that fires events
    // String
    if (_.is(String, tuple)) { return MagicDispatcher.apply(null, [tuple, promiseify]); }

    // We have a normal invokation
    // [Constant, Function]
    return MagicDispatcher.apply(null, tuple);
};


/**
 * createActions
 *
 * @param {Object} actions The action object
 * @return {Object} The action object whic has all its values wrapped
 *
 * @example
 *
 *      var Tuxxor = require('helpers/tuxxor');
 *      var SessionActions = Tuxxor.createActions({
 *          login: [Constants.session.LOGIN, function() { ... }],
 *          logout: [Constants.session.LOGOUT, function() { ... }]
 *      });
 */
var createActions = _.mapObj(processTuple);


/**
 * Given a storeSpec with an array of mixins, and actions ie.
 * {
 *    mixins: [MixinOne, MixinTwo],
 *    normalActions: false,
 *    actions: { ... }
 * }
 *
 * execute `Fluxxor.createStore` on the result of using _.mixin on each of the Mixined
 * objects. MixinOne will not overwrite things specified in the Base Store Spec, MixinTwo
 * will not overwrite things specified in the Mixin One spec.
 *
 * @param storeSpec The typical store specification you would pass into
 * `Fluxxor.createStore.`
 * @return the result of executing all the mixins specified in the store spec.
*/
 var createStore = function (storeSpec) {
    // dirty lazy imperative
    _.map(function (Mixin) {
        var mixin = Mixin;

        // If the mixin is a function, run it with the given storeSpec and then mixin
        // the result. _.result anyone?
        if (_.is(Function, mixin)) {
            mixin = Mixin(storeSpec);
        }

        storeSpec = _.merge(mixin, storeSpec);
    }, storeSpec.mixins || []);


    // Flip the actions hash so you can put your constants as your value and
    // action names as  your keys only if they don't other wise say so with
    // normalActions on their storeSpec
    if (!storeSpec.normalActions) {
        storeSpec.actions = invertObject(storeSpec.actions);
    }

    return Fluxxor.createStore(storeSpec);
};


module.exports = {
    createStore: createStore,
    createActions: createActions
};




