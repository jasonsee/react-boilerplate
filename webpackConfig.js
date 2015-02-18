var dependencies = Object.keys(require('./package.json').dependencies);
var webpack = require('webpack');
var config = require('./config');

module.exports = {
    cache: true,
    watch: true,
    watchDelay: 200,
    entry: [
        'webpack-dev-server/client?http://localhost:'+config.port,
        'webpack/hot/dev-server',
        './client/src/js/main'
    ],
    output: {
        path: __dirname + '/client/public/js',
        filename: 'main.js',
        publicPath: '/public/js/'
    },
    module: {
        loaders: [
            { test: /\.js$/,  loaders: ['react-hot', "jsx-loader?harmony&stripTypes&es5"] }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: __dirname + '/client/src/js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
        //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ]
};
