<template>
    <div>
        Profile setting
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import ProfilesTypes from "@/store/constants/ProfilesTypes";
    import MusicsType from "@/store/constants/MusicsTypes";

    export default {
        name: "settingProfile",
        data () {
            return {
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
        mounted() {
            console.log('User login', this.authUser)
        }
    }
</script>

<style scoped>

</style>