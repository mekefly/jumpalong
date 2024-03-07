import './logger'
import '@jumpalong/nostr-runtime'
import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
$LoggerScope('disabled')

logger.info('this is main')

const app = createApp(App)

app.use(router)
app.use(i18n)
app._instance
app.config.globalProperties.t = t
app.mount('#app')

declare module 'vue' {
  export interface ComponentCustomProperties {
    t: typeof t
  }
}
