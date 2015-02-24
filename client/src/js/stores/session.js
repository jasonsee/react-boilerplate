'use strict';

var _ = require('ramda');
var Tuxxor = require('helpers/tuxxor');

var SessionConstants = require('constants').ActionTypes.session;

var SessionStore = Tuxxor.createStore({

    initialize: function() {
        this.authed = false;
        this.token = false;
    },

    promises: {
        "login": "SESSION_LOGIN",
    },

    actions: {
        "logout": "SESSION_LOGOUT"
    },

    login: {
        success: function () {
            this.authed = true;
            this.emit('change');
        }
    },

    logout: function () {
        this.authed = false;
        this.emit('change');
    },

    getState: function() {
        return _.clone({
            authed: this.authed,
            token: this.token
        });
    }
});

module.exports = new SessionStore();
