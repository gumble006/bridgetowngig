var webpack = require('webpack'),
       path = require('path');

module.exports = {
    context: __dirname + '/public',
    entry: {
        app: './app.js', 
        vendor: ['angular', 'angular-resource', 'angular-route']  
    },
    output: {
        path: __dirname + '/public',
        filename: 'bridgetowngig.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.js")
    ]
};
