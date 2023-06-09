import { defineConfig } from "vitepress"
import { mySidebar } from './routes'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vitepress-blog/",
  title: "WALL BLOG",
  description: "a blog by VitePress Site",
  lastUpdated: true,
  themeConfig: {
	outline: 3,
	outlineTitle: '目录',
    nav: [
      { text: "主页", link: "/" },
      { text: "博客", link: "/notes/JavaScript/ES6-总结" },
    ],

    sidebar: mySidebar,
	lastUpdatedText: '上次更新时间',

    socialLinks: [
      { icon: "github", link: "https://github.com/zz-12138" },
    ],
  },
})
