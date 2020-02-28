var path = require("path"),
    HTMLWebpackPlugin = require("html-webpack-plugin"),
    StylelintBarePlugin = require("stylelint-bare-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    lintFormatter = require("lint-formatter");

var sassOptions = {
    includePaths: [path.resolve(__dirname, "node_modules")]
};

module.exports = {
    entry: {
        app: [
            path.join(__dirname, "/example.main.scss"),
            path.join(__dirname, "/docs.scss"),
            path.join(__dirname, "/docs.js")
        ]
    },
    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: sassOptions
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "index.html")
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new StylelintBarePlugin({
            formatter: lintFormatter.stylelint
        })
    ]
};
