const path = require("path");
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      "jQuery": "jquery",
      "window.jQuery": "jquery",
      "jquery": "jquery",
      "window.jquery": "jquery",
      "$": "jquery",
      "window.$": "jquery"
    })
  ],
  externals: {
    jquery: 'jQuery'
  },
  entry: {
    main: "./src/js/main.js",
    modules: "./src/js/modules.js",
    global: "./src/js/global.js",
    kladr: "./src/js/kladr.js",
    script: "./src/js/script.js",
    questions: "./src/js/questions.js",
    tech: "./src/js/tech.js",
    wishlist: "./src/js/wishlist.js"
  },

  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/"
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        query: {
          presets: [
            ["@babel/preset-env", {
              modules: false
            }]
          ]
        }
      }
    }]
  },

  resolve: {
    alias: {
      //"%modules%": path.resolve(__dirname, "src/blocks/modules"),
      //"%components%": path.resolve(__dirname, "src/blocks/components")
    }
  }
};