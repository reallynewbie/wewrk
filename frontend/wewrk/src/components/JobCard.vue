<template>
  <b-card no-body class="jobCard" v-on:click="makeActive">
    <div class="lightUp" :class="{lightupActive:activeTab == true}" />
    <div class="card-body">
      <b-card-title>{{jobTitle}}</b-card-title>
      <b-card-sub-title class="subtext">{{companyName}}</b-card-sub-title>
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
        <div class="cardFooter">
          <font-awesome-icon icon="clock" class="clockIcon" />
          <h4 class="postedDate">Posted on: {{convertDate(postedDate)}}</h4>
          <h4 class="closingDate">
            Closing date:
            <span>{{closingDate ? closingDate : "N/A"}}</span>
          </h4>
        </div>
      </b-card-text>
    </div>
    <div class="icons">
      <font-awesome-icon icon="heart" class="heartIcon" :class="{heartIconActive:heartActive == true}" v-on:click="clickHeart"/>
      <font-awesome-icon icon="times-circle" class="dismissIcon" :class="{dismissIconActive:dismissActive == true}" v-on:click="clickDismiss"/>
    </div>
  </b-card>
</template>

<script>
export default {
  props: ["jobInfo", "index", "activeCard"],
  created: function() {
    if (this.$props.index === 0) {
      console.log('hello?');
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
        jobDescription: this.jobInfo.jobDescription,
        link: this.jobInfo.link,
      });
    }
  },
  computed: {
    activeTab: function() {
      return (this.$props.activeCard === this.$props.index);
    }
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
      heartActive: false,
      dismissActive: false,
      myIndex: 0
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
        jobDescription: this.jobInfo.jobDescription,
        link: this.jobInfo.link,
      });
      this.$emit("changeActiveCard", this.$props.index)
      this.activeTab = !this.activeTab;
    },
    convertDate: function(utcDate) {
      let regDate = new Date(utcDate);
      return (`${regDate.getMonth()+1}/${regDate.getUTCDate()}/${regDate.getFullYear()}`)
    },
    clickHeart: function() {
      this.heartActive = !this.heartActive;
    },
    clickDismiss: function() {
      this.dismissActive = !this.dismissActive;
    }
  },
};
</script>

<style lang="scss" scoped>
.heartIcon {
  color: #e8e8e8;
  margin-right: 5px;
  cursor: pointer;
}

.heartIcon:hover {
  color: #e72204;
  cursor: pointer;
}
.heartIconActive {
  color: #e72204;
}

.dismissIcon {
  color: #e8e8e8;
  cursor: pointer;
}

.dismissIcon:hover {
  color: #1b1c1d;
  cursor: pointer;
}
.dismissIconActive {
  color: #1b1c1d;
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
.lightupActive {
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
  padding-bottom: 5px;
}
.card-title {
  font-size: 14px;
  font-weight: bold;
  line-height: 1.29;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 6px;
}
.subtext {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87) !important;
  margin-bottom: 8px;
  font-weight: normal;
}
.cardFooter {
  border-top: 1px solid rgb(240, 240, 240);
  display: flex;
  padding-top: 13px;
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
.clockIcon {
  margin-top: 4px;
  height: 8.8px;
  width: 8.8px;
  margin-right: 4.2px;
}
</style>