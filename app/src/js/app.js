'use strict';

window.React = require('react');
// var GithubLink = require('./components/github');
// var ClickCounter = require('./components/clickCounter');
var Actions = require('compwnents');

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
