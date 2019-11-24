<template>
  <div class="resultsContainer container-fluid">
    <div class="resultsHeader row align-items-center">
      <div class="offset-md-1 col-md-1 overview">
        <p class="searchTermLocation">{{searchTerm}} in {{searchLocation}}</p>
        <p class="resultsNumber">{{resultsNum}} results</p>
      </div>
      <div class="offset-md-1 col-md-2 sort">
        <h3 class="sortHeader">Sort By:</h3>
        <b-form-select v-model="selectedSort" :options="sortOptions" class="dropdown"></b-form-select>
      </div>
      <div class="offset-sm-3 offset-lg-5 col-md-1 displayType">
        <b-img height="22px" width="30.8px" src="./assets/unordered-list.png" class="listImg" />
        <b-img height="22px" width="22px" src="./assets/grid-f.png" class="listImg" />
      </div>
    </div>
    <div class="results row">
      <div class="col-md-5 postingCards">
        <JobCard v-bind:key="job.id" v-for="job in jobsFound"></JobCard>
      </div>
      <div class="col-md-7 postingDesc">Descriptions here</div>
    </div>
  </div>
</template>

<script>
import JobCard from "./JobCard";

export default {
  props: {
    // searchTerm: String,
    // searchLocation: String,
    // resultsNum: Number,
    // currentSortType: String,
    // currentDisplayType: String,
  },
  computed: {},
  data() {
    return {
      searchTerm: "asdf",
      searchLocation: "Here!",
      resultsNum: 0,
      currentSortType: "",
      currentDisplayType: "",
      sortOptions: [
        { value: "best", text: "Best Match" },
        { value: "date", text: "Date Posted" },
        { value: "Blahblahblah", text: "Blahblahblah" }
      ],
      selectedSort: "best",
      jobsFound: [{},{},{},{},{}, {}, {}]
    };
  },
  components: {
    JobCard
  }
};
</script>

<style lang="scss" scoped>
.resultsContainer {
  width: 100%;
  height: 75vh;
  border-top: 1px solid lightgray;
}
.resultsHeader {
  margin-top: 10px;
  height: 60px;
  margin-bottom: 2%;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}
.results {
  padding-left: 10%;
  padding-right: 10%;
  height: 88%;
}
.overview {
  text-align: left;
  margin-left: 10%;
  padding-top: 10px;
}
.dropdown {
  border-style: none;
  width: 50%;
  margin-bottom: 8px;
}
.sort {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sortHeader {
  width: 72px;
  font-family: Rubik;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: left;
  color: rgba(0, 0, 0, 0.8);
}
.displayType {
  padding-bottom: 10px;
}
.searchTermLocation {
  font-family: Rubik;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #575757;
  margin-bottom: 0;
}
.resultsNumber {
  font-family: Rubik;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.8;
  letter-spacing: normal;
  text-align: left;
  color: #1e1e1e;
}
.listImg {
  margin-right: 16px;
}
.postingCards {
  overflow-y: auto;
  height: 100%;
  padding-right: 0;
}
</style>