import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Component Project",
  description: "A VitePress Site",
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/components/button' }
    ],

    sidebar: [
      {
        text: 'Basic Component',
        items: [
          {text: 'Button 按钮', link: '/components/button'},
          {text: 'Collapse 折叠面板', link: '/components/collapse'},
          {text: 'Dropdown 下拉菜单', link: '/components/dropdown'},
          {text: 'Input 输入框', link: '/components/input'},
          {text: 'Select 选择器', link: '/components/select'},
          {text: 'Switch 开关', link: '/components/switch'},
          {text: 'Form 表单', link: '/components/form'}
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ShineWithYou/Component-Library' }
    ]
  }
})