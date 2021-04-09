<template>
    <div :class="classType" role="alert">
        <template v-if="type === 'success'">
            <div class="text-center">
                <svg class="svg-icon success" viewBox="0 0 20 20">
                    <path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"></path>
                </svg>
            </div>
        </template>
        <template v-else>
            <svg :class="['svg-icon', type]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path d="M18.344,16.174l-7.98-12.856c-0.172-0.288-0.586-0.288-0.758,0L1.627,16.217c0.339-0.543-0.603,0.668,0.384,0.682h15.991C18.893,16.891,18.167,15.961,18.344,16.174 M2.789,16.008l7.196-11.6l7.224,11.6H2.789z M10.455,7.552v3.561c0,0.244-0.199,0.445-0.443,0.445s-0.443-0.201-0.443-0.445V7.552c0-0.245,0.199-0.445,0.443-0.445S10.455,7.307,10.455,7.552M10.012,12.439c-0.733,0-1.33,0.6-1.33,1.336s0.597,1.336,1.33,1.336c0.734,0,1.33-0.6,1.33-1.336S10.746,12.439,10.012,12.439M10.012,14.221c-0.244,0-0.443-0.199-0.443-0.445c0-0.244,0.199-0.445,0.443-0.445s0.443,0.201,0.443,0.445C10.455,14.021,10.256,14.221,10.012,14.221"></path>
            </svg>
        </template>
        <span v-if="msg" class="pl-2 block sm:inline">{{ msg }}</span>
    </div>
</template>

<script>
    export default {
        name: "Alert",
        props: {
            msg: String,
            type: String
        },
        computed: {
            classType:  function () {
                let alertClass;
                switch (this.type) {
                    case 'error':
                        alertClass = { 'px-4 py-3 rounded relative text-left bg-red-100 border border-red-400 text-red-700 z-50' : true }
                        break
                    case 'success':
                        alertClass = { 'px-4 py-3 rounded relative text-left bg-green-100 border border-green-400 text-green-700 z-50' : true }
                        break
                    case 'info':
                        alertClass = { 'px-4 py-3 rounded relative text-left bg-blue-100 border border-blue-400 text-blue-700 z-50' : true }
                        break
                }
                return alertClass
            }
        },
    }
</script>

<style scoped lang="scss">
    div {
        display: flex;
        img {
            display: inline-block;
        }
    }
    .svg-icon {
        width: 1.5em;
        height: 1.5em;
    }

    .svg-icon path,
    .svg-icon polygon,
    .svg-icon rect {
        fill: currentColor;
        &.error {
            @apply text-red-700;
        }
        &.success {
            @apply bg-green-700;
        }
        &.info {
            @apply text-blue-700;
        }
    }
    .svg-icon circle {
        stroke-width: 1;
        stroke: currentColor;
        &.error {
            @apply text-red-700;
        }
        &.success {
            @apply bg-green-700;
        }
        &.info {
            @apply text-blue-700;
        }
    }
</style>