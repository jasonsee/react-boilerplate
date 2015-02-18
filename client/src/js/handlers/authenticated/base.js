'use strict';

var React = require('react');
var AuthHelper = require('helpers/auth');
var { RouteHandler, Link, Navigation } = require('react-router');
var { FluxMixin, StoreWatchMixin } = require('flux');
var Login = require('handlers/unauthenticated/login');

var Authenticated = React.createClass({displayName: "Authenticated",

    mixins: [Navigation, FluxMixin, StoreWatchMixin('SessionStore')],

    statics: {
        willTransitionTo: function (transition) {
            if (!AuthHelper.isAuthed()) {
                Login.attemptedTransition = transition;
                transition.redirect('login');
            }
        }
    },

    getStateFromFlux: function() {
        return this.getFlux().stores.SessionStore.getState();
    },

    componentWillUpdate: function (newProps, newState) {
        if (!AuthHelper.isAuthed()) {
            this.transitionTo('login');
        }
    },

    logout: function() {
        this.getFlux().actions.session.logout();
    },

    render: function() {
        return <div className="authenticated-container">

            <span onClick={this.logout}>Logout</span>
            <Link to="profile">Profile</Link>
            <Link to="dashboard">Dashboard</Link>

            <RouteHandler />
        </div>;
    }

});

module.exports = Authenticated;



