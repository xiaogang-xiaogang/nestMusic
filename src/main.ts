import { createApp } from 'vue'
import router from './router';
import { createPinia } from 'pinia';
import '@/assets/css/global.css'
import App from './App.vue'
const app = createApp(App);
app.use(createPinia()).use(router).mount('#app')
