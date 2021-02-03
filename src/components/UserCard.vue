<template>
    <div class="w-full relative rounded text-center rounded-t-lg bg-ym-black text-white overflow-hidden shadow max-w-xs my-3">
        <img src="../assets/images/default-banner.png" alt="banner" class="h-28"/>
        <div class="flex justify-center -mt-10">
            <img src="../assets/images/default-profile.jpg" alt="profile"
                 class="h-24 rounded-full border-solid border-main border-5 -mt-3"/>
        </div>
        <div class="text-center px-3 pb-3 pt-2">
            <h3 class="-mt-6 text-white text-xl font-black font-sans uppercase">{{ user.username }}</h3>
            <ul class="mt-2 font-sans font-light">
                <li>Profils types</li>
            </ul>
        </div>
        <div class="flex justify-center px-3 pb-3 text-grey-dark">
            <ul class="flex flex-wrap justify-center items-center">
                <li>Musiques types</li>
            </ul>
        </div>
        <div class="flex justify-center pb-3 text-grey-dar mb-16">
            <div class="text-right mr-3 pr-3 w-1/3">
                <h3 class="font-black text-xl">{{ user.likes }} <i class="fas fa-thumbs-up text-xl text-main"/></h3>
            </div>
        </div>
        <div class="flex justify-center left-0 right-0 absolute bottom-0">
            <router-link :to="{name: 'Profile.show', params: { id: user._id }}" class="uppercase italic font-bold w-full mt-4 btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-main hover:bg-main text-white font-normal py-4 px-4 rounded-b">
                Découvrir
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserCard",
        props: ['user'],
        methods: {

        }
    }
</script>

<style scoped>

</style>