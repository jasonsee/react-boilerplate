'use strict';

var { flux } = require('flux');
var ajax = require('ajax');


/**
 * Helper function that takes in the ajax options object and inserts the session
 */
ajax.preHook(function(options) {
    return _.merge((options || {}), {
        headers: {
            'X-Access-Token' : flux.stores.SessionStore.getState().token,
        }
    });
});

module.exports = {

    isAuthed: function() {
        return flux.stores.SessionStore.getState().authed;
    }

};

