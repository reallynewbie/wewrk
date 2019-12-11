<template>
  <div id="recentSearches">
    <h1>Not sure where to start?</h1>
    <h2>People like you are searching for things like...</h2>
    <div id="searches">
      <div class="search" v-for="search in recentSearches" v-bind:key="search.id">
        <router-link :to="{ path: '/search', query: {q:search.value} }" class="links">
          <p>
            {{search.value}}
            <font-awesome-icon icon="chevron-right" class="chevron-right" />
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recentSearches: [
        {
          id: 0,
          value: "cashier walmart"
        },
        {
          id: 1,
          value: "Cashier Walmart Edmonton"
        },
        {
          id: 2,
          value: "tester"
        },
        {
          id: 3,
          value: "Designer"
        },
        {
          id: 4,
          value: "Developer"
        },
        {
          id: 5,
          value: "Edmonton"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#recentSearches {
  margin-left: 11%;
  width: 70%;
  padding-top: 3%;
  margin-bottom: 117px;
}
h1 {
  font-family: Rubik;
  font-size: 35px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
  color: #1b1c1d;
}
h2 {
  font-family: Rubik;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #767676;
}
#searches {
  margin-top: 28px;
  text-align: left;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}
#searches > div {
  flex: 1 1 25%;
  margin-right: 3%;
  margin-bottom: 13px;
}
.search {
  background-color: #f8f7f0;
  height: 44px;
}
.search:hover {
  background-color: #f0eedf;
}
.search:hover > .chevron-right {
  border: solid 2px var(--warm-grey);
}
.search > a > p {
  padding-top: 12px;
  padding-left: 20px;
  font-family: Rubik;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #1b1c1d;
}
.chevron-right {
  float: right;
  margin-right: 30px;
  color: #707070;
  border: solid 1px var(--warm-grey);
}
.chevron-right:hover {
  border: solid 2px var(--warm-grey);
}
.links {
  text-decoration: none;
}
</style>