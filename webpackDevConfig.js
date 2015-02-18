module.exports = {
    options: {
        webpack: require('./webpackConfig'),
        publicPath: require('./webpackConfig').output.publicPath
    },
    start: {
        keepAlive: true,
        webpack: {
            devtool: 'eval',
            debug: true
        }
    }
};
