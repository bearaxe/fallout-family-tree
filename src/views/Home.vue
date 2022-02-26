<template>
  <div class="home">
    <input class="search-bar" v-model="query" type="text" placeholder="Search" @keyup="search" />
    <DwellerTable :dwellers="displayList" @sort-by="sort" />
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
      displayList: [],
      toggleSort: 1,
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
    },
    sort({ sortBy }) {
      const specialSort = (firstEl, secondEl) => {
        const statIndex = 'SPECIAL'.indexOf(sortBy)
        if(firstEl.special[statIndex] < secondEl.special[statIndex]) return 1 * this.toggleSort
        if(firstEl.special[statIndex] > secondEl.special[statIndex]) return -1 * this.toggleSort
        return 0;
      }

      const nameSort = (firstEl, secondEl) => {
        const searchParam = this.toggleSort == 1? 'firstName': 'lastName'
        if(firstEl[searchParam] < secondEl[searchParam]) return -1
        if(firstEl[searchParam] > secondEl[searchParam]) return 1
        return 0;
      }

      switch(sortBy) {
        case 'name':
          this.displayList = this.displayList.sort(nameSort)
          this.toggleSort = this.toggleSort == 1? -1: 1;
          break;
        case 'S':
        case 'P':
        case 'E':
        case 'C':
        case 'I':
        case 'A':
        case 'L':
          this.displayList = this.displayList.sort(specialSort)
          this.toggleSort = this.toggleSort == 1? -1: 1;
          break;
        default:
          console.log(`unknown sort type: ${sortBy}`)
      }
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