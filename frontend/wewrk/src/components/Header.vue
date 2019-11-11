<template>
  <div class="headerBackground">
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
export default {};
</script>

<style lang="scss" scoped>
.headerBackground {
  background-color: #166273;
}
.navbar {
  margin-left: 10%;
  margin-right: 7%;
}
.navbar-brand {
  margin-top: 5px;
}
.navbaritems {
}
.navbaritem {
  font-size: 15px;
  font-family: "Rubik";
  font-weight: 700;
  margin-right: 1vw;
}
.nav-link {
  color: #fafafb !important;
}

.nav-item {
  border-bottom: 5px solid transparent;
}
#hearticon {
  margin-right: 6px;
}
.active {
  border-bottom: 5px solid white;
}
</style>