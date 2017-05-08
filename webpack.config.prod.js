const webpack = require("webpack")
, UglifyJSPlugin = require('uglifyjs-webpack-plugin')
, path = require('path')
, ExtractTextPlugin = require('extract-text-webpack-plugin')
, autoprefixer = require('autoprefixer')
, precss = require('precss')
;

const extractCSS = new ExtractTextPlugin('css/style.css');

module.exports = {
  entry: {
      "js/script.js": './develop/js/main.js',
      "css/style.css": './develop/scss/style.scss',
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'htdocs/assets/'),
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ],
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, 
        loader: "babel-loader", 
        query:{
          presets: ['es2015']
        }
      },
      {
        test: /\.png$/,
        loader: "url-loader?mimetype=image/png"
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          precss(),
          autoprefixer({
            browsers: [
                'last 15 version',
                'ie >= 9',
            ],
          }),
        ]
      }
    }),
    new UglifyJSPlugin({
        warnings: false,
    }),
    extractCSS,
  ],
  resolve: {
    alias: {
      JsPath: path.resolve(__dirname, 'develop/js/'),
      CssPath: path.resolve(__dirname, 'develop/scss/'),
      ImgPath: path.resolve(__dirname, 'htdocs/assets/img/'),
    }
  }
};