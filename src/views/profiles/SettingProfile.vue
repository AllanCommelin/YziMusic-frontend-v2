<template>
    <div>
        <h1 class="relative text-left font-black uppercase italic text-5xl shadow-title title--outline mb-4">Réglage</h1>
        <div>
            <div class="relative">
                <button @click="settingsDropdown = !settingsDropdown"
                        class="relative w-full sm:w-1/2 flex items-center justify-between z-10 rounded-md bg-white p-2 focus:outline-none mx-auto">
                    {{ settingsSelected.label }}
                    <svg class="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
                <div v-show="settingsDropdown" @click="settingsDropdown = false" class="fixed inset-0 h-full w-full z-10"></div>
                <div v-show="settingsDropdown" class="absolute left-0 right-0 mt-2 py-2 bg-white rounded-md shadow-xl z-20">
                    <span v-for="step in settingsSteps" v-bind:key="step.name" v-on:click="selectStep(step)"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">
                        {{ step.label }}
                    </span>
                </div>
            </div>
        </div>
        <stepProfileSettings v-if="settingsSelected.name === 'profile'" />
        <stepSocialNetworkSettings v-else-if="settingsSelected.name === 'social-network'" />
        <stepStreamingSettings v-else-if="settingsSelected.name === 'streaming'" />
        <stepTracksSettings v-else />
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import ProfilesTypes from "@/store/constants/ProfilesTypes";
    import MusicsType from "@/store/constants/MusicsTypes";
    import stepProfileSettings from "@/components/settingsSteps/ProfileSettings";
    import stepSocialNetworkSettings from "@/components/settingsSteps/SocialNetworkSettings";
    import stepStreamingSettings from "@/components/settingsSteps/StreamingSettings";
    import stepTracksSettings from "@/components/settingsSteps/TracksSettings";

    export default {
        name: "settingProfile",
        components: {
            stepProfileSettings,
            stepSocialNetworkSettings,
            stepStreamingSettings,
            stepTracksSettings
        },
        data () {
            return {
                settingsSteps: [
                    {name: 'profile', label: 'Mon profil'},
                    {name: 'social-network', label: 'Liens des réseaux sociaux'},
                    {name: 'streaming', label: 'Liens de streaming'},
                    {name: 'tracks', label: 'Mes projets'},
                ],
                settingsSelected : {name: 'profile', label: 'Mon profil'},
                settingsDropdown: false,
                constProfilesTypes: ProfilesTypes,
                constMusicsTypes: MusicsType,
            }
        },
        computed: {
            ...mapState({
                authUser: state => state.User.user,
                is_login: state => state.User.is_login
            }),
            userProfilesTypes: function () {
                //  Get translate profiles types
                return this.constProfilesTypes.filter( profile =>{
                    if (this.user.profilesTypes.includes(profile.value)) {
                        profile.checked = true
                        return profile
                    }
                })
            },
            userMusicsTypes: function () {
                //  Get translate musics types
                return this.constMusicsTypes.filter( music => {
                    if (this.user.musicsTypes.includes(music.value)) {
                        music.checked = true
                        return music
                    }
                })
            }
        },
        methods: {
            selectStep: function (step) {
                this.settingsSelected = step
                this.settingsDropdown = false
            }
        }
    }
</script>

<style scoped>

</style>