<template>
  <div class="headerBackground" v-bind:class="{transparent: isTransparent}">
    <b-navbar type="dark">
      <b-navbar-brand href="#" class="mr-auto">
        <b-img height="auto" width="130px" src="./assets/wewrk_logo_white.png" />
      </b-navbar-brand>
      <b-navbar-nav class="navbaritems ml-auto">
        <b-nav-item to="/search" class="navbaritem" active-class="active">Job Search</b-nav-item>

        <b-nav-item to="/dashboard" class="navbaritem" active-class="active">
          <b-img id="hearticon" height="13px" width="auto" src="./assets/wewrk_icon_heart.png" />My jobs
        </b-nav-item>

        <b-nav-item class="navbaritem" active-class="active">Login</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: {isTransparent: Boolean},
};
</script>

<style lang="scss" scoped>
.headerBackground {
  background-color: #166273;
  height: 100%;
  width: 100%;
}
.headerBackground.transparent{
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
}
.nav-link {
  color: #fafafb !important;
  padding-bottom: 30px !important;
  margin-bottom: -26px !important;
}
#hearticon {
  margin-right: 6px;
}
.active {
  border-bottom: 5px solid white;
}
</style>