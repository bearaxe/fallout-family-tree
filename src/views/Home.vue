<template>
  <div class="home">
    <input class="search-bar" v-model="query" type="text" placeholder="Search" @keyup="search" />
    <DwellerTable :dwellers="displayList" @sort-by="sort" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DwellerTable from '@/components/DwellerTable.vue'
import { nameSort, specialSort, generationSort } from '@/searchFunctions';

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
        return dn.includes(this.query.toLowerCase())
      })
      console.log('searching with query', this.query, newDisplayList)
      this.displayList = newDisplayList
    },
    sort({ sortBy }) {
      let toggleEnabled = true
      switch(sortBy) {
        case 'Generation':
          this.displayList = this.displayList.sort((el1, el2) => generationSort(el1, el2, this.toggleSort))
          break;
        case 'name':
          this.displayList = this.displayList.sort((el1, el2) => nameSort(el1, el2, this.toggleSort))
          break;
        case 'S':
        case 'P':
        case 'E':
        case 'C':
        case 'I':
        case 'A':
        case 'L':
          this.displayList = this.displayList.sort((el1, el2) => specialSort(el1, el2, this.toggleSort, sortBy))
          break;
        default:
          toggleEnabled = false
          console.log(`unknown sort type: ${sortBy}`)
      }
      if (toggleEnabled) {
        this.toggleSort *= -1;
      }
    }
  }
}
</script>


<style lang="scss">
.search-bar {
  max-width: 90%;
  margin: 0 auto 2rem;
}
</style>