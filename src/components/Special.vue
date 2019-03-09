<template>
    <div class="row">
      <div class="label" v-if="isHeader">
        {{ dweller.label }}
      </div>
      <div v-else
        class="name"
        :class="{'enabled': enableNameLink }"
        @click="openDwellerDetails(dweller.id)"
      >
        {{ dweller.firstName }} {{ dweller.lastName}}
      </div>

      <div class="strength">
        <span v-text="specialValue('S')"></span>
      </div>
      <div class="perception">
        <span v-text="specialValue('P')"></span>
      </div>
      <div class="endurance">
        <span v-text="specialValue('E')"></span>
      </div>
      <div class="charisma">
        <span v-text="specialValue('C')"></span>
      </div>
      <div class="intelligence">
        <span v-text="specialValue('I')"></span>
      </div>
      <div class="agility">
        <span v-text="specialValue('A')"></span>
      </div>
      <div class="luck">
        <span v-text="specialValue('L')"></span>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Special',
  props: {
    dweller: { type: Object },
    enableNameLink: { type: Boolean, default: true },
    isHeader: { type: Boolean, default: false },
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
      else if (this.dweller) {
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
    flex-basis: 7%;
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
      text-decoration: underline;
    }
  }
  &:first-child {
    border-top: 1px solid black;
  }
  &:last-child{
    border-bottom: 1px solid black;
  }
}
</style>
