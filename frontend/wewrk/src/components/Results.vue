<template>
  <div class="resultsContainer container-fluid">
    <div class="resultsHeader row align-items-center" v-show="((resultsNum > 0) || searchTerm)">
      <div class="offset-md-1 col-md-2 overview">
        <p class="searchTermLocation">{{searchTerm}}</p>
        <p class="resultsNumber">{{resultsNum}} results</p>
      </div>
      <div class="col-md-3 sort">
        <h3 class="sortHeader">Sort By:</h3>
        <b-form-select v-model="selectedSort" :options="sortOptions" class="dropdown col-md-5"></b-form-select>
      </div>
      <div class="offset-sm-3 offset-lg-4 col-md-1 displayType">
        <b-img height="22px" width="30.8px" src="./assets/unordered-list.png" class="listImg" />
        <b-img height="22px" width="22px" src="./assets/grid-f.png" class="listImg" />
      </div>
    </div>
    <div class="results row no-gutters">
      <div class="col-md-5 postingCards">
        <JobCard v-bind:key="job.jobID" v-bind:jobInfo="job" v-for="job in jobsFound"></JobCard>
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

export default {
  props: {
    // searchTerm: String,
    // searchLocation: String,
    // resultsNum: Number,
    // currentSortType: String,
    // currentDisplayType: String,
  },
  mounted: function() {
    this.searchTerm = this.$route.query.q;
    this.$root.$on("newResults", query => {
      console.log(query);
      this.jobsFound = query.results;
      this.resultsNum = query.totalResults;
    });
  },
  data() {
    return {
      searchTerm: "",
      resultsNum: 0,
      currentSortType: "",
      currentDisplayType: "",
      sortOptions: [
        { value: "best", text: "Best Match" },
        { value: "date", text: "Date Posted" },
        { value: "Blahblahblah", text: "Blahblahblah" }
      ],
      selectedSort: "best",
      jobsFound: [
        {
          jobID: 1234,
          jobTitle: "Frontend web application developer",
          companyName: "Test Company",
          location: "Edmonton, AB",
          experienceLevel: "Junior Entry Level",
          jobType: "Full Time",
          pay: "$27.75/hr",
          postedDate: "10/29/2019",
          closingDate: "11/30/2019",
          jobDescription: 'College/CEGEP <br> 7 months to less than 1 year <br> <ul><h2 class="jobSectionHeader"><b>Specific Skills</b></h2><li> Research and evaluate a variety of interactive media software products</li><li> Consult with clients to develop and document Website requirements</li><li> Lead and co-ordinate multidisciplinary teams to develop Website graphics, content, capacity and interactivity</li><li> Source, select and organize information for inclusion and design the appearance, layout and flow of the Website</li><li> Create and optimize content for Website using a variety of graphics, database, animation and other software</li><li> Develop Website architecture and determine hardware and software requirements</li><li> Plan, design, write, modify, integrate and test Web-site related code</li><li> Conduct tests and perform security and quality controls</li><h2 class="jobSectionHeader"><b> Work Conditions and Physical Capabilities</b></h2><li> Attention to detail</li><h2 class="jobSectionHeader"><b> Personal Suitability</b></h2><li> Initiative</li><li> Team player</li><li> Client focus</li><li> Dependability</li><li> Judgement</li><li> Organized</li></ul>',
          activeTab: false
        },
        {
          jobID: 12345,
          jobTitle: "Frontend webfffff application developer",
          companyName: "Test Company",
          location: "Edmonton, AB",
          experienceLevel: "Junior Entry Level",
          jobType: "Full Time",
          pay: "$27.75/hr",
          postedDate: "10/29/2019",
          closingDate: "11/30/2019",
          jobDescription: 'College/CEGEP <br> 7 months to less than 1 year <br> <ul><h2 class="jobSectionHeader"><b>Specific Skills</b></h2><li> Research and evaluate a variety of interactive media software products</li><li> Consult with clients to develop and document Website requirements</li><li> Lead and co-ordinate multidisciplinary teams to develop Website graphics, content, capacity and interactivity</li><li> Source, select and organize information for inclusion and design the appearance, layout and flow of the Website</li><li> Create and optimize content for Website using a variety of graphics, database, animation and other software</li><li> Develop Website architecture and determine hardware and software requirements</li><li> Plan, design, write, modify, integrate and test Web-site related code</li><li> Conduct tests and perform security and quality controls</li><h2 class="jobSectionHeader"><b> Work Conditions and Physical Capabilities</b></h2><li> Attention to detail</li><h2 class="jobSectionHeader"><b> Personal Suitability</b></h2><li> Initiative</li><li> Team player</li><li> Client focus</li><li> Dependability</li><li> Judgement</li><li> Organized</li></ul>',
          activeTab: false
        }
      ],
      activeCard: {
          jobID: 12345,
          jobTitle: "Frontend web application developer",
          companyName: "Test Company",
          location: "Edmonton, AB",
          experienceLevel: "Junior Entry Level",
          jobType: "Full Time",
          pay: "$27.75/hr",
          postedDate: "10/29/2019",
          closingDate: "11/30/2019",
          activeTab: false
      }
    };
  },
  components: {
    JobCard,
    JobDescription
  },
  methods: {
    test: function(test) {
      console.log(test);
      console.log();
      // console.log(event);
    }
  },
  watch: {
    jobsFound: function(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.resultsContainer {
  width: 100%;
  height: 80vh;
  border-top: 1px solid lightgray;
}
.resultsHeader {
  padding-top: 10px;
  height: 60px;
  margin-bottom: 5px;
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
.listImg {
  margin-right: 16px;
}
.postingCards {
  overflow-y: auto;
  height: 100%;
  padding-right: 0;
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
</style>