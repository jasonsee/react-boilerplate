'use strict';

window.React = require('react');
//var GithubLink = require('./views/github');
//var ClickCounter = require('./views/clickCounter');
var CounterActions = require('actions').CounterActions

var App = React.createClass({
    
    render: function() {
        return (
            <div>
                <h1>WAT React Boilerplate</h1> 
                <GithubLink />
                <ClickCounter />
            </div>
        ); 
    }
});

React.render(<App />, document.getElementById('app-wrapper'));
