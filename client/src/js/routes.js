'use strict';

var { Route, RouteHandler, Link, DefaultRoute, NotFoundRoute } = require('react-router');

var App = require('handlers/app');

var { Unauthenticated, Login} = require('handlers/unauthenticated');
var { Authenticated, Dashboard } = require('handlers/authenticated');
var { Search } = require('handlers/authenticated/search');

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="unauthenticated" handler={Unauthenticated}>
            <Route name="login" path="/login" handler={Login} />
            <DefaultRoute handler={Login} />
        </Route>

        <Route name="authenticated" handler={Authenticated}>
            <Route name="search" path="/search" handler={Search} />
            <Route name="dashboard" path="/dashboard" handler={Dashboard} />
            <DefaultRoute handler={Search} />
        </Route>

        <DefaultRoute handler={Login} />
    </Route>
);

module.exports = routes;
