<template>
  <div class="resultsContainer container-fluid">
    <div class="resultsHeader row align-items-center">
      <div class="offset-md-1 col-md-2 overview">
        <p class="searchTermLocation">{{searchTerm}}</p>
        <p class="resultsNumber">{{resultsNum}} results</p>
      </div>
      <div class="col-md-3 sort">
        <h3 class="sortHeader">Sort By:</h3>
        <b-form-select v-model="selectedSort" :options="sortOptions" class="dropdown col-md-5"></b-form-select>
      </div>
      <div class="offset-sm-3 offset-lg-4 col-md-1 displayType">
        <font-awesome-icon icon="list" class="listIcon" />
        <font-awesome-icon icon="th-large" class="gridIcon" />
      </div>
    </div>
    <div class="results row no-gutters">
      <div class="col-md-5 postingCards">
        <JobCard
          :key="job.jobID"
          :jobInfo="job"
          :index="index"
          :activeCard="activeCard"
          @changeActiveCard="updateActiveCard"
          v-for="(job, index) in jobsFound"
        ></JobCard>
      </div>
      <div class="col-md-7 postingDesc">
        <JobDescription v-bind:jobInfo="activeCard"></JobDescription>
      </div>
    </div>
  </div>
</template>

<script>
import JobCard from "./JobCard";
import JobDescription from "./JobDescription";
// Infinite scroll https://codepen.io/CSWApps/pen/aVoBPW

export default {
  props: {},
  mounted: function() {
    this.searchTerm = this.$route.query.q;
    this.$root.$on("newResults", query => {
      console.log("myquery");
      console.log(query);
      this.jobsFound = query.results;
      this.resultsNum = query.totalResults;
      this.activeCard = {};
    });
  },
  data() {
    return {
      searchTerm: "",
      resultsNum: 0,
      currentSortType: "",
      currentDisplayType: "",
      sortOptions: [
        { value: "best", text: "Best match" },
        { value: "date", text: "Newest" },
        { value: "oldest", text: "Oldest" },
        { value: "deadline", text: "Deadline to apply" },
        { value: "viewed", text: "Most viewed" }
      ],
      selectedSort: "best",
      jobsFound: [],
      activeCard: 0
    };
  },
  components: {
    JobCard,
    JobDescription
  },
  methods: {
    updateActiveCard(newCardIndex) {
      console.log(newCardIndex);
      this.activeCard = newCardIndex;
    }
  },
  watch: {
    jobsFound: function() {
      // console.log(newValue, oldValue);
      // this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.resultsContainer {
  width: 100%;
  height: 79vh;
  border-top: 1px solid lightgray;
}
.resultsHeader {
  padding-top: 10px;
  height: 60px;
  margin-bottom: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  position: relative;
  z-index: 5;
}
.results {
  padding-left: 10%;
  padding-right: 8%;
  height: 88%;
  position: relative;
  z-index: 3;
  top: -5px;
}
.overview {
  text-align: left;
  margin-left: 10%;
  padding-top: 10px;
}
.dropdown {
  border-style: none;
  width: 150px;
  margin-bottom: 8px;
  padding-right: 50px;
}
.sort {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
}
.sortHeader {
  font-family: Rubik;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: left;
  color: rgba(0, 0, 0, 0.8);
  margin-right: 2px;
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
.postingCards {
  overflow-y: auto;
  height: 100%;
  padding-right: 0;
  z-index: -1;
}
.postingDesc {
  height: 100%;
}
select + svg {
  float: right;
  margin-top: -10px;
  margin-right: 10px;
  pointer-events: none;
  background-color: transparent;
  color: black !important;
}
.listIcon {
  color: #166273;
  width: 30.8px;
  height: 22px;
}
.gridIcon {
  color: #95b7bf;
  width: 22px;
  height: 22px;
}
</style>