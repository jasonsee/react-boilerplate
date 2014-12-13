'use strict';

var { Route, RouteHandler, Link, DefaultRoute, NotFoundRoute } = require('react-router');

var App = require('views/app');

var routes = (
    <Route name="app" path="/" handler={App}>
    </Route>
);

module.exports = routes;
