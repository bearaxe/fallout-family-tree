<template>
  <Special v-bind:dwellers="formattedData"></Special>
</template>

<script>
let header = {
  name: 'Name',
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
