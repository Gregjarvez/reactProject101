'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (test, production) {
    /**
     * JS loader
     * Transpile .js files using babel-loader
     * Compiles ES6 and ES7 into ES5 code
     * @see https://github.com/babel/babel-loader
     */
    var js = {
        test: /\.js?$/,
        exclude: [
            /node_modules/
        ],
        include: [
            process.cwd() + '/example',
            process.cwd() + '/src',
            process.cwd() + '/webpack/spec.js'
        ],
        loaders: ['react-hot', 'babel']
    };

    /**
     * Assets loader
     * Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot
     * to output
     * Rename the file using the asset hash
     * Pass along the updated reference to your code
     * You can add here any file extension you want to get
     * copied to your output
     * @see https://github.com/webpack/file-loader
     */
    var assets = {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file!url?limit=8192'
    };

    /**
     * HTML loader
     * Allow loading html through js
     * @see https://github.com/webpack/raw-loader
     */
    var html = {
        test: /\.html$/,
        include: [
            process.cwd() + '/example/index.html'
        ],
        loader: ['raw', 'html-minify'].join('!')
    };

    /**
     * CSS loader
     * Allow loading css through js
     * @see https://github.com/webpack/css-loader
     * Postprocess your css with PostCSS plugins
     * @see https://github.com/postcss/postcss-loader
     */
    var css = {
        test: /\.css$/,
        include: [
            process.cwd() + '/build/app.css'
        ],
        /**
         * Skip loading css in test mode
         * Return an empty module
         * @see https://github.com/webpack/null-loader
         * Use style-loader in development for hot-loading
         * @see https://github.com/webpack/style-loader
         */
        loader: test ? 'null' : production ?
            ExtractTextPlugin.extract('css') : ['style', 'css'].join('!')
    };

    /**
     * JSON loader
     */
    var json = {
        test: /\.json$/,
        include: [
            process.cwd() + '/config'
        ],
        loader: 'json'
    };

    return [
        js,
        assets,
        html,
        css,
        json
    ];
};
