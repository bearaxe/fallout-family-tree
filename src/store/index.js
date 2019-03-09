import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dwellers: [
      { firstName: 'Test',
        lastName: 'Boy',
        special: '1234567'},
    ]
  },
  mutations: {
    setDwellers: (state, newDwellerList)=> { state.dwellers = newDwellerList },
    addDweller: (state, newDweller) => { state.dwellers.push(newDweller) },
  },
  actions: {

  }
})
