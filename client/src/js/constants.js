'use strict';

var _ = require('ramda');

var actionMirror = require('helpers/actionMirror');
var keyMirror = require('react/lib/keyMirror');


var AppConstants = {

    ActionTypes: actionMirror({
        session: {
            LOGIN: null,
            LOGOUT: null
        },

        user: {
            GET: null
        },

        customer: {
            GET: null
        },

        uiform: {
            SET: null
        }
    })

};

module.exports = AppConstants;
