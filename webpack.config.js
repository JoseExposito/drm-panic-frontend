import path from "node:path";
import { fileURLToPath } from "node:url";
import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === "production";

export default () => ({
  mode: isProduction ? "production" : "development",
  entry: "./src/index.jsx",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: false,
    hot: true,
    host: "localhost",
    port: 8080,
  },
  devtool: isProduction ? "source-map" : "inline-source-map",
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: "source-map-loader",
        enforce: "pre",
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      // Don't fail the build on error, they will be shown in the browser
      failOnError: false,
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        isProduction ? "production" : "development",
      ),
    }),
    isProduction && new MiniCssExtractPlugin(),
  ].filter(Boolean),
});
