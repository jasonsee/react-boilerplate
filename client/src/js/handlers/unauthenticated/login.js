'use strict';

var React = require('react');
var { Navigation } = require('react-router');
var { FluxMixin, StoreWatchMixin } = require('flux');
var PImg = require('components/pimg');

var LoginView = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin('SessionStore'), Navigation],

    statics: {
        attemptedTransition: null
    },

    getInitialState: function() {
        return {
            error: '',
            username: '',
            password: ''
        };
    },

    getStateFromFlux: function () {
        return this.getFlux().store('SessionStore').getState();
    },

    submit: function() {
        this.setState({ error: '' });

        if (!this.state.username.length) {
            return this.setState({error: 'Please specify a username'});
        }

        if (!this.state.password.length) {
            return this.setState({error: 'Please specify a password'});
        }

        this.getFlux().actions.session.login(this.state)
            .then(() => {
                if (LoginView.attemptedTransition) {
                    LoginView.attemptedTransition.retry();
                    LoginView.attemptedTransition = undefined;
                } else {
                    this.replaceWith('dashboard');
                }
            })
            .catch((error) => {
                this.setState({ error: error });
            });
    },


    setCredentials: function(event) {
        this.setState({
            username: this.refs.username.getDOMNode().value,
            password: this.refs.password.getDOMNode().value
        });

        if (event.key === 'Enter') {
            this.submit();
        }
    },

    render: function() {
        return <div className="login-container">

            <PImg width="300" height="100" className="logo" />

            <h1>Log In</h1>

            <span className="error">{this.state.error}</span>

            <input
                type="text"
                ref="username"
                placeholder="username"
                onKeyDown={this.setCredentials} />

            <input
                type="password"
                ref="password"
                placeholder="password"
                onKeyDown={this.setCredentials} />

            <button className="submit" onClick={this.submit}>Submit</button>
            <span className="a forgot-password">Forgot Password?</span>

        </div>;
    }
});

module.exports = LoginView;

