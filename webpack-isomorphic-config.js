var IsoToolsPlugin = require('webpack-isomorphic-tools/plugin')

module.exports = {
  assets: {
    images: {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg'],
      parser: IsoToolsPlugin.url_loader_parser
    },
    styles: {
      extensions: ['less', 'scss'],
      filter: function (module, regular_expression, options, log) {
        if (options.development) {
          return IsoToolsPlugin.style_loader_filter(module, regular_expression, options, log)
        }
      },
      path: function (module, options, log) {
        if (options.development) {
          return IsoToolsPlugin.style_loader_path_extractor(module, options, log)
        } else {
          return module.name
        }
      },
      parser: function (module, options, log) {
        if (options.development) {
          return IsoToolsPlugin.css_modules_loader_parser(module, options, log)
        } else {
          return module.source
        }
      }
    }
  }
}
