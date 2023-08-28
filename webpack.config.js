const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin()],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist-webpack"),
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // compiles Less to CSS
          // "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: (loaderContext) => {
                // More information about available properties https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath.match("pageA")) {
                  console.log('pageA')
                  return {
                    modifyVars: {
                      "@primaryColor": "gray",
                    },
                  };
                }

                  console.log('pageB')
                return {
                  modifyVars: {
                    "@primaryColor": "yellow",
                  },
                };
              },
            },
          },
        ],
      },
    ],
  },
};
