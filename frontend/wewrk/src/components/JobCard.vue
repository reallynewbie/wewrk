<template>
  <b-card no-body class="jobCard">
    <div class="lightUp" />
    <div class="card-body">
      <b-card-title>{{jobTitle}}</b-card-title>
      <!-- Need less space between -->
      <b-card-sub-title>{{companyName}}</b-card-sub-title>
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
    <div class="icons">Icons</div>
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
      closingDate: "11/30/2019"
    };
  },
  methods: {
    makeActive() {
      this.$emit();
    }
  }
};
</script>

<style lang="scss" scoped>
.jobCard {
  display: flex;
  flex-direction: row;
  border-radius: 0;
  border-width: 1px;
  margin-top: -1px;
}
.lightUp {
  width: 6px;
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
}
.card-subtitle {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87);
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