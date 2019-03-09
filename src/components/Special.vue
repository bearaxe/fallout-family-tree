<template>
    <div class="row">
      <div
        class="name"
        :class="{'enabled': enableNameLink }"
        @click="openDwellerDetails(dweller.id)"
      >
        {{ dweller.firstName }} {{ dweller.lastName}}
      </div>
      <div class="strength">
        <span v-text="dweller.special[0]"></span>
      </div>
      <div class="perception">
        <span v-text="dweller.special[1]"></span>
      </div>
      <div class="endurance">
        <span v-text="dweller.special[2]"></span>
      </div>
      <div class="charisma">
        <span v-text="dweller.special[3]"></span>
      </div>
      <div class="intelligence">
        <span v-text="dweller.special[4]"></span>
      </div>
      <div class="agility">
        <span v-text="dweller.special[5]"></span>
      </div>
      <div class="luck">
        <span v-text="dweller.special[6]"></span>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Special',
  props: {
    dweller: { type: Object },
    enableNameLink: { type: Boolean, default: true }
  },
  methods: {
    openDwellerDetails(dwellerId) {
      if (dwellerId) {
        this.$router.push({ path: `/dweller-details/${dwellerId}`});
      }
    }
  }
}
</script>

<style lang="scss">
.name.enabled {
  color: blue;
  cursor: pointer;
  text-decoration: underline;


}
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
  .name {
    border-left: none;
    text-align: left;
    flex-basis: 51%;
  }
  &:first-child {
    border-top: 1px solid black;
  }
  &:last-child{
    border-bottom: 1px solid black;
  }
}
</style>
