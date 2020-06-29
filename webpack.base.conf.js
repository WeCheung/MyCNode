const webpack = require('webpack')

module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
        })
    ]
}