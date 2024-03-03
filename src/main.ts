import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
// import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
const pinia = createPinia()
// .use(autoAnimatePlugin)
createApp(App).use(pinia).mount('#app')
