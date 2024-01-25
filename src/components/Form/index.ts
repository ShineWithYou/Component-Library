import type { App } from 'vue'
import Form from '@/components/Form/Form.vue'

Form.install = (app: App) => {
  app.component(Form.name, Form)
}

export default Form

export * from './types'