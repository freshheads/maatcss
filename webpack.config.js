var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HTMLWebpackPlugin = require('html-webpack-plugin'),
    StylelintBarePlugin = require('stylelint-bare-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    webpack = require('webpack'),
    lintFormatter = require('lint-formatter');

var sassOptions = {
    includePaths: [
        path.resolve(__dirname, 'node_modules')
    ]
};

module.exports = {
    entry : {
        app: [path.join(__dirname, '/example.main.scss'), path.join(__dirname, '/docs.scss'), path.join(__dirname, '/docs.js')]
    },
    output: {
        path: path.resolve(__dirname,'docs'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: sassOptions
                    }]
                })
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader'
                    }]
                })
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html')
        }),
        new ExtractTextPlugin('[name].css'),
        new StylelintBarePlugin({
            formatter: lintFormatter.stylelint
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({
                        browsers: [
                            'last 2 version',
                            'ie >= 9',
                            'ios 8'
                        ]
                    }),
                ]
            }
        })
    ]
};
