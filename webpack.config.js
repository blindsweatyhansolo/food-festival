const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//  basic configuration, webpack needs three properties: entry, output, and mode
// entry: root of the bundle and the beginning of the dependency graph
// output: bundles and outputs entry point to specified folder (BP: 'dist')
// mode: set up the mode in which the webpack runs (default: production)
// plugins: tells webpack which plugins to look for on load

const config = {
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      {
        // regex to process any image with .jpg file extension
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath(url) {
                // replaces "../" in require statement with "/assets/"
                return url.replace("../", "/assets/");  
              }
            }
          },
          {
            // make sure this is defined AFTER file-loader processes the images
            loader: "image-webpack-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin({
      // the report outputs to an HTML file in the dist folder [report.html]
      analyzerMode: "static"
    })
  ],
  mode: 'development'
};

module.exports = config;