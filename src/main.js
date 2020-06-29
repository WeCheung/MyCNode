import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import {Dialog, Button, Loading} from "element-ui";
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(VueLazyload)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Loading)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/img/404.jpg'),
  loading: require('./assets/img/loading.jpg'),
  attempt: 1
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
