<template>
  <div class="list-wrapper">
    <div class="row" v-for="dweller in dwellers">
      <div class="name">{{ dweller.firstName }} {{ dweller.lastName}}</div>
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
  </div>
</template>

<script>

export default {
  name: 'Special',
  props: {
    dwellers: Array
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
  .name {
    border-left: none;
    text-align: left;
    flex-basis: 51%;
  }
  &:last-child{
    border-bottom: 1px solid black;
  }
}
</style>
