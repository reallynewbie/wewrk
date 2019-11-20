<template>
  <div id="mainContainer">
    <div id="upperHomePage">
      <b-img class="myJumbotron" fluid-grow src="./assets/wewrk_jumbotron.jpg" />
      <div class="onTop">
        <Header isTransparent></Header>
        <div class="upperHeader">
          <h1 id="headerText">Change the way you find work.</h1>
        </div>
      </div>
    </div>
    <div id="searchBoxContainer">
      <HomeSearchDiv />
    </div>
    <div id="jobSites">
      <h2>
        Browse job postings from major job sites, all in one place.
        <span id="logos">
          <b-img class="img_Logos" src="./assets/wewrk_logo_monster.png" />
          <b-img class="img_Logos" src="./assets/wewrk_logo_indeed.png" />
          <b-img class="img_Logos" src="./assets/wewrk_logo_glassdoor.png" />
          <b-img class="img_Logos" src="./assets/wewrk_logo_monster.png" />
        </span>
      </h2>
    </div>
    <RecentSearches />
    <AboutUs />
  </div>
</template>

<script>
import Header from "../Header";
import HomeSearchDiv from "./HomeSearchDiv";
import AboutUs from "./AboutUs";
import RecentSearches from "./RecentSearches";

// https://stackoverflow.com/questions/45895146/how-to-put-elements-between-two-divs-css-html
export default {
  components: { Header, HomeSearchDiv, AboutUs, RecentSearches}
};
</script>

<style lang="scss" scoped>
#jobSites {
  display: flex;
  padding-top: 50px;
  margin-left: 11%;
  width: 100%;
}
#logos {
  margin-left: 95px;
}
.img_Logos {
  margin-right: 30px;
}
h2 {
  font-family: Rubik;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #1b1c1d;
}
#mainContainer {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
#upperHomePage {
  width: 100%;
  height: 425px !important;
  display: flex;
  position: relative;
}
.myJumbotron {
  width: 100%;
  height: 423px;
  object-fit: cover;
  z-index: -1;
}
.onTop {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.upperHeader {
  margin-top: 7%;
  max-width: 303px;
  margin-left: 10%;
  padding-left: 16px;
}
#headerText {
  font-family: "Rubik";
  font-size: 35px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
  color: rgba(255, 255, 255, 0.87);
}
#searchBoxContainer {
  margin: 0;
  height: 0;
  transform: translateY(-80px);
  margin-left: 11%;
}
</style>