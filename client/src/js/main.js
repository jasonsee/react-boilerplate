'use strict';

var React = window.React = require('react');
var Fluxxor = require('fluxxor');
var Router = require('react-router');
var routes = require('routes');

// Require styles in all environments other than production
// if this is required in production the build will fail.
if (process.env.NODE_ENV !== 'production') {
    require('../../public/css/style.css');
}

var { flux } = require('flux');

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler flux={flux} />, document.getElementById('app-wrapper'));
});
