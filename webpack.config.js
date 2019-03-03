//entry --> output

const path = require('path');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      publicPath: "http://localhost:3000/
        // path:path.join(__dirname, 'public'),
        // filename:'bundle.js'
    },
    module: {
        rules:[{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude:/node_modules/
        },
        {
            test:/\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};

