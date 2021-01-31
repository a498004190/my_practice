module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: 8090,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    }
  }
}
