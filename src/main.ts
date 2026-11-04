import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 默认 app.vue
import App from './App.vue'
// 测试用 App_a52.vue
// import App from './App_a52.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
