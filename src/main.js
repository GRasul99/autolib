import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'nprogress/nprogress.css'
import './plugins/vuetify-mask.js'
import TokenService from '@/services/TokenService'
import jwtDecode from 'jwt-decode'
import ApiService from '@/services/ApiService'
Vue.config.productionTip = false
const access = TokenService.getToken('access')
if (access) {
  const userId = jwtDecode(access).user_id
  ApiService.ApiService.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${access}`
  store.commit('auth/SET_AUTH_USER')
  store.commit('auth/SET_USER_ID', userId)
}
ApiService.mountInterceptor()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
