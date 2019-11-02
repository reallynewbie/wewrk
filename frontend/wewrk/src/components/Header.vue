<template>
  <div class="header">
    <div class="logoArea">
      <div class="logoObj">Logo</div>
      <div class="logoObj">we<em>wrk</em></div>
    </div>

    <div class="headerlinks">
      <span><a href="#jobSearch" class="headerlink jobSearch">Job Search</a></span>
      <span><a href="#myJobs" class="headerlink myJobs"> <span id="heart">&#10084;</span> My Jobs</a></span>
      <!-- <div class="divider headerlink" /> -->
      <span><a href="#login" class="headerlink login">Login</a></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-shrink: 0;
  width: 100%;
  align-items: center;
  height: 10%;
  background-color: #166273;
  color: #fafafb;
  justify-content: center;
  font-family: "Rubik-Bold";
  font-size: 24px;
  font-weight: bold;
}
a {
  color: #fafafb;
  font-size: 18px;
  font-family: "Rubik-Bold";
  font-weight: bold;
  text-decoration: none;
}

.spacer {
  min-width: 20%;
}
.headerlinks {
  width: 67%;
  display: flex;
  text-align: right;
  padding-left: 25%;

}
.headerlink {
  padding-right:55px;
}

.logoArea {
  width: 35%;
  display: flex;
  padding-left: 12%;
}
.logoObj {
  padding-right: 10%;
}
.divider {
  border-left: solid;
  border-color: white;
  border-width: 1px;

  margin-left: 3%;
}
#heart {
  color: red;
}
span{
  white-space: pre;
  padding:0;
  margin:0;
}

</style>