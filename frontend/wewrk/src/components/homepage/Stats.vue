<template>
  <div class="statsDiv">
    <div class="statSections">
      <h1 id="userStats">2,509+</h1>
      <h2>USERS JOINED TODAY</h2>
    </div>
    <div class="statSections">
      <div>
        <h1 id="jobsAdded">THREE THOUSAND</h1>
        <h2>NEW JOBS DAILY</h2>
      </div>
    </div>
    <div class="statSections">
      <div>
        <h1>
          <font-awesome-icon icon="suitcase" class="suitcaseIcon" />7+
        </h1>
        <h2>SERVICE PARTNERS</h2>
      </div>
    </div>
    <div class="statSections">
      <h1>
        <font-awesome-icon icon="heart" class="heartIcon" />900+
      </h1>
      <h2>JOBS FAVOURITED TODAY</h2>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.statsDiv {
  width: 100%;
  display: flex;
  font-family: "Rubik";
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.87);
  text-align: center;
  padding-top: 130px;
  padding-bottom: 125px;
  padding-left: 14%;
  padding-right: 14%;
  align-items: flex-end;
  justify-content: center;
}
.statSections {
  max-height: 83px;
  max-width: 200px;
}
.statSections > div {
  bottom: 0;
}
h2 {
    font-family: "Rubik";
  font-size: 14px;
  font-weight: bold;
  line-height: 1.64;
  padding: auto;
  margin: auto;
}
h1 {
    font-family: "Rubik";
  font-size: 56px;
  font-weight: 500;
  line-height: 0.41;
}
#userStats {
  margin-bottom: 20px;
}
#jobsAdded {
  font-size: 28px;
  font-weight: bold;
  line-height: 1;
  text-align: center;
  padding: auto;
  margin: auto;
  margin-bottom: 5px;
}
.heartIcon {
  width: 48.2px;
  height: 42.4px;
  object-fit: contain;
  color: #e72204;
  margin-bottom: 6px;
  margin-right: 3px;
}
.suitcaseIcon {
  width: 48.2px;
  height: 42.4px;
  object-fit: contain;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 6px;
  margin-right: 3px;
}
.statSections {
  margin-right: 5%;
}
</style>