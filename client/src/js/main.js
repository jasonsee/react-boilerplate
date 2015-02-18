'use strict';

var React = window.React = require('react');
var Fluxxor = require('fluxxor');
var Router = require('react-router');
var routes = require('routes');

var { flux } = require('flux');

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler flux={flux} />, document.getElementById('app-wrapper'));
});
