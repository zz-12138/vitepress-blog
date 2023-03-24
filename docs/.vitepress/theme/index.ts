import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import Layout from './Layout.vue'

const theme : Theme = {
	...DefaultTheme,
	Layout,
	enhanceApp({ app, router, siteData }) {
		// console.log(app, router, siteData)
		// app is the Vue 3 app instance from `createApp()`.
		// router is VitePress' custom router. `siteData` is
		// a `ref` of current site-level metadata.
	},

	setup() {
		// this function will be executed inside VitePressApp's
		// setup hook. all composition APIs are available here.
	}
}

export default theme