import path from "node:path";
import { fileURLToPath } from "node:url";
import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === "production";

export default () => ({
  mode: isProduction ? "production" : "development",
  entry: "./src/index.jsx",
  dotenv: true,
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    open: false,
    hot: true,
    host: "localhost",
    port: 8888,
    // Proxy the Bugzilla local web server (http://localhost:8080/) as
    // "/bugzilla" to avoid CORS issues:
    proxy: [
      {
        context: ["/bugzilla"],
        target: "http://0.0.0.0:8080/",
        pathRewrite: { "^/bugzilla": "" },
        secure: false,
      },
    ],
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
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
        ],
      },
      {
        test: /\.(svg|png|jpg|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        // PatterFly fonts:
        // https://github.com/patternfly/patternfly-react-seed/blob/main/webpack.common.js
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        type: "asset/resource",
        include: [
          path.resolve(__dirname, "node_modules/patternfly/dist/fonts"),
          path.resolve(
            __dirname,
            "node_modules/@patternfly/react-core/dist/styles/assets/fonts",
          ),
          path.resolve(
            __dirname,
            "node_modules/@patternfly/react-core/dist/styles/assets/pficon",
          ),
          path.resolve(
            __dirname,
            "node_modules/@patternfly/patternfly/assets/fonts",
          ),
          path.resolve(
            __dirname,
            "node_modules/@patternfly/patternfly/assets/pficon",
          ),
        ],
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
      favicon: "public/favicon.ico",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        isProduction ? "production" : "development",
      ),
    }),
    isProduction && new MiniCssExtractPlugin({ filename: "[name].[hash].css" }),
  ].filter(Boolean),
});
