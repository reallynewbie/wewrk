<template>
  <div class="mainContainer">
    <Header id="altHeader" />
    <router-view name="underHeader"></router-view>
  </div>
</template>

<script>
import Header from "./Header";

export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
.mainContainer {
  width: 100%;
  height: 100%;
}
</style>