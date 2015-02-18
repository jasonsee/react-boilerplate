'use strict';

var { Route, RouteHandler, Link, DefaultRoute, NotFoundRoute } = require('react-router');

var App = require('handlers/app');

var { Unauthenticated, Login} = require('handlers/unauthenticated');
var { Authenticated, Dashboard, Profile } = require('handlers/authenticated');

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="unauthenticated" handler={Unauthenticated}>
            <Route name="login" path="/login" handler={Login} />
            <DefaultRoute handler={Login} />
        </Route>

        <Route name="authenticated" handler={Authenticated}>
            <Route name="profile" path="/profile" handler={Profile} />
            <Route name="dashboard" path="/dashboard" handler={Dashboard} />
            <DefaultRoute handler={Profile} />
        </Route>

        <DefaultRoute handler={Login} />
    </Route>
);

module.exports = routes;
