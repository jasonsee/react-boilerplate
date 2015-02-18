'use strict';

var PImg = React.createClass({

    getInitialProps: function() {
        return {
            width: 100,
            height: 100,
            className: ''
        };
    },

    render: function() {
        var width = this.props.width;
        var height = this.props.height;

        var src = 'http://placehold.it/'+width+'x'+height;

        return <img src={src} className={this.props.className} />;
    }

});

module.exports = PImg;
