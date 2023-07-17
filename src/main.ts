import { createApp } from 'vue'
import router from './router';

import { createPinia } from 'pinia';
import '@/assets/css/global.css'
import App from './App.vue'
import lazy from './directive/lazy';
const app = createApp(App);
app.directive('lazy',lazy)
app.use(createPinia()).use(createPinia()).use(router).mount('#app')
