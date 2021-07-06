// 要引入webpack
let webpack = require('webpack');
module.exports = {
  // 在vue.config.js中configureWebpack中配置
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
    ]
  }
}
