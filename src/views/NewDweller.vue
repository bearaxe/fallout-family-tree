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
        <!--
        TODO: make form-group a wrapper component
        TODO: make parent 1 filter by matching last name,
                default to all if no match -->
        <div class="form-group">
          <label>Parent 1:</label>
          <select v-model="dweller.parent1">
            <option>Parents</option>
          </select>
        </div>

        <div class="form-group">
          <label>Parent 2</label>
          <select v-model="dweller.parent2">
            <option>Parents</option>
          </select>
        </div>
      </div>
      <!-- All Dwellers -->
      <div class="default-form">
        <label>First Name</label>
        <input name="firstName" v-model="dweller.firstName" type="text">

        <label>Last Name</label>
        <input name="lastName" v-model="dweller.lastName" type="text">

        <label>SPECIAL</label>
        <input name="special" v-model="dweller.special" type="number">
      </div>

      <button type="submit">Add This Dweller!</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showParentForm: true,
      dweller: {
        parent1: '',
        parent2: '',
        firstName: '',
        lastName: '',
        special: '',
      }
    }
  },
  methods: {
    toggleParentForm() {
      this.showParentForm = !this.showParentForm;
    },
    addDweller() {
      //TODO: integrate firebase via action
      this.$store.commit('addDweller', this.dweller);
      this.$router.push('/home');
    }
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
