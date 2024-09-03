import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/element-plus/dist/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen, faTrashCan, faXmark, faCheck, faPowerOff, faFile, faEye } from '@fortawesome/free-solid-svg-icons'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

library.add(faPen, faTrashCan, faXmark, faCheck, faPowerOff, faFile, faEye)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElementPlus)
app.mount('#app')
