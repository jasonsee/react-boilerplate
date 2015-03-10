'use strict';

var _ = require('ramda');
var Tuxxor = require('tuxxor');

var UserConstants = require('constants').ActionTypes.user;

var UserStore = Tuxxor.createStore({

    initialize: function() {
        this.user = null;
    },

    promises: {
        "login": "SESSION_LOGIN"
    },

    login: {
        success: function([user, transactionId]) {
            this.waitFor(['SessionStore'], (SessionStore) => {
                this.setUser(user);
            });
        }
    },

    setUser: function(user) {
        this.user = user;
        this.emit('change');
    },

    getState: function() {
        return _.clone({
            user: this.user
        });
    }

});


module.exports = new UserStore();

