<template>
  <div class="home">
    <input class="search-bar" v-model="query" type="text" placeholder="Search" @keyup="search" />
    <DwellerTable :dwellers="displayList" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DwellerTable from '@/components/DwellerTable.vue'

export default {
  name: 'home',
  components: {
    DwellerTable
  },
  data() {
    return {
      query: '',
      displayList: []
    }
  },
  computed: {
    ...mapState(['dwellers']),
  },
  mounted() {
    this.displayList = this.dwellers
  },
  methods: {
    search() {
      const newDisplayList = this.dwellers.filter(dweller => {
        const dn = (dweller.firstName + dweller.lastName).toLowerCase()
        return dn.includes(this.query.toLowerCase());
      })
      console.log('searching with query', this.query, newDisplayList)
      this.displayList = newDisplayList
    }
  }
}
</script>


<style lang="scss">
.search-bar {
  width: 90%;
  margin: 0 auto 2rem;
}
</style>