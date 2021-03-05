<template>
    <div>
        <h2 class="text-3xl my-4 font-bold text-white font-black">Mes réseaux sociaux</h2>
        <div class="flex flex-wrap text-ym-grey">
            <div class="grid gap-4 grid-cols-2 w-full">
                <label for="facebook">Facebook</label>
                <input v-model="facebookLink" class="input" id="facebook" name="facebookLink"/>
                <label for="twitter">Twitter</label>
                <input v-model="twitterLink" class="input" id="twitter" name="twitterLink"/>
                <label for="instagram">Instagram</label>
                <input v-model="instagramLink" class="input" id="instagram" name="instagramLink"/>
                <label for="youtube">Youtube</label>
                <input v-model="youtubeLink" class="input" id="youtube" name="youtubeLink"/>
            </div>
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
            Vue.prototype.$http.put('http://localhost:6985/api/users/' + this.user._id, updateData)
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