<template>
  <Special class="dweller-table" :dwellers="formattedData"></Special>
</template>

<script>
const header = {
  firstName: 'Name',
  special: 'SPECIAL'
};

import Special from '@/components/Special.vue'

export default {
  name: 'DwellerTable',
  components: {
    Special
  },
  props: {
    dwellers: {
      type: Array
    }
  },
  computed: {
    formattedData: function () {
      return [header, ...this.dwellers];
    },
  }
}
</script>

<style>
.dweller-table {
  max-width: 90%;
  margin: 0 auto;
}
</style>
