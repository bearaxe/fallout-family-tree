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
      Vue.prototype.$db.collection('dwellers')
        .get()
        .then((qSnap) => qSnap.forEach((doc) => {
          commit('addDweller', { ...doc.data(), id: doc.id })
        }))
    },
    saveDweller({ commit }, newDweller) {
      Vue.prototype.$db.collection('dwellers')
        .add(newDweller)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          commit('addDweller', newDweller)
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        })
    },
    deleteDweller({ commit }, deleteDweller) {
      Vue.prototype.$db.collection('dwellers')
      .doc(deleteDweller.id)
      .delete()
      .then(() => {
        commit('removeDweller', deleteDweller)
      })
    }
  },
})
