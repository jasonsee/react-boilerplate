'use strict';

var keyMirror = require('react/lib/keyMirror');

var AppConstants = {

    ActionTypes: keyMirror({
        COUNTER_INCREMENT_COUNT: null        
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    Routes: {
        
    }
};

module.exports = AppConstants;
