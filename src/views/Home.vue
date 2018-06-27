<template>
  <div class="home">
    <img src="../assets/logo.png">
    <DwellerTable v-bind:dwellers="testDwellers"></DwellerTable>
  </div>
</template>

<script>
// @ is an alias to /src
import DwellerTable from '@/components/DwellerTable.vue'

export default {
  name: 'home',
  components: {
    DwellerTable
  },
  data: function () {
    return{
      testDwellers: [
        {name: "Test Boy",
        special: '1234567'}
      ]
    }
  }
}
</script>
