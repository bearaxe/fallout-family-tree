<template>
  <Special class="dweller-table" :dwellers="formattedData"></Special>
</template>

<script>
let header = {
  firstName: 'Name',
  special: 'SPECIAL'
};

import { mapState } from 'vuex'
import Special from '@/components/Special.vue'

export default {
  name: 'DwellerTable',
  components: {
    Special
  },
  computed: {
    formattedData: function () {
      return [header, ...this.dwellers];
    },
    ...mapState(['dwellers'])
  }
}
</script>

<style>
.dweller-table {
  max-width: 90%;
  margin: 0 auto;
}
</style>
