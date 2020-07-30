import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store'
import './assets/js/bootstrap'
import { DevHookPlugin } from '@bmi/dev-hooks'

Vue.use(DevHookPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
