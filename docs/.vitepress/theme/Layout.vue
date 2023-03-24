<template>
	<Layout>
		<!-- 插槽自定义主题 -->
	</Layout>
</template>

<script setup>
	import DefaultTheme from 'vitepress/theme'
	import { useData } from 'vitepress'

	const { Layout } = DefaultTheme

	const { theme } = useData() //这里的frontmatter就是各个md文件中自己写在最上面的东西
	// console.log((theme))
</script>

<style lang="less" scoped>
	.page-info {
		font-size: 13px;
		color: #7f7f7f;
		margin-right: 10px;
	}
</style>