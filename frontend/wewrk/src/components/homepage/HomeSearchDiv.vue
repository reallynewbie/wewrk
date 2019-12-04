<template>
  <div class="searchDiv">
    <h1 id="searchDesc">Search by job keyword, company, or location</h1>
    <div class="searchbox">
      <b-input-group id="inputGroup">
        <b-form-input @keyup.enter="searchClicked" class="inputBox" v-model="search" />
        <b-input-group-append>
          <b-button
            :to="{path:'/search', query:{q:search} }"
            type="submit"
            id="btn_findwork"
            class="btn"
          >
            <font-awesome-icon icon="search" size="lg" class="searchIcon" />Find work
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  methods: {
    searchClicked() {
      this.$router.push({ path: "/search", query: { q: this.search } });
    }
  }
};
</script>

<style lang="scss" scoped>
#magnifyingGlass {
  width: 23.5px;
  height: 23.5px;
  margin-right: 9px;
}
.searchDiv {
  width: 44%;
}
#searchDesc {
  font-family: Rubik;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: white;
}

#inputGroup {
  height: 100%;
}
.form-control {
  height: 100%;
}
.searchbox {
  width: 635px;
  height: 72px;
  border-radius: 6px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #dededf;
  background-color: #ffffff;
}
#btn_findwork {
  background-color: #eed350;
  color: #2f2f2f;
  font-family: Rubik;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  text-align: center;
  color: #2f2f2f;
  height: 100%;
  width: 170px;
  border-style: none;
  padding-top: 23px;
}
.inputBox {
  border-style: none;
}
.searchIcon {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
</style>