var webpack = require('webpack'),
       path = require('path');

module.exports = {
    context: __dirname + '/public',
    entry: {
        app: './app.js', 
        vendor: ['angular', 'angular-resource', 'angular-route', 'angular-flash-alert']  
    },
    output: {
        path: __dirname + '/public',
        filename: 'bridgetowngig.bundle.min.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.min.js"),
        new webpack.optimize.UglifyJsPlugin({})
    ]
};

