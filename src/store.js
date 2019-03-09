import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dwellers: []
  },
  mutations: {
    setDwellers: (state, newDwellerList)=> { state.dwellers = newDwellerList }
  },
  actions: {

  }
})
