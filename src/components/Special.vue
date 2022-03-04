<template>
    <div class="row">
      <div class="label" v-if="isHeader" @click="$emit('sort-by', { sortBy: 'name' })">
        {{ dweller.label }}
      </div>
      <div v-else
        class="name"
        :class="{'enabled': enableNameLink }"
        @click="openDwellerDetails(dweller.id)"
      >
        {{ dweller.firstName }} {{ dweller.lastName}}
      </div>

      <SpecialColumn
        v-for="(value, key) in columns"
        :key="key"
        :class="value"
        :isHeader="isHeader"
        :specialValue="specialValue(value)"
        @sort-by="$emit('sort-by', { sortBy: value })"
      />

    </div>
</template>

<script>
import SpecialColumn from './SpecialColumn.vue';
export default {
  name: 'Special',
  props: {
    dweller: { type: Object },
    enableNameLink: { type: Boolean, default: true },
    isHeader: { type: Boolean, default: false },
  },
  components: {
    SpecialColumn
  },
  data() {
    return {
      columns: {
        ...'SPECIAL',
        Gen: 'Generation',
      }
    }
  },
  methods: {
    openDwellerDetails(dwellerId) {
      if (dwellerId) {
        this.$router.push({ path: `/dweller-details/${dwellerId}`});
      }
    },
    specialValue(letter) {
      const statIndex = 'SPECIAL'.indexOf(letter);
      if (this.isHeader) {
        return letter;
      }

      if(statIndex == -1) {
        switch(letter) {
          case 'Generation':
            return typeof this.dweller.generation != 'undefined'? this.dweller.generation: '--';
          default:
            console.log('unimplemented column:', letter);
        }
      }

      if (Object.keys(this.dweller).length) {
        const stat = this.dweller.special[statIndex];
        return stat? stat : '-'; // missing stat
      }

      return '--'; // invalid data
    }
  }
}
</script>

<style lang="scss">
.row {
  display: flex;
  align-items: baseline;
  width: 100%;
  border: 1px solid black;
  border-bottom: none;

  > div {
    border-left: 1px solid black;
    text-align: center;
    padding: .25rem;
    padding-bottom: 0;
  }
  .name,
  .label {
    border-left: none;
    text-align: left;
    flex-basis: 51%;
    &.enabled {
      color: blue;
      cursor: pointer;
    }
  }
  .label {
    color: blue;
    cursor: pointer;
  }
  &:first-child {
    border-top: 1px solid black;
  }
  &:last-child{
    border-bottom: 1px solid black;
  }
}
</style>
