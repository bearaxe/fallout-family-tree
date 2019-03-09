<template>
  <div class="home">
    <DwellerTable :dwellers="dwellers" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DwellerTable from '@/components/DwellerTable.vue'

export default {
  name: 'home',
  components: {
    DwellerTable
  },
  computed: {
    ...mapState(['dwellers'])
  }
}
</script>
