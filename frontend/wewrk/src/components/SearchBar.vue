<template>
  <b-container fluid class="searchBarContainer">
    <b-row align-v="end" class="searchRow">
      <b-col cols="4">
        <h1 class="formHeader">Search by job keyword, company, or location</h1>
        <b-form-input type="search" v-model="searchValue" class="customInput"></b-form-input>
        <font-awesome-icon icon="search" class="searchIcon" size="lg" />
      </b-col>
      <b-col>
        <h1 class="formHeader">Job type</h1>
        <b-form-select
          plain
          v-model="jobTypeSelected"
          :options="jobTypeOptions"
          class="customSelect"
        ></b-form-select>
        <font-awesome-icon icon="sort-down" size="lg" />
      </b-col>
      <b-col>
        <h1 class="formHeader">Experience level</h1>
        <b-form-select
          plain
          v-model="experienceSelected"
          :options="experienceOptions"
          class="customSelect"
        ></b-form-select>
        <font-awesome-icon icon="sort-down" size="lg" />
      </b-col>
      <b-col>
        <h1 class="formHeader">Salary</h1>
        <b-form-select plain v-model="salarySelected" :options="salaryOptions" class="customSelect"></b-form-select>
        <font-awesome-icon icon="sort-down" size="lg" />
      </b-col>
      <b-col>
        <h1 class="formHeader">Distance</h1>
        <b-form-select plain v-model="salarySelected" :options="salaryOptions" class="customSelect"></b-form-select>
        <font-awesome-icon icon="sort-down" size="lg" />
      </b-col>
      <b-col>
        <b-button @click="complexSearch" class="searchButton">Find work</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import APIFunctions from "../../services/api";

export default {
  mounted: function() {
    this.searchValue = this.$route.query.q;
    this.simpleSearch();
  },
  data() {
    return {
      searchValue: "",
      jobTypeSelected: null,
      jobTypeOptions: [
        { value: null, text: "- Select -" },
        { value: "part-time", text: "Part-time" },
        { value: "full-time", text: "Full-time" },
        { value: "permanent", text: "Permanent" },
        { value: "contract", text: "Contract" },
        { value: "temporary", text: "Temporary" },
        { value: "freelance", text: "Freelance" }
        /* DB Has the following
          'Casual'
          'Part-time'
          'Contract'
          'Temporary'
          'Commission'
          'Freelance'
          'Permanent'
          'Apprenticeship'
          'Volunteer'
          'Fly-In/Fly-Out'
          'Internship' 
        */
      ],
      experienceSelected: null,
      experienceOptions: [
        { value: null, text: "- Select -" },
        { value: "internship", text: "Internship", disabled: true },
        { value: "entry level", text: "Entry level" },
        { value: "associate", text: "Associate", disabled: true },
        { value: "midsenior", text: "Mid-Senior", disabled: true },
        { value: "director", text: "Director", disabled: true },
        { value: "executive", text: "Executive", disabled: true }
      ],
      salarySelected: null,
      salaryOptions: [
        { value: null, text: "- Select -" },
        { value: "0", text: "$50,000+", disabled: true },
        { value: "1", text: "$70,000+", disabled: true },
        { value: "2", text: "$90,000+", disabled: true },
        { value: "3", text: "$110,000+", disabled: true }
      ],
      distanceSelected: null,
      distanceOptions: [
        { value: null, text: "- Select -" },
        { value: "0", text: "Less than 25km", disabled: true },
        { value: "1", text: "25km - 50km", disabled: true },
        { value: "2", text: "50km - 75km", disabled: true },
        { value: "3", text: "75km +", disabled: true }
      ]
    };
  },
  methods: {
    testSearch: async function() {
      let results = await APIFunctions.testSearch();
      this.$root.$emit("newResults", results);
    },
    testComplex: async function() {
      let results = await APIFunctions.testComplex();
      this.$root.$emit("newResults", results);
    },
    simpleSearch: async function() {
      let searchTerm = this.searchValue;
      if (!searchTerm) {
        searchTerm = "  ";
      }
      let criteria = {
        terms: searchTerm,
        offset: 0
      }
      let results = await APIFunctions.complexSearch(criteria);
      this.$root.$emit("newResults", results, criteria);
    },
    complexSearch: async function() {
      let searchTerm = this.searchValue;
      if (!searchTerm) {
        searchTerm = "  ";
      }
      let criteria = {
        terms: searchTerm,
        type: this.jobTypeSelected,
        pay: this.salarySelected,
        experience: this.experienceSelected,
        offset: 0
      }
      let results = await APIFunctions.complexSearch(criteria);
      this.$root.$emit("newResults", results, criteria);
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  text-align: left;
}

.customSelect {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
}

.customSelect + svg {
  float: right;
  margin-top: -33px;
  margin-right: 10px;
  pointer-events: none;
  background-color: transparent;
  color: black !important;
  padding-right: 5px;
}

.customInput + svg {
  float: right;
  margin-top: -33px;
  margin-right: 10px;
  pointer-events: none;
  background-color: transparent;
  color: black !important;
  padding-right: 5px;
}

.formHeader {
  font-size: 16px;
  font-weight: 700;
  text-align: left;
}
.searchBarContainer {
  margin-top: 25px;
  padding: 0;
  margin-bottom: 30px;
  font-family: Rubik;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
}

.searchRow {
  margin-left: 10%;
  margin-right: 7%;
}
.btn {
  vertical-align: bottom;
  background-color: #166273;
  border-style: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.19;
  padding-top: 9px;
  padding-bottom: 8px;
  padding-left: 23px;
  padding-right: 23px;
}
.searchButton:hover {
  background-color: #95b7bf;
}
.searchButton:active,
.searchButton:focus {
  background-color: #166273 !important;
}
.searchIcon {
  float: right;
  padding-top: 4px;
}
.searchInput {
  display: flex;
}
/* clears the 'X' from Internet Explorer */
input[type="search"]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}
input[type="search"]::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

/* clears the 'X' from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
</style>