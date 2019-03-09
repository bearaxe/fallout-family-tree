import Vue from 'vue'
import Vuex from 'vuex'
import testDwellers from './testDwellers.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dwellers: [
      ...testDwellers
    ]
  },
  mutations: {
    setDwellers: (state, newDwellerList)=> { state.dwellers = newDwellerList },
    addDweller: (state, newDweller) => { state.dwellers.push(newDweller) },
  },
  actions: {

  },
})
