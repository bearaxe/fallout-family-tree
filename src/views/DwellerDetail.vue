<template>
  <div class="dweller-detail">
    <div v-if="dweller.id">
      <div class="section">
        <h2>Dweller Profile: {{ dweller.firstName }} {{ dweller.lastName }}</h2>
        <DwellerTable :enable-name-link="false" :dwellers="[dweller]" />
      </div>

      <div class="section" v-if="dweller.children">
        <h3>Children:</h3>
        <DwellerTable :dwellers="[...children]" />
      </div>

      <div class="section">
        <template v-if="parent1.id">
          <h3>Parent1: {{ parent1.firstName }} {{ parent1.lastName }}</h3>
          <DwellerTable :dwellers="[parent1, ...parent1Children]" />
        </template>
        <template v-else>
          <h3>No Entry for Parent1 Found</h3>
        </template>
      </div>

      <div class="section">
        <template v-if="parent2.id">
          <h3>Parent2: {{ parent2.firstName }} {{ parent2.lastName }}</h3>
          <DwellerTable :dwellers="[parent2, ...parent2Children]" />
        </template>
        <template v-else>
          <h3>No Entry for Parent2 Found</h3>
        </template>
      </div>

      <div class="section buttons" v-show="!showEditForm">
        <button :disabled="disableDelete" @click='deleteDweller' class="delete">Delete Dweller</button>
        <button @click='showEditForm = true' class="edit">Edit Dweller</button>
      </div>

      <form class="section" @submit.prevent="updateDweller" v-show="showEditForm">
        <div class="default-form">
          <label>First Name</label>
          <input name="firstName" v-model="dweller.firstName" type="text">

          <label>Last Name</label>
          <input name="lastName" v-model="dweller.lastName" type="text">

          <label>SPECIAL</label>
          <input name="special" v-model="dweller.special" type="text" pattern="\d*" maxlength="7">
        </div>

      <button type="submit">Update This Dweller!</button>
      </form>

    </div>
    <div v-else>
      <h2>Sorry, there's no entry for that dweller id.</h2>
      <button @click='$router.push("/home")'>Click here to go home</button>
    </div>

  </div>
</template>

<script>
import DwellerTable from '@/components/DwellerTable.vue';

export default {
  components: {
    DwellerTable
  },
  data() {
    return {
      showEditForm: false,
      disableDelete: false,
    }
  },
  methods: {
    findDwellerById(id) {
      const result = this.$store.state.dwellers
        .find(entry => entry.id == id)
        || {};

      return result;
    },
    async deleteDweller() {
      const doDelete = confirm('there is no way to revert this action. are you sure you want to delete this dweller? (it may leave references that may break the app, especially if children are involved)');
      if(doDelete) {
        this.disableDelete = true;
        await this.$store.dispatch('deleteDweller', this.dweller);
        this.$router.push("/home");
      }
    },
    editDweller() {
      this.showEditForm = true;
    },
    async updateDweller() {
      await this.$store.dispatch('updateDweller', this.dweller);
      this.showEditForm = false;
    }
  },
  computed: {
    dweller() {
      return this.findDwellerById(this.$route.params.dwellerId);
    },
    parent1() {
      return this.dweller? this.findDwellerById(this.dweller.parent1): {};
    },
    parent1Children() {
      if(!this.dweller || !this.dweller.parent1) return [];
      return this.parent1.children.map((elId) => this.findDwellerById(elId))
    },
    parent2() {
      return this.dweller? this.findDwellerById(this.dweller.parent2): {};
    },
    parent2Children() {
      if(!this.dweller || !this.dweller.parent2) return [];
      return this.parent2.children.map((elId) => this.findDwellerById(elId))
    },
    children() {
      if(!this.dweller || !this.dweller.children) return [];
      return this.dweller.children.map((elId) => this.findDwellerById(elId))
    }
  }
}
</script>

<style lang="scss">
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
.buttons {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.section {
  margin-bottom: 1rem;
}
</style>