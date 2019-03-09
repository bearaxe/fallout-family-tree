<template>
  <div class="dweller-detail">
    <div v-text="dweller" />
    <!--
      TODO: turn off links on dweller table
      TODO: turn off table headers sometimes
      TODO: combine parents into 1 table?
    -->
    <h2>Dweller Profile: {{ dweller.firstName }} {{ dweller.lastName }}</h2>
      <DwellerTable :dwellers="[dweller]" />
    <h3 v-if="parent1">
      Parent1: {{ parent1.firstName }} {{ parent1.lastName }}
      <DwellerTable :dwellers="[parent1]" />
    </h3>
    <h3 v-if="parent2">
      Parent2: {{ parent2.firstName }} {{ parent2.lastName }}
      <DwellerTable :dwellers="[parent2]" />
    </h3>
  </div>
</template>

<script>
import DwellerTable from '@/components/DwellerTable.vue';

const badId = {firstName: 'Dweller Does Not Exist', lastName: ''};
const noResult = {firstName: '', lastName: ''};

export default {
  components: {
    DwellerTable
  },
  methods: {
    findDweller(idKey) {
      let result = noResult;
      if (this.dweller) {
        result = this.$store.state.dwellers
          .find(entry => entry.id == this.dweller[idKey])
      }
      return result;
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
