import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NewDweller from './views/NewDweller.vue'
import DwellerDetails from './views/DwellerDetail.vue'

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
    },
    {
      path: '/dweller-details/:dwellerId',
      name: 'dweller-details',
      component: DwellerDetails
    }
  ]
})
