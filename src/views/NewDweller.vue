<template>
  <div class="new-dweller">
    <h1>Add A Dweller Here!</h1>
    <form @submit.prevent="addDweller">
      <label class="form-toggle">
        <input type="checkbox"
        @click="toggleParentForm"
        :checked='showParentForm'>Vault Born
      </label>

      <!-- Vault Born Only -->
      <div class="parent-form" v-show="showParentForm">
        <div class="form-group">
          <label>Parent 1:</label>
          <select v-model="newDweller.parent1">
            <template v-for="dweller in dwellers">
              <option
                v-show="dweller.id !== newDweller.parent2"
                :value="dweller.id"
                :key="dweller.id"
              >
                {{ dweller.firstName }} {{ dweller.lastName }}
              </option>
            </template>
          </select>
        </div>

        <div class="form-group">
          <label>Parent 2</label>
          <select v-model="newDweller.parent2">
            <template v-for="dweller in dwellers">
              <option
                v-show="dweller.id !== newDweller.parent1"
                :value="dweller.id"
                :key="dweller.id"
              >
                {{ dweller.firstName }} {{ dweller.lastName }}
              </option>
            </template>
          </select>
        </div>
      </div>
      <!-- All Dwellers -->
      <div class="default-form">
        <label>First Name</label>
        <input name="firstName" v-model="newDweller.firstName" type="text">

        <label>Last Name</label>
        <input name="lastName" v-model="newDweller.lastName" type="text">

        <label>SPECIAL</label>
        <input name="special" v-model="newDweller.special" type="text" pattern="\d*" maxlength="7">
      </div>

      <button type="submit">Add This Dweller!</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      showParentForm: true,
      newDweller: {
        parent1: '',
        parent2: '',
        firstName: '',
        lastName: '',
        special: '',
        id: 0,
      }
    }
  },
  methods: {
    toggleParentForm() {
      this.showParentForm = !this.showParentForm;
    },
    async addDweller() {
      this.newDweller.id = this.$store.getters['newId']
      this.newDweller.generation = 0;

      if (this.newDweller.parent1 || this.newDweller.parent2) {
        this.newDweller.generation = 1 + this.getHighestGeneration(
          this.newDweller.parent1.generation,
          this.newDweller.parent2.generation
        );
      }

      await this.$store.dispatch('saveDweller', this.newDweller);
      this.$router.push('/home');
    },
    getHighestGeneration(p1Generation = 0, p2Generation = 0) {
      return p1Generation > p2Generation? p1Generation: p2Generation;
    }
  },
  computed: {
    ...mapState(['dwellers'])
  }
}
</script>

<style lang="scss">
.new-dweller{
  form {
    margin: 0 auto;
    max-width: 400px;
    text-align: left;
  }
  input {
    margin: 0;
  }
  input[type='checkbox'] {
    margin-right: .5rem;
  }
  input[type='number'],
  input[type='text'] {
    display: block;
    margin: 0 auto 1rem;
    width: 100%;
  }

  .form-toggle {
    cursor: pointer;
    display: inline-block;
    margin-bottom: 1rem;
  }

  .parent-form {
    display: flex;
    margin-bottom: 1rem;
    width: 100%;
    justify-content: space-between;
  }
  .form-group {
    flex: 0 0 48%;
    select {
      width: 100%
    }
  }
}
</style>
