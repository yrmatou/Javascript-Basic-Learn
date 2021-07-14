<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <!-- {{message}} -->
    <helloWorld></helloWorld>
  </div>
</template>

<script>
import helloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    helloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
