import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewDweller from './views/NewDweller.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      alias: '/',
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/new-dweller',
      name: 'new-dweller',
      component: NewDweller
    }
  ]
})
