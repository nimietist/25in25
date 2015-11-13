var IsoToolsPlugin = require('webpack-isomorphic-tools/plugin')

module.exports = {
  assets: {
    images: {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg'],
      parser: IsoToolsPlugin.url_loader_parser
    }
  }
}
