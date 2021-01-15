<template>
    <div class="bg-ym-light-black min-h-screen relative">
        <nav class="flex items-center justify-between flex-wrap bg-ym-black p-6 fixed w-full z-10 top-0">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <a class="text-white no-underline hover:text-white hover:no-underline" href="/">
                    <img class="h-5" src="../assets/images/logo.svg" alt="YziMusic logo"/>
                </a>
            </div>

            <div class="block lg:hidden">
                <button id="nav-toggle"
                        class=" nav-toggle flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0"
                 id="nav-content">
                <ul class="list-reset lg:flex justify-end flex-1 items-center">
                    <li class="mr-3">
                        <a href="/">Accueil</a>
                        <a href="/register">Inscription</a>
                        <a href="/login">Connexion</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="relative">
            <div class="min-h-screen mx-auto bg-ym-light-black mt-18 py-4 px-10 lg:px- mb-28">
                <router-view />
            </div>
        </div>
        <div class="h-20 flex items-center justify-between flex-wrap bg-ym-black p-6 w-full z-10">
            <p class="text-white">YziMusic</p>
            <p class="text-white">Allan Commelin</p>
        </div>
    </div>
</template>

<script>
    //import Navbar from '@/components/Navbar'
    export default {
        name: "Main",
/*        components: {
            Navbar
        }*/
    }
</script>

<style lang="scss">
    input[type='button'] {
        &:disabled {
            background-color: #a0aec0;
            color: #edf2f7;
        }
    }
</style>