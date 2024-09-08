const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

const printCompilationMessage = require('./compilation.config.js');

function getDotenvFilename(){
  return '.env.' + process.env.NODE_ENV;
}

function getDotenvCommonFilename(){
  return '../.env.' + process.env.NODE_ENV;
}

console.log('Before NODE_ENV :', process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV === 'production';
const dotenvFilename = getDotenvFilename();
const dotenvCommonFilename = getDotenvCommonFilename();
console.log('isProduction :', isProduction);
console.log('dotenvFilename:', dotenvFilename);
console.log('dotenvCommonFilename:', dotenvCommonFilename);

require('dotenv').config({ path: dotenvCommonFilename });

console.log('After REACT_APP_DASHBOARD_MFE_URL in webpack config :', process.env.REACT_APP_DASHBOARD_MFE_URL);

module.exports = (_, argv) => ({
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    publicPath: "auto",
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, 'src')],
    onListening: function (devServer) {
      const port = devServer.server.address().port

      printCompilationMessage('compiling', port)

      devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage('failure', port)
          } else {
            printCompilationMessage('success', port)
          }
        })
      })
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "winze_portals",
      filename: "winze_portals.js",
      remotes: {
        "login": `login@${process.env.REACT_APP_LOGIN_MFE_URL}/login.js`,
        "dashboard": `dashboard@${process.env.REACT_APP_DASHBOARD_MFE_URL}/dashboard.js`,
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: deps["react-router-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv({
      path: dotenvFilename,
    })
  ],
});

console.log('NODE_ENV in webpack config :', process.env.NODE_ENV);
console.log('REACT_APP_DASHBOARD_MFE_URL in webpack config :', process.env.REACT_APP_DASHBOARD_MFE_URL);


