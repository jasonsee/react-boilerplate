'use strict';

var {promised} = require('helpers/tuxxor');
var SessionAPI = require('apis/session');

var login = function(credentials) {
    return SessionAPI.login(credentials);
};

var logout = function() {
    return SessionAPI.logout();
};

var SessionActions = {
    login: promised("SESSION_LOGIN", login),
    logout: promised("SESSION_LOGOUT", logout)
};

module.exports = SessionActions;




