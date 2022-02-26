<template>
  <div class="list-wrapper">
    <Special class="dweller-table"
      :enable-name-link="false"
      :isHeader="true"
      :dweller="header"
      @sort-by="relayEmit"
    />
    <template v-for="dweller in dwellers">
      <Special class="dweller-table"
        :enable-name-link="enableNameLink"
        :dweller="dweller"
        :key="dweller.id"
      />
    </template>
  </div>
</template>

<script>
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
    },
    header: {
      type: Object,
      default: function (owo) {
        return {
          label: 'Name',
        }
      }
    }
  },
  methods: {
    relayEmit(data) {
      this.$emit('sort-by', data)
    }
  }
}
</script>

<style>
.dweller-table {
  max-width: 90%;
  margin: 0 auto;
}
</style>
