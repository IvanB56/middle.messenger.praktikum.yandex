import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const isProduction = process.env.NODE_ENV === "production";
const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: "body"
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                },
                exclude: ['/node_modules/']
            },
            {
                test: /\.svg$/i,
                type: 'asset/source'
            },
            {
                test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset'
            },
            {
                test: /\.less$/i,
                use: [stylesHandler, "css-loader", "less-loader"],
            },
            {
                test: /\.(?:jpg|jpeg)$/i,
                type: 'asset/resource',
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
        alias: {
            handlebars: 'handlebars/dist/handlebars.js'
        }
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
