import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Routes from './routes/index'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BSidebar } from 'bootstrap-vue'
Vue.component('b-sidebar', BSidebar)
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
