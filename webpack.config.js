const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: [
		'./js/index.js'
	],
	module: {
		rules: [
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		],
	},
	plugins: [
		new VueLoaderPlugin(),
	]
};
