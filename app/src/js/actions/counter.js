'use strict';

var AppDispatcher = require('dispatcher').AppDispatcher,
    AppConstants = require('konstants').AppConstants,
    ActionTypes = AppConstants.ActionTypes;

var CounterActions = {
    increment: function() {
        AppDispatcher.handleServerAction({
            type: ActionTypes.COUNTER_INCREMENT_COUNT,
            quantity: 1
        });
    }
};

module.exports = CounterActions;
