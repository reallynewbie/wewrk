<template>
  <div id="app">
    <router-view name="appMain"></router-view>
  </div>
</template>

<script>
import MainContainer from "./components/MainContainer";
import HomePage from "./components/homepage/Homepage";
import VueRouter from "vue-router";
import Search from "./components/Search";
import JobDashboard from "./components/JobDashboard";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      components: { appMain: HomePage }
    },
    {
      path: "/search",
      components: { appMain: MainContainer },
      children: [
        {
          path: "/",
          components: { underHeader: Search }
        }
      ]
    },
    {
      path: "/dashboard",
      components: { appMain: MainContainer },
      children: [
        {
          path: "/",
          components: { underHeader: JobDashboard }
        }
      ]
    }
  ]
});
// import HomePage from "./components/homepage/Homepage";

export default {
  name: "app",
  router,
  components: {
    // HomePage
  }
};
</script>

<style lang="scss">
#app {
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
