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
        text: 'Button',
        items: [
          {text: 'Button', link: '/components/button'}
        ]
      },
      {
        text: 'Input',
        items: [
          {text: 'Input', link: '/components/input'}
        ]
      },
      {
        text: 'Select',
        items: [
          {text: 'Select', link: '/components/select'}
        ]
      },
      {
        text: 'Switch',
        items: [
          {text: 'Switch', link: '/components/switch'}
        ]
      },
      {
        text: 'Form',
        items: [
          {text: 'Form', link: '/components/form'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})