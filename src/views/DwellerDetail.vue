<template>
  <div class="dweller-detail">
    <div v-text="dweller" />
    <!--
      TODO: turn off links on dweller table
      TODO: turn off table headers sometimes
      TODO: Pass through labels for parent1/parent2? conflict with above
      TODO: combine parents into 1 table?
    -->
    <div v-if="dweller.id">
      <h2>Dweller Profile: {{ dweller.firstName }} {{ dweller.lastName }}</h2>
      <DwellerTable :dwellers="[dweller]" />

      <div v-if="parent1.id">
        <h3>Parent1: {{ parent1.firstName }} {{ parent1.lastName }}</h3>
        <DwellerTable :dwellers="[parent1]" />
      </div>
      <div v-else>
        <h3>No Entry for Parent1 Found </h3>
      </div>

      <div v-if="parent2.id">
        <h3>Parent2: {{ parent2.firstName }} {{ parent2.lastName }}</h3>
        <DwellerTable :dwellers="[parent2]" />
      </div>
      <div v-else>
        <h3>No Entry for Parent2 Found</h3>
      </div>

    </div>
  </div>
</template>

<script>
import DwellerTable from '@/components/DwellerTable.vue';

const badId = {firstName: 'Dweller Does Not Exist', lastName: ''};

export default {
  components: {
    DwellerTable
  },
  methods: {
    findDweller(idKey) {
      let noResult = {};
      if (this.dweller) {
        return this.$store.state.dwellers
          .find(entry => entry.id == this.dweller[idKey])
          || noResult;
      }
      return noResult;
    }
  },
  computed: {
    dweller() {
      return this.$store.state.dwellers
        .find(entry => entry.id == this.$route.params.dwellerId)
        || badId
    },
    parent1() {
      return this.findDweller('parent1');
    },
    parent2() {
      return this.findDweller('parent2');
    }
  }
}
</script>
