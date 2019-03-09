<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/new-dweller">New Dweller</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
///TODO: keep going off this link
///https://stackoverflow.com/questions/44352042/vuejs-vuex-firebase-where-to-hook-up-firebase
import * as firebase from 'firebase';

export default {
  beforeMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAO2DbQIa-7lKgtYfIrAzKjlNEYP51MrcI",
      authDomain: "vault-dwellers.firebaseapp.com"
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
