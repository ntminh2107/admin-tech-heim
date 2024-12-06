const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Entry point for bundling
  entry: "./src/index.js", // The main entry point for your React app

  // Output bundled files
  output: {
    path: path.resolve(__dirname, "dist"), // Output folder
    filename: "bundle.js", // The name of the output bundle
    publicPath: "/",
  },

  // Module rules (Loaders)
  module: {
    rules: [
      // Babel loader for JS/JSX files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // CSS loader and style loader
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // File loader for images, fonts, etc.
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]", // File naming convention
            outputPath: "assets/", // Output folder for assets
          },
        },
      },
    ],
  },

  // Resolve JS and JSX extensions
  resolve: {
    extensions: [".js", ".jsx"],
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Path to your HTML template
      filename: "index.html",
    }),
  ],

  // Development Server Configuration
  devServer: {
    contentBase: path.resolve(__dirname, "dist"), // Where to serve files from
    port: 3000, // Port number for the dev server
    hot: true, // Hot Module Replacement
    historyApiFallback: true, // Support for React Router
  },

  // Enable source maps for debugging
  devtool: "source-map",
};
