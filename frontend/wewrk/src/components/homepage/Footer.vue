<template>
  <div id="footer">
    <div id="logo">
      <b-img src="./assets/wewrk_logo_footer.png" height="180px" width="422px" />
    </div>
    <div class="footer links">
      <div class="footer siteMap">
        <div class="siteMapSection">
          <h2>Job Seekers</h2>
          <ul>
            <li>Find jobs</li>
            <li>Career plan</li>
          </ul>
        </div>
        <div class="siteMapSection">
          <h2>Employers</h2>
          <ul>
            <li>Account</li>
            <li>Post a job</li>
          </ul>
        </div>
        <div class="siteMapSection">
          <h2>Partners</h2>
          <ul>
            <li>Become a partner</li>
            <li>Find a partner</li>
          </ul>
        </div>
        <div class="siteMapSection">
          <h2>Info</h2>
          <ul>
            <li>How we work</li>
            <li>Help centre</li>
          </ul>
        </div>
      </div>
      <div class="footer miniLinks">
        <b-img
          src="./assets/wewrk_minilogo_footer.png"
          height="41px"
          width="122px"
          class="miniLinkLogo"
        />
        <div>About</div>
        <div>Press</div>
        <div>Privacy Terms & Conditions</div>
        <div id="copyright">© 2019 wewrk. All rights reserved.</div>
        <!-- Use Bootstrap grid  -->
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#footer {
  width: 100%;
  display: flex;
  background-color: #166273;
  padding-top: 36px;
}
.siteMap {
  display: flex;
}
.siteMap > .siteMapSection {
  width: 20%;
}
.miniLinks {
  margin-top: 10px;
  display: flex;
  font-family: Rubik;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.79;
  letter-spacing: normal;
  text-align: left;
  color: #f2f2f2;

  align-items: center;
}
.miniLinks > div {
  margin-right: 50px;
}
.miniLinkLogo {
  margin-right: 50px;
}
.links {
  margin-left: 10%;
  width: 60%;
}

.siteMapSection > h2 {
  font-family: Rubik;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  text-align: left;
  color: #f2f2f2;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  font-family: Rubik;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  text-align: left;
  color: #f2f2f2;
}
#copyright {
  font-family: Rubik;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.08;
  letter-spacing: normal;
  text-align: right;
  color: #f2f2f2;
}
</style>