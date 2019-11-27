<template>
  <div class="aboutUs">
    <div class="aboutUs-pic">
      <b-img width="735px" height="575px" src="./assets/wewrk_aboutus.jpg" />
    </div>
    <div class="aboutUs-desc">
      <h1>About Us</h1>
      <p class="aboutUs-para">
        we<strong id="emWrk">wrk</strong> is a one-stop job search website. We have agreements in place with the leading job posting websites,
        so we aggregate all of their listings here, in one place. Having everything in one place means employers
        have a better chance of finding their ideal employee and vice versa. If you’re a job posting website who hasn’t
        signed up yet, let’s get started! We would love to have you as a service partner to expand our sources.
      </p>
    </div>
    <!-- Add Join Now Button -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.aboutUs {
  width: 100%;
  display: flex;
  align-items: center;
}
h1 {
  font-family: Rubik;
  font-size: 35px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
  color: rgba(0, 0, 0, 0.87);
}
.aboutUs-desc {
    margin-left: 7%;
}
p.aboutUs-para {
  width: 30vw;
  font-family: Rubik;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: rgba(0, 0, 0, 0.6);
}
#emWrk {
  font-weight: bold;
  padding: 0;
  margin: 0;
}
</style>