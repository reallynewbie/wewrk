<template>
    <div>
        <SearchBar />
        <Results />
        <h1>OMG</h1>
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

</style>