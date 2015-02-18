'use strict';

var _ = require('ramda');
var Tuxxor = require('helpers/tuxxor');

var UserConstants = require('constants').ActionTypes.user;
var SessionConstants = require('constants').ActionTypes.session;

var UserStore = Tuxxor.createStore({

    initialize: function() {
        this.user = null;
    },

    actions: {
        loginSuccess: SessionConstants.LOGIN_SUCCESS
    },

    loginSuccess: function([user, transactionId]) {
        this.waitFor(['SessionStore'], (SessionStore) => {
            this.setUser(user);
        });
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

