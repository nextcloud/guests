import { createAppConfig } from '@nextcloud/vite-config'

export default createAppConfig({
	main: 'src/main.js',
	settings: 'src/settings.js',
	talk: 'src/talk.js',
},
{
	inlineCSS: {
		relativeCSSInjection: true,
	},
})
