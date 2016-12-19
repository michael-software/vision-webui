import webpack from 'webpack';
import path from 'path';

const ROOT_PATH = path.resolve('./');

export default {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://0.0.0.0:8080',
        path.resolve(ROOT_PATH, 'src/index')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'app.bundle.js'
    },
    devtool: 'cheap-eval-source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?root=."
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    historyApiFallback: true
};