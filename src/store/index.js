import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dwellers: []
  },
  getters: {
    newId: (state) => state.dwellers.length + 1,
    findById: (state) => (id) => { return state.dwellers.find(entry => entry.id == id) || {}; },
  },
  mutations: {
    setDwellers: (state, newDwellerList)=> { state.dwellers = newDwellerList },
    addDweller: (state, newDweller) => { state.dwellers.push(newDweller) },
    removeDweller: (state, deleteDweller) => {
      state.dwellers = state.dwellers.filter(dweller => dweller.id != deleteDweller.id)
    },
    updateDweller: (state, updateData) => {
      state.dwellers[updateData.id] = updateData;
      if(updateData.children) {
        Vue.set(state.dwellers[updateData.id], 'children', updateData.children);
      }
    }
  },
  actions: {
    async getDwellers({ commit }) {
      const qeurySnap = await Vue.prototype.$db.collection('dwellers').get()
      qeurySnap.forEach((doc) => {
        commit('addDweller', { ...doc.data(), id: doc.id })
      })
    },
    async saveDweller({ commit, dispatch, getters }, newDweller) {
      try {
        const docRef = await Vue.prototype.$db.collection('dwellers').add({...newDweller});
        console.log("Document written with ID: ", docRef.id);
        commit('addDweller', { ...newDweller, id: docRef.id })

        if(newDweller.parent1) {
          const parent1 = getters.findById(newDweller.parent1);
          dispatch('addChildToParent', {
            parentDweller: parent1,
            childDocRef: docRef.id
          })
        }

        if(newDweller.parent2) {
          const parent2 = getters.findById(newDweller.parent2);
          dispatch('addChildToParent', {
            parentDweller: parent2,
            childDocRef: docRef.id
          })
        }

        return docRef;
      }
      catch(error) {
        console.error("Error adding document: ", error);
      }
    },
    async deleteDweller({ commit, dispatch, getters }, deleteDweller) {
      await Vue.prototype.$db.collection('dwellers').doc(deleteDweller.id).delete()
      commit('removeDweller', deleteDweller)

      if(deleteDweller.parent1) {
        const parent1 = getters.findById(deleteDweller.parent1);
        await dispatch('removeChildFromParent', {
          parentDweller: parent1,
          childDocRef: deleteDweller.id
        })
      }

      if(deleteDweller.parent2) {
        const parent2 = getters.findById(deleteDweller.parent2);
        await dispatch('removeChildFromParent', {
          parentDweller: parent2,
          childDocRef: deleteDweller.id
        })
      }
    },
    async addChildToParent({ dispatch }, { parentDweller, childDocRef }) {
      const parentChildren = parentDweller.children || [];
      await dispatch('updateDweller', {
        ...parentDweller,
        children: [
          ...parentChildren,
          childDocRef
        ]
      })
    },
    async removeChildFromParent({ dispatch }, { parentDweller, childDocRef }) {
      const parentChildren = parentDweller.children.filter(childId => childId != childDocRef);
      await dispatch('updateDweller', {
        ...parentDweller,
        children: parentChildren,
      })
    },
    async updateDweller({ commit }, newDwellerData) {
      await Vue.prototype.$db.collection('dwellers').doc(newDwellerData.id).update({ ...newDwellerData })
      commit('updateDweller', newDwellerData);
    }
  },
})
