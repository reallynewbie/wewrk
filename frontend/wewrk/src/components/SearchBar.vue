<template>
  <b-container fluid class="searchBarContainer">
    <b-row align-v="end" class="searchRow">
      <b-col cols="4">
        <h1 class="formHeader">Search by job keyword, company, or location</h1>
        <b-form-input type="search" v-model="searchValue"></b-form-input>
        <!-- <span>
          <b-img height="14px" width="auto" src="./assets/magnifying_glass.png" />
        </span>-->
      </b-col>
      <b-col>
        <h1 class="formHeader">Job Type:</h1>
        <b-form-select v-model="jobTypeSelected" :options="jobTypeOptions"></b-form-select>
      </b-col>
      <b-col>
        <h1 class="formHeader">Experience Level:</h1>
        <b-form-select v-model="experienceSelected" :options="experienceOptions"></b-form-select>
      </b-col>
      <b-col cols="3">
        <h1 class="formHeader">Salary:</h1>
        <b-form-select v-model="salarySelected" :options="salaryOptions"></b-form-select>
      </b-col>
      <b-col>
        <b-button>Find work</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      jobTypeSelected: null,
      jobTypeOptions: [
        { value: null, text: "- Select -" },
        { value: "fulltime", text: "Full-Time" },
        { value: "parttime", text: "Part-Time" }
      ],
      experienceSelected: null,
      experienceOptions: [
        { value: null, text: "- Select -" },
        { value: "junior", text: "Junior" },
        { value: "intermediate", text: "Intermediate" },
        { value: "senior", text: "Senior" }
      ],
      salarySelected: null,
      salaryOptions: [
        { value: null, text: "- Select -" },
        { value: "0", text: "< $30,000" },
        { value: "1", text: "$30,000 - $50,000" },
        { value: "2", text: "> $50,000" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
p {
  text-align: left;
}

.formHeader {
  font-size: 16px;
  font-family: "Rubik";
  font-weight: 700;
  text-align: left;
}
.searchBarContainer {
  margin-top: 25px;
  padding: 0;
  margin-bottom: 30px;
}

.searchRow {
  margin-left: 10%;
  margin-right: 7%;
}
.btn {
  vertical-align: bottom;
  background-color: #166273;
}
.btn-secondary {
  background-color: #166273;
  border-color: #166273;
}
</style>