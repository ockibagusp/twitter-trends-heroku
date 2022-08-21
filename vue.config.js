module.exports = {
    publicPath: "twitter-trends",
    devServer: {
      proxy: "https://api.github.com"
    }
  }