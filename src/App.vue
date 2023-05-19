<!--
 * @Author: 雷宇航
 * @Date: 2022-08-24 11:59:32
 * @LastEditTime: 2022-10-25 17:36:11
 * @LastEditors: 雷宇航
 * @Description: 
 * @FilePath: \myTestProject\myproject\src\App.vue
-->
<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <!--        <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <lyh-map></lyh-map>
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import LyhMap from "@/components/lyhMap.vue";

export default {
    name: 'App',
    components: {
        LyhMap,
        // HelloWorld
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

html, body {
    margin: 0;
}
</style>
