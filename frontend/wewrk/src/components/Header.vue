<template>
  <div class="headerBackground" v-bind:class="{transparent: isTransparent}">
    <b-navbar type="dark">
      <b-navbar-brand href="/" class="mr-auto">
        <b-img height="auto" width="130px" src="./assets/wewrk_logo_white.png" />
      </b-navbar-brand>
      <b-navbar-nav class="navbaritems ml-auto">
        <b-nav-item to="/search" class="navbaritem" active-class="active">Job search</b-nav-item>

        <b-nav-item to="/dashboard" class="navbaritem" active-class="active">
          <font-awesome-icon icon="heart" class="heartIcon" />My jobs
        </b-nav-item>

        <b-nav-item class="navbaritem" active-class="active">Login</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: { isTransparent: Boolean }
};
</script>

<style lang="scss" scoped>
.headerBackground {
  background-color: #166273;

  height: 80px;
  width: 100%;
}
.headerBackground.transparent {
  background-color: transparent !important;
}
.navbar {
  margin-left: 10%;
  margin-right: 7%;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  border: 0;
}
.navbar-brand {
  padding-top: 26px;
  padding-bottom: 33px;
  border: 0;
}
.navbaritems {
  height: 100%;
  padding-top: 26px;
  padding-bottom: 26px;
  margin-bottom: 0;
  border: 0;
}
.navbaritem {
  font-size: 15px;
  font-family: "Rubik";
  font-weight: 700;
  margin-right: 1vw;
  border: 0;
  padding-bottom: 20px;
}
.nav-link {
  color: #fafafb !important;
  padding-bottom: 10px !important;
  margin-bottom: -38px !important;
  height: 54px;
}
.nav-link:hover {
  border-bottom: 5px solid white;
}
.heartIcon {
  margin-right: 6px;
  color: #e72204;
  width: 18.3px;
  height: 16px;
}
.active {
  border-bottom: 5px solid white;
}
</style>