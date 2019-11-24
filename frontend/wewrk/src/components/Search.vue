<template>
    <div class="searchContainer container-fluid">
        <SearchBar />
        <Results />
    </div>
</template>

<script>
    import SearchBar from "./SearchBar";
    import Results from "./Results";

    export default {
        components: {
            SearchBar, 
            Results
        }
        
    }
</script>

<style lang="scss" scoped>
.searchContainer {
    padding:0;
}
</style>