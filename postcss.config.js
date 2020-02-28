module.exports = {
    plugins: [
        require("autoprefixer")({
            browsers: ["last 2 version", "ie >= 9", "ios 8"]
        })
    ]
};
