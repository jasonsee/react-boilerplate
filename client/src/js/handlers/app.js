'use strict';

var React = require('react');
var { RouteHandler } = require('react-router');
var { FluxMixin, StoreWatchMixin } = require('flux');



var App = React.createClass({

    mixins: [FluxMixin],

    render: function() {
        return <div className="app-container">
            <RouteHandler />
        </div>;
    }
});

module.exports = App;
