import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase'
import firebaseConfig  from '../secrets/firebase.auth'

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig)
Vue.prototype.$db = firebase.firestore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
