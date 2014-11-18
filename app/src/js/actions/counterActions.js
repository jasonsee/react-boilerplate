'use strict';

var AppDispatcher = require('dispatcher/appDispatcher'),
    AppConstants = require('constants/appConstants'),
    ActionTypes = AppConstants.ActionTypes;

var CounterActions = {
    increment: function() {
        AppDispatcher.handleServerAction({
            type: ActionTypes.COUNTER_INCREMENT_COUNT,
            quantity: 1
        });
    }
}

module.exports = CounterActions;
