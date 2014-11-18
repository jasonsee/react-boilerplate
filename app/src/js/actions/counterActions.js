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
};

module.exports = CounterActions;

//     "actions": "npm link ./app/src/js/actions",
//     "constants": "npm link ./app/src/js/constants",
//     "dispatcher": "npm link ./app/src/js/dispatcher",
//     "stores": "npm link ./app/src/js/stores",

