import webpack from 'webpack';
import path from 'path';

var ROOT_PATH = path.resolve('./');

export default {
    entry: [
        path.resolve(ROOT_PATH, 'src/index')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'app.bundle.js'
    },
    devtool: 'hidden-source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
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
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': 'production'
            }
        })
    ]
};