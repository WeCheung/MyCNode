<template>
    <div id="app">
        <CNodeTitle />
        <keep-alive :exclude="['Articles', 'User']">
            <router-view name="main"></router-view>
        </keep-alive>
        <router-view name="side"></router-view>
    </div>
</template>

<script>
    import CNodeTitle from "./components/content/CNodeTitle";
    export default {
        name: 'app'
        , components: {CNodeTitle}
    }
</script>

<style lang="less">
    #app{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    html{
        font-size: 10px !important;
    }
</style>
