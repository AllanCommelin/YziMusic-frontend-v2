<template>
    <div id="app">
        <div id="loader" class="absolute z-20 top-0 left-0 right-0 bottom-0 bg-black flex justify-center items-center">
            <span class="animate-ping absolute inline-flex h-32 w-32 rounded-full bg-main opacity-75"></span>
            <span class="text-white opacity-75 text-2xl font-black">YziMusic</span>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App',
    mounted() {
        window.addEventListener("load", function () {
            document.getElementById('loader').remove()
        });
    },
}
</script>

<style>
#app {
    font-family: Montserrat, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
