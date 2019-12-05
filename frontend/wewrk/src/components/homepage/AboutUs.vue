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
      <b-button class="joinButton">Join now</b-button>
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
  font-family: Rubik;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
}
h1 {
  font-size: 35px;
  font-weight: 300;
  line-height: 1.14;
  color: rgba(0, 0, 0, 0.87);
}
.aboutUs-desc {
  margin-left: 7%;
  text-align: left;
}
p.aboutUs-para {
  width: 30vw;
  font-family: Rubik;
  font-size: 18px;
  font-style: normal;
  line-height: 1.33;
  color: rgba(0, 0, 0, 0.6);
}

.btn {
  vertical-align: bottom;
  background-color: #166273;
  border-style: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.19;
  color: #ffffff;
  padding-top: 9px;
  padding-bottom: 8px;
  padding-left: 21px;
  padding-right: 21px;
}
.btn:active, .btn:focus {
  background-color: #166273;
}
.joinButton:hover {
  background-color: #95b7bf;
}
.joinButton:active, .joinButton:focus {
  background-color: #166273 !important;
}

#emWrk {
  font-weight: bold;
  padding: 0;
  margin: 0;
}
</style>