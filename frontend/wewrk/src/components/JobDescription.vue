<template>
  <div class="areaContainer" v-if="jobID">
    <div class="container jobDescriptionContainer">
      <div class="row">
        <div class="col-8 jobTitle">{{jobTitle}}</div>
        <a class="offset-md-2 col-md-2 applyButton" :href="'https://www.indeed.ca'+link" target="_blank">
          <h1 class="align-middle">Apply now</h1>
        </a>
      </div>
      <div class="row companyName">{{companyName}}</div>
      <div class="bulletPoints row">
        <ul class="bullets col-md-3">
          <li>{{location}}</li>
          <li>{{experienceLevel ? experienceLevel: "Experience not specified"}}</li>
        </ul>
        <ul class="bullets col-md-3">
          <li>{{jobType ? jobType : "Type not specified"}}</li>
          <li>{{pay ? pay : "Salary not specified"}}</li>
        </ul>
      </div>
      <h3 class="jobDescriptionHeader">Job Description</h3>
      <div v-html="jobDescription" class="jobDescriptionHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["jobInfo"],
  mounted: function() {
    this.$root.$on("clickedCard", newPosting => {
      console.log(newPosting);
      this.jobID = newPosting.jobID;
      this.jobTitle = newPosting.jobTitle;
      this.companyName = newPosting.companyName;
      this.location = newPosting.location;
      this.experienceLevel = newPosting.experienceLevel;
      this.jobType = newPosting.jobType;
      this.pay = newPosting.pay;
      this.postedDate = newPosting.postedDate;
      this.closingDate = newPosting.closingDate;
      this.jobDescription = newPosting.jobDescription;
      this.link = newPosting.link;
      console.log(this.jobID);
    });
  },
  data() {
    return {
      jobID: this.jobInfo.jobID,
      jobTitle: this.jobInfo.jobTitle,
      companyName: this.jobInfo.companyName,
      location: this.jobInfo.location,
      experienceLevel: this.jobInfo.experienceLevel,
      jobType: this.jobInfo.jobType,
      pay: this.jobInfo.pay,
      postedDate: this.jobInfo.postedDate,
      closingDate: this.jobInfo.closingDate,
      jobDescription: this.jobInfo.jobDescription,
      link: this.jobInfo.link,
    };
  }
};
</script>

<style lang="scss" scoped>
.applyButton {
  border-radius: 4px;
  background-color: #eed350;
  width: 124.9px;
  height: 36px;
}
.applyButton > h1 {
  padding-top: 10px;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.21;
  color: #2f2f2f;
  text-align: center;
}
.areaContainer {
  border-top: 7px solid #eed350;
  padding-left: 55px;
  overflow-y: auto;
  height: 100%;
}
.jobDescriptionContainer {
  padding-top: 33px;
  font-family: Rubik;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
}
.jobTitle {
  font-size: 30px;
  font-weight: bold;
  line-height: 1.2;
}
.companyName {
  padding-top: 10px;
  margin-left: 0;
  font-size: 16px;
  line-height: 1.13;
  color: rgba(0, 0, 0, 0.87);
}
.jobDescriptionHeader {
  padding-top: 26px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  color: #1e1e1e;
  margin-bottom: 20px;
}
.bulletPoints {
  padding-top: 2px;
}
.bullets {
  margin-left: 15px;
  margin-bottom: 0;
  line-height: 1.33;
  font-size: 12px;
  color: #1e1e1e;
}
.bullets > li {
  padding-top: 8px;
}
.jobDescriptionHTML {
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: #1e1e1e;
}
.jobDescriptionHTML {
  /deep/ ul {
    padding: 0;
  }
}

.jobDescriptionHTML {
  /deep/ li {
    margin-left: 15px;
  }
}

.jobDescriptionHTML {
  /deep/ h2 {
    font-size: 14px;
    font-weight: bold;
    margin-top: 20px;
  }
}
.jobDescriptionHTML {
  /deep/ h1 {
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
  }
}
.jobDescriptionHTML {
  /deep/ h3 {
    font-size: 13px;
    font-weight: bold;
    margin-top: 20px;
  }
}
.jobDescriptionHTML {
  /deep/ h4 {
    font-size: 12px;
    font-weight: bold;
    margin-top: 20px;
  }
}
</style>