const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

const deps = require("./package.json").dependencies;

const printCompilationMessage = require('./compilation.config.js');

function getDotenvFilename(){
  return '.env.' + process.env.NODE_ENV;
}

function getDotenvCommonFilename(){
  return '../.env.' + process.env.NODE_ENV;
}

console.log('Dashboard -> Before NODE_ENV :', process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV === 'production';
const dotenvFilename = getDotenvFilename();
const dotenvCommonFilename = getDotenvCommonFilename();
console.log('Dashboard -> isProduction :', isProduction);
console.log('Dashboard -> dotenvFilename:', dotenvFilename);
console.log('Dashboard -> dotenvCommonFilename:', dotenvCommonFilename);
let contextRoot = '/dashboard/';

require('dotenv').config({ path: dotenvCommonFilename });
if (process.env.NODE_ENV === "development"){
  contextRoot = "auto";
}

module.exports = (_, argv) => ({
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: contextRoot,
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9002,
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
      name: "dashboard",
      filename: "dashboard.js",
      remotes: {
        "vconnect": `vconnect@${process.env.REACT_APP_VCONNECT_MFE_URL}/vconnect.js`,
        "vconnect_reports": `vconnect_reports@${process.env.REACT_APP_VCONNECT_REPORT_MFE_URL}/vconnect_reports.js`,
        "portal_admin": `portal_admin@${process.env.REACT_APP_PORTAL_ADMIN_MFE_URL}/portal_admin.js`,
      },
      exposes: {
        "./Dashboard" : "./src/components/DashboardHome"
      },
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
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html"
    }),
    new Dotenv({
      path: dotenvFilename,
    })
  ],
});
