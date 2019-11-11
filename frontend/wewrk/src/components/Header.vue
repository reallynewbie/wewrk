<template>
  <div>
    <b-navbar type="dark">
      <b-navbar-brand href="#">
        <b-img height="auto" width="130px" src="./assets/wewrk_logo_white.png" />
      </b-navbar-brand>
      <b-navbar-nav class="navbaritems">
        <b-nav-item class="navbaritem">Job Search</b-nav-item>
        <b-nav-item class="navbaritem">
          <b-img id="hearticon" height="13px" width="auto" src="./assets/wewrk_icon_heart.png" />My jobs
        </b-nav-item>
        <b-nav-item class="navbaritem">Login</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #166273;
}
.navbar-brand {
  margin-left: 11%;
  margin-top: 5px;
}
.navbaritems {
  margin-left: 50%;
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
.nav-item:hover {
  color: blue !important;
  border-bottom: 5px solid white;
}
#hearticon {
  margin-right: 6px;
}
</style>