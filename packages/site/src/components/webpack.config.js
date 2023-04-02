const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Change this to your entry file
  output: {
    path: path.resolve(__dirname, 'dist'), // Change this to your output directory
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Change this to your desired loader
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // Add any additional loaders as needed
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html', // Change this to your HTML template file
      filename: 'template.html',
    }),
    // Add any additional plugins as needed
  ],
  // Add any additional configurations as needed
};
