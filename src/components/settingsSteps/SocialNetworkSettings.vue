<template>
    <div class="flex flex-wrap justify-between text-ym-grey">
        <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
            <label for="facebook">Facebook</label>
            <input v-model="facebookLink" class="input" id="facebook" name="facebookLink"/>
        </div>
        <div class="sm:w-1/2 w-full sm:pl-2 text-left my-2">
            <label for="twitter">Twitter</label>
            <input v-model="twitterLink" class="input" id="twitter" name="twitterLink"/>
        </div>
        <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
            <label for="instagram">Instagram</label>
            <input v-model="instagramLink" class="input" id="instagram" name="instagramLink"/>
        </div>
        <div class="sm:w-1/2 w-full sm:pl-2 text-left my-2">
            <label for="youtube">Youtube</label>
            <input v-model="youtubeLink" class="input" id="youtube" name="youtubeLink"/>
        </div>
        <div class="mt-10 mb-16 w-full flex justify-center">
            <button class="btn-yzi" v-on:click="updateUser">Sauvegarder</button>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import Vue from "vue";

export default {
    name: "SocialNetworkSettings",
    data () {
        return {
            facebookLink: null,
            twitterLink: null,
            instagramLink: null,
            youtubeLink: null,
        }
    },
    computed: {
        ...mapState({
            user: state => state.User.user
        }),
    },
    mounted() {
        this.facebookLink = this.user.facebookLink
        this.twitterLink = this.user.twitterLink
        this.instagramLink = this.user.instagramLink
        this.youtubeLink = this.user.youtubeLink

    },
    methods: {
        updateUser: function () {
            let updateData = {
                facebookLink: this.facebookLink,
                twitterLink: this.twitterLink,
                instagramLink: this.instagramLink,
                youtubeLink: this.youtubeLink,
            }
            // TODO: Put this function in user's module
            Vue.prototype.$http.put(process.env.VUE_APP_API_URL+'/api/users/' + this.user._id, updateData)
                .then(res => {
                    console.log('Update success', res)
                    //todo: Display Alert success
                })
                .catch(() => {
                    //Todo: catch error
                })
        }
    }
}
</script>

<style lang="scss" scoped>
    label {
        display: block;
        width: 100%;
    }
</style>