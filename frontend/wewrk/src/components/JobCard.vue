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
            <li>{{jobLevel}}</li>
          </ul>
          <ul class="bullets col">
            <li>{{jobType}}</li>
            <li>{{salary}}</li>
          </ul>
        </div>
        <!-- Add Faint line for separation -->
        <div class="cardFooter">
          <h4 class="postedDate">Posted on: {{postedDate}}</h4>
          <h4 class="closingDate">
            Closing Date:
            <span>{{closingDate}}</span>
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
  props: {
    // jobTitle: String,
    // companyName: String,
    // location: String,
    // jobLevel:String,
    // jobType: String,
    // salary: String,
    // postedDate: String,
    // closingDate: String,
    activeTab: Boolean
  },
  computed: {},
  data() {
    return {
      jobID: 1234,
      jobTitle: "Frontend web application developer",
      companyName: "Test Company",
      location: "Edmonton, AB",
      jobLevel: "Junior Entry Level",
      jobType: "Full Time",
      salary: "$27.75/hr",
      postedDate: "10/29/2019",
      closingDate: "11/30/2019",
      // activeTab: false,
    };
  },
  methods: {
    makeActive: function () {
      // this.$emit("hello", event);
      this.activeTab = !this.activeTab;
    }
  }
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