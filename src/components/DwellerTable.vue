<template>
  <div class="list-wrapper">
    <Special class="dweller-table"
      :enable-name-link="false"
      :dweller="header"
    />
    <template v-for="dweller in dwellers">
      <Special class="dweller-table"
        :enable-name-link="enableNameLink"
        :dweller="dweller"
      />
    </template>
  </div>
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
    },
    enableNameLink: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      header
    }
  },
}
</script>

<style>
.dweller-table {
  max-width: 90%;
  margin: 0 auto;
}
</style>
