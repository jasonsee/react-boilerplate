'use strict';

var AppDispatcher = require('dispatcher').AppDispatcher,
    assign = require('react/lib/Object.assign'),
    EventEmitter = require('events').EventEmitter,
    AppConstants = require('constants').AppConstants,
    ActionTypes = AppConstants.ActionTypes,
    CHANGE_EVENT = 'change';

var _count = 0;

var CounterStore = assign({}, EventEmitter.prototype, {
    
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback); 
    },

    getCount: function() {
        return _count;
    }
});

CounterStore.dispatcherToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.COUNTER_INCREMENT_COUNT:
            _count += action.quantity;
            CounterStore.emitChange();
            break;
    }
});

module.exports = CounterStore;

