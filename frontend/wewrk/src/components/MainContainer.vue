<template>
  <div>
    <Header id="altHeader" />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./Header";
import VueRouter from "vue-router";
import Search from "./Search";
import JobDashboard from "./JobDashboard";

const router = new VueRouter({
  routes: [
    {
      path: "/search",
      component: Search
    },
    {
      path: "/dashboard",
      component: JobDashboard,
    },
  ]}
);

export default {
  name: "app",
  router,
  components: {
    Header,
  }
}
</script>

<style lang="scss" scoped>
</style>