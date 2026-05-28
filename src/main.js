import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify.js'
import VueEasyLightbox from 'vue-easy-lightbox'
import './assets/main.css'

const app = createApp(App)
app.use(vuetify)
app.use(VueEasyLightbox)
app.mount('#app')
