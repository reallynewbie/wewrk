<template>
  <b-card no-body class="jobCard" v-on:click="makeActive">
    <div class="lightUp" :class="{active:activeTab == true}" />
    <div class="card-body">
      <b-card-title>{{jobTitle}}</b-card-title>
      <b-card-sub-title class="subtext">{{companyName}}</b-card-sub-title>
      <!-- Need more space between -->
      <b-card-text>
        <div class="bulletPoints row">
          <ul class="bullets col">
            <li>{{location}}</li>
            <li>{{experienceLevel ? experienceLevel: "Experience not specified"}}</li>
          </ul>
          <ul class="bullets col">
            <li>{{jobType ? jobType : "Type not specified"}}</li>
            <li>{{pay ? pay : "Salary not specified"}}</li>
          </ul>
        </div>
        <!-- Add Faint line for separation -->
        <div class="cardFooter">
          <h4 class="postedDate">Posted on: {{postedDate}}</h4>
          <h4 class="closingDate">
            Closing Date:
            <span>{{closingDate ? closingDate : "N/A"}}</span>
          </h4>
        </div>
      </b-card-text>
    </div>
    <div class="icons">
      <font-awesome-icon icon="heart" class="heartIcon" />
      <font-awesome-icon icon="times-circle" class="dismissIcon" />
    </div>
  </b-card>
</template>

<script>
export default {
  props: ["jobInfo"],
  computed: {},
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
      activeTab: false
    };
  },
  methods: {
    makeActive: function() {
      this.$root.$emit("clickedCard", {
        jobID: this.jobInfo.jobID,
        jobTitle: this.jobInfo.jobTitle,
        companyName: this.jobInfo.companyName,
        location: this.jobInfo.location,
        experienceLevel: this.jobInfo.experienceLevel,
        jobType: this.jobInfo.jobType,
        pay: this.jobInfo.pay,
        postedDate: this.jobInfo.postedDate,
        closingDate: this.jobInfo.closingDate,
        jobDescription: this.jobInfo.jobDescription
      });
      this.activeTab = !this.activeTab;
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.heartIcon {
  color: #e8e8e8;
  margin-right: 5px;
}

.heartIcon:hover {
  color: #e72204;
  cursor: pointer;
}

.dismissIcon {
  color: #e8e8e8;
}

.dismissIcon:hover {
  color: #1b1c1d;
  cursor: pointer;
}

.icons {
  padding-right: 15px;
  padding-top: 18px;
}
.jobCard {
  display: flex;
  flex-direction: row;
  border-radius: 0;
  border-width: 1px;
  margin-top: -1px;
}
.lightUp {
  width: 6px;
}
.active {
  background-color: #eed350;
}

.bulletPoints {
  margin-left: 0;
  padding-right: 40%;
}
li {
  font-size: 12px;
  line-height: 1.5;
  color: #1e1e1e;
}
.card-body {
  text-align: left;
  margin-left: 5px;
  font-family: Rubik;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
}
.card-title {
  font-size: 14px;
  font-weight: bold;
  line-height: 1.29;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 3px;
}
.subtext {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87) !important;
  margin-bottom: 8px;
}
.cardFooter {
  display: flex;
}
.cardFooter > h4 {
  font-size: 12px;
  line-height: 1.5;
  margin-right: 11%;
}
h4 > span {
  font-size: 12px;
  font-weight: bold;
  color: #e72204;
}
</style>