'use strict';

var { flux } = require('flux');

module.exports = {

    isAuthed: function() {
        return flux.stores.SessionStore.getState().authed;
    }

};

