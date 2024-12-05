const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    , {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
    
        //   {
        //     loader: 'postcss-loader',
        //     options: {
        //       postcssOptions: {
        //         plugins: () => [
        //           require('autoprefixer')
        //         ]
        //       }
        //     }
        //   },
        //   {
        //     loader: 'sass-loader'
        //   }
        ]
      },
      {
        test: /\.png$/,
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          outputPath: "static/images",
          publicPath: 'static/images',
          emitFile: true,
          esModule: false

      }

      }
    ]
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
  resolve: {
    extensions: [".jsx", ".js"]
  },
};