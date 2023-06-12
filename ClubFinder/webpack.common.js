const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: 
        './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    devServer: {
        client: {
        overlay: {
            errors: true,
            warnings: false,
        },
        },
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader'
            }
            ]
        }
        ]
    },
    
    plugins: [
        /* HTML Webpack Plugin */
        new HtmlWebpackPlugin({
        template: './src/template.html',
        filename: 'index.html',
        }),
    ]
};