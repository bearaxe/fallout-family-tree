<template>
  <div class="home">
    <DwellerTable />
  </div>
</template>

<script>
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
