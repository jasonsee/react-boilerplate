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
            { test: /\.js$/,  loaders: ['react-hot', "jsx-loader?harmony&stripTypes&es5"] },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png" },
            { test: /\.jpg$/, loader: "file-loader" }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: __dirname + '/client/src/js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify("development")
            }
        })
    ]
};
