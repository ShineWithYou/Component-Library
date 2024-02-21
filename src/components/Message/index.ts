import type { App } from 'vue'
import Message from './Message.vue'
import { createMessgae, closeAll } from './method'

Message.install = (app: App) => {
  app.component(Message.name || 'zytMessage', Message)
}

export default Message
export {
  createMessgae,
  closeAll
}

export * from './types'