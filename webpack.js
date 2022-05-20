const path = require('path')
const webpackConfig = require('@nextcloud/webpack-vue-config')

webpackConfig.entry.settings = path.join(__dirname, 'src', 'settings.js')
webpackConfig.entry.talk = path.join(__dirname, 'src', 'talk.js')

module.exports = webpackConfig
