<template>
    <div :class="classType" role="alert">
        <img :src="getIcon()" :class="iconColor" alt="icon">
        <span class="block sm:inline">{{ msg }}</span>
    </div>
</template>

<script>
    export default {
        name: "Alert",
        props: {
            msg: String,
            type: String
        },
        data () {
            return {
                iconColor: 'fill-current text-main'
            }
        },
        computed: {
            classType:  function () {
                let alertClass;
                switch (this.type) {
                    case 'error':
                        alertClass = { 'px-4 py-3 rounded relative text-left bg-red-100 border border-red-400 text-red-700' : true }
                        break
                    case 'success':
                        alertClass = { 'px-4 py-3 rounded relative text-left bg-green-100 border border-green-400 text-green-700' : true }
                        break
                    case 'info':
                        alertClass = { 'px-4 py-3 rounded relative text-left bg-blue-100 border border-blue-400 text-blue-700' : true }
                        break
                }
                return alertClass
            }
        },
        methods: {
            getIcon () {
                switch (this.type) {
                    case 'error':
                        this.iconColor = 'fill-current text-red-700'
                        break
                    case 'success':
                        this.iconColor = 'fill-current text-green-700'
                        break
                    case 'info':
                        this.iconColor = 'fill-current text-blue-700'
                        break
                }
                return require('../assets/icons/'+this.type+'.svg')
            }
        }
    }
</script>

<style scoped lang="scss">
    div {
        display: flex;
        img {
            display: inline-block;
        }
    }
</style>