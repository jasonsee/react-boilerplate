'use strict';

var _ = require('ramda');
var Tuxxor = require('helpers/tuxxor');

var SessionConstants = require('constants').ActionTypes.session;

var SessionStore = Tuxxor.createStore({

    initialize: function() {
        this.authed = false;
        this.token = false;
    },

    actions: {
        login: SessionConstants.LOGIN_SUCCESS,
        logout: SessionConstants.LOGOUT_SUCCESS
    },

    login: function() {
        this.authed = true;
        this.emit('change');
    },

    logout: function() {
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
