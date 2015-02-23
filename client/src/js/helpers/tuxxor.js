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
 * applyMixins
 *
 * @return {Object} A new StoreSpec that has the results of the mixins
 *                  array merged into it.
 */
var applyMixins = function (storeSpec) {
    return _.reduce(function (newSpec, Mixin) {
        var mixin = Mixin;

        // If the mixin is a function, run it with the given storeSpec and then mixin
        // the result. _.result anyone?
        if (_.is(Function, mixin)) {
            mixin = Mixin(newSpec);
        }

        return _.merge(mixin, newSpec);
    }, storeSpec, storeSpec.mixins || []);
};

/**
 * Given a storeSpec with an array of mixins, and actions ie.
 * {
 *    mixins: [MixinOne, MixinTwo],
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
    applyMixins(storeSpec);

    if (!storeSpec.normalActions) {
        storeSpec.actions = invertObject(storeSpec.actions);
    }

    if (!storeSpec.normalPromises) {
        storeSpec.promises = invertObject(storeSpec.promises);
    }

    if (storeSpec.promises) {
        var promises = generatePromises(_.toPairs(storeSpec.promises));
        storeSpec.actions = _.merge(promises, storeSpec.actions);

        storeSpec = determineHandlers(promises, storeSpec);
        storeSpec = generateHandlers (promises, storeSpec);
    }

    return Fluxxor.createStore(storeSpec);
};

var generateHandlers = function (promises, storeSpec) {
    var values = _.values(promises);
    return _.reduce(function (newSpec, handler) {
        if (!newSpec[handler]) {
            newSpec[handler] = _.identity;
        }
        return newSpec;
    }, storeSpec, values);
};

// {login: { started: function () }} ->
// {loginStarted: function () }}
var extractHandlers = function (promisedObject) {
    var [[key, handlers]]  = _.toPairs(promisedObject);
    var newActions = _.keys(handlers);
    var newHandlers = _.map(function (actionName) {
        var captialized = actionName.charAt(0).toUpperCase() +
                          actionName.slice(1);
        return _.createMapEntry(key + captialized, handlers[actionName]);
    }, newActions);

    return _.mergeAll(newHandlers);
};

var determineHandlers = function (promises, storeSpec) {
    var handlers = _.keys(storeSpec.promises);
    return _.reduce(function (newSpec, handler) {
        if (_.is(Object, newSpec[handler])) {
            var newHandlers = extractHandlers(_.pick([handler], newSpec));
            return _.merge(newHandlers, newSpec);
        }
        return newSpec;
    }, storeSpec, handlers);
};

var generatePromises = _.reduce(function (memo, promisePair) {
    var [actionHandler, dispatchToken] = promisePair;
    var asyncActions = ["Started", "Success", "Failure", "Complete"];
    var handlers = _.map(function (handlerName) {
        var dispatch = `${dispatchToken}_${handlerName.toUpperCase()}`;
        return _.createMapEntry(dispatch, actionHandler + handlerName);
    }, asyncActions);

    return _.merge(_.mergeAll(handlers, memo), memo);
}, {});

var promised = function (dispatchToken, action) {
    return {
        type: 'promised',
        dispatchToken: dispatchToken,
        action: action
    };
};

var sync = function (dispatchToken, action) {
    return {
        type: 'sync',
        dispatchToken: dispatchToken,
        action: action
    };
};

var auto = function (dispatchToken) {
    return sync(dispatchToken, _.identity);
};

var createActions = function (actions, prefix) {
    prefix = prefix || '';
    var create = _.map(function (actionPair) {
        // Action key is the key the action will be called with from a view
        // e.g. actions.categories.add
        //
        // Action is either a [String, function] or String, where the string
        // is the key that dispatched. And the function provides transformations
        // that run upon the data. The transformed data will then be the value
        // that gets dispatched.
        //
        // If the result of executing the data function is a promise. It will auto
        // dispatch "_STARTED, _SUCCESS, _FAILURE, and _COMPLETE" messages.
        var [actionKey, action] = actionPair;
        var dispatchToken;
        var actionHandler;

        if (_.is(Function, action)) {
            return [actionKey, action];
        } else if (_.is(Object, action)) {
            if (action.type === undefined) {
                return [actionKey, createActions(action)];
            }

            actionHandler = action.action;
            dispatchToken = action.dispatchToken;
        }

        var handler = function (data) {
            var result = actionHandler(data);

            if (action.type === 'promised') {
                this.dispatch(dispatchToken + "_STARTED", [data]);

                result.then((resolution) => {
                    this.dispatch(dispatchToken + "_SUCCESS", [resolution]);
                }).catch((rejection) => {
                    this.dispatch(dispatchToken + "_FAILURE", [rejection]);
                }).finally(() => {
                    this.dispatch(dispatchToken + "_COMPLETE");
                });
            } else {
                this.dispatch(prefix, result);
            }

            return result;
        };

        return [actionKey, handler];
    });

    return _.compose(_.fromPairs, create, _.toPairs)(actions);
};

module.exports = {
    createActions: createActions,
    createStore: createStore,
    promised: promised,
    sync: sync,
    auto: auto
};
