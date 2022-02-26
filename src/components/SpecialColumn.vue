<template>
  <div class="column">
    <span v-if="isHeader" @click="$emit('sort-by')" class="header" v-text="specialValue" />
    <span v-else v-text="specialValue" />
  </div>
</template>

<script>
export default {
  props: {
    isHeader: {
      required: true,
    },
    specialValue: {
      required: true,
    }
  }
}
</script>

<style lang="scss">
.header {
  text-decoration: underline;
  color: blue;
}
</style>