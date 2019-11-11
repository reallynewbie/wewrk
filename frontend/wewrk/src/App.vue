<template>
  <div id="app">
    <MainContainer id="maincontainer"/>
  </div>
</template>

<script>
import MainContainer from "./components/MainContainer";

export default {
  name: 'app',
  components: {
    MainContainer
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
}
body {
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
}
</style>
