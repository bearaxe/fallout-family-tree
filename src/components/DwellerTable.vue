<template>
  <Special v-bind:dwellers="formattedData"></Special>
</template>

<script>
let header = {
  name: 'Name',
  special: 'SPECIAL'
};

import Special from '@/components/Special.vue'

export default {
  name: 'DwellerTable',
  props: {
    dwellers: Array
  },
  components: {
    Special
  },
  computed: {
    formattedData: function () {
      return [header, ...this.dwellers];
    }
  }
}
</script>
