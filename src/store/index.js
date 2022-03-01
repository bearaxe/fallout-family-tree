import Vue from 'vue'
import Vuex from 'vuex'

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
    updateDweller: (state, updateData) => {
      state.dwellers[updateData.id] = updateData;
    }
  },
  actions: {
    async getDwellers({ commit }) {
      const qeurySnap = await Vue.prototype.$db.collection('dwellers').get()
      qeurySnap.forEach((doc) => {
        commit('addDweller', { ...doc.data(), id: doc.id })
      })
    },
    async saveDweller({ commit }, newDweller) {
      try {
        const docRef = await Vue.prototype.$db.collection('dwellers').add(newDweller);
        console.log("Document written with ID: ", docRef.id);
        commit('addDweller', {newDweller})
      }
      catch(error) {
        console.error("Error adding document: ", error);
      }
    },
    async deleteDweller({ commit }, deleteDweller) {
      await Vue.prototype.$db.collection('dwellers').doc(deleteDweller.id).delete()
      commit('removeDweller', deleteDweller)
    },
    async updateDweller({ commit }, newDwellerData) {
      await Vue.prototype.$db.collection('dwellers').doc(newDwellerData.id).update({ ...newDwellerData })
      commit('updateDweller', newDwellerData);
    }
  },
})
