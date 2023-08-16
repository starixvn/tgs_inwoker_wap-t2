const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
var InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
var BrotliPlugin = require("brotli-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var hash = require('object-hash');
var hashCode = hash(new Date());

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    clean: true,
    filename: hashCode + '/[name].[contenthash].js',
  },
  devServer: {
    historyApiFallback: {
      rewrites : [
        {from: /^\/$/, to: './index.html'}
      ]
    }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 6,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        "test": /\.(otf|ttf|woff|woff2|ani)$/,
        "loader": "url-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 1
        }
      },

      {
        test: /\.(png|jp(e*)g|svg|gif|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
              limit: 50000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
    // new BundleAnalyzerPlugin(),
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/assets", to: hashCode + "/assets" },
        { from: "public/css", to: hashCode + "/css" },
        { from: "public/env.html", to: "" },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        "IMAGE_INLINE_SIZE_LIMIT":"0",
        "REACT_APP_VERSION":"1.37.0",
        "SKIP_PREFLIGHT_CHECK":"true",
        "GENERATE_SOURCEMAP":"false",
        "PUBLIC_URL":"/" + hashCode}),
      
    }),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: "/"  + hashCode,
      // You can pass any key-value pairs, this was just an example.
      // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
    }),
  ],
};
