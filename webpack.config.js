const path = require('path');

module.exports = {
    entry: [ "@babel/polyfill", './src/app/index.js'],
    output: {
        path: __dirname + '/src/public',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                use: ['babel-loader'],
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            }
        ]
    }
};