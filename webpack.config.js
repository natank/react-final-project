const currentTask = process.env.npm_lifecycle_event
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');


let config = {
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },


  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]

}
if (currentTask == 'dev') {
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  }

  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 3000,
    historyApiFallback: true
  }
  config.devtool = 'eval-source-map',
    config.mode = 'development'
}

if (currentTask == 'build') {
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app'),
    publicPath: '/',
  }
  config.mode = 'production'
}



module.exports = config;