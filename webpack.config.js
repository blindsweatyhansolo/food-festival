//  basic configuration, webpack needs three properties: entry, output, and mode
// entry: root of the bundle and the beginning of the dependency graph
// output: bundles and outputs entry point to specified folder (BP: 'dist')
// mode: set up the mode in which the webpack runs (default: production)
// plugins: tells webpack which plugins to look for on load
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require('path');

const config = {
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js'
  },
  output: {
    path: path.join(__dirname + "/dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath(url) {
                return url.replace('../', '/assets/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    new WebpackPwaManifest({
      // name: appears next to apps icon on desktop
      name: "Food Event",
      // shortname: appears on homescreen when downloaded (mobile)
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      // specifies homepage for the PWA relative to location of manifest file
      start_url: "../index.html",
      // shows up prior to first paint
      background_color: "#01579b",
      // toolbar color
      theme_color: "#ffffff",
      // fingerprints / inject specific to manifest plugin
      // fingerprints: specifies whether or not webpack should generate unique fingerprints
      // each time a new manifest is generated; ex: 'manifest.lhge325d.json'
      fingerprints: false,
      // inject: determines whether manifest.json link is added to the HTML
      inject: false,
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ],
  mode: 'development'
};

module.exports = config;
