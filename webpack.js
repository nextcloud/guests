const { merge } = require('webpack-merge')
const path = require('path')
const webpackConfig = require('@nextcloud/webpack-vue-config')

const config = {
	entry: {
		settings: path.join(__dirname, 'src', 'settings.js'),
	},
}

module.exports = merge(config, webpackConfig)
