import Vue from 'vue'
import Vuex from 'vuex'
import testDwellers from './testDwellers.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dwellers: []
  },
  getters: {
    newId: (state) => state.dwellers.length + 1,
  },
  mutations: {
    setDwellers: (state, newDwellerList)=> { state.dwellers = newDwellerList },
    addDweller: (state, newDweller) => { state.dwellers.push(newDweller) },
    removeDweller: (state, deleteDweller) => {
      state.dwellers = state.dwellers.filter(dweller => dweller.id != deleteDweller.id)
    },
  },
  actions: {
    getDwellers({ commit }) {
      commit('setDwellers', testDwellers)
    },
    saveDweller({ commit }, newDweller) {
      commit('addDweller', newDweller)
    },
    deleteDweller({ commit }, deleteDweller) {
      commit('removeDweller', deleteDweller)
    }
  },
})
