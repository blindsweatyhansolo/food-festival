const path = require('path');
const webpack = require('webpack');

//  basic configuration, webpack needs three properties: entry, output, and mode
// entry: root of the bundle and the beginning of the dependency graph
// output: bundles and outputs entry point to specified folder (BP: 'dist')
// mode: set up the mode in which the webpack runs (default: production)
// plugins: tells webpack which plugins to look for on load
module.exports = {
  entry: './assets/js/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
  ],
  mode: 'development'
};

