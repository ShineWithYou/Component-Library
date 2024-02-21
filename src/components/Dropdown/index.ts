import type { App } from 'vue'
import Dropdown from './Dropdown.vue'

Dropdown.install = (app: App) => {
  app.component(Dropdown.name || 'zytDropdown', Dropdown)
}

export default Dropdown

export * from './types'