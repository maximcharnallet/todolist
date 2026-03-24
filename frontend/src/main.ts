/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Pinia
import { createPinia } from 'pinia'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

import i18n from './plugins/i18n'

// Styles
import 'unfonts.css'

const pinia = createPinia()
const app = createApp(App)

registerPlugins(app)

app.use(i18n)
app.use(pinia)
app.mount('#app')
