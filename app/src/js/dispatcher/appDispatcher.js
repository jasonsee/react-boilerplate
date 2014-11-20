'use strict';

var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
var AppConstants = require('konstants').AppConstants;
var PayloadSources = AppConstants.PayloadSources;

var AppDispatcher = assign(new Dispatcher(), {

    handleViewAction: function(action) {
        this.dispatch({
            source: PayloadSources.VIEW_ACTION,
            action: action
        });
    },

    handleServerAction: function(action) {
        this.dispatch({
            source: PayloadSources.SERVER_ACTION,
            action: action
        });
    }
});

module.exports = AppDispatcher;
