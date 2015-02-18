'use strict';

/**
 * Expose / conglomorate everything related to Flux here.
 * This also allows us to more cleanly use the FluxMixin without
 * needing to pass it React every time we use it.
 */

var React = require('react');
var { Flux, FluxMixin, StoreWatchMixin } = require('fluxxor');


var stores = {
    SessionStore: require('stores/session'),
    UserStore: require('stores/user')
};

var actions = {
    session: require('actions/session'),
    user: require('actions/user')
};


module.exports = {
    flux: new Flux(stores, actions),
    FluxMixin: FluxMixin(React),
    StoreWatchMixin: StoreWatchMixin
};

