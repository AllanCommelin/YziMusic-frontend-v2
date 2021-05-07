<template>
    <div class="text-left">
        <modalUploadPicture v-show="showModalUploadPicture" @close="showModalUploadPicture = false" :imageProfile="imageProfile" :user="user"/>
        <div class="flex flex-wrap justify-between text-ym-grey">
            <div class="sm:w-1/3 w-full text-left my-2">
                <img :src="imageProfile" alt="Photo de profil" class="h-24 w-24 profile-img relative block mx-auto rounded-full border-solid border-main border-5">
                <button v-on:click="showModalUploadPicture = true" class="block mx-auto font-400 italic underline hover:text-ym-blue">Changer</button>
            </div>
            <div class="sm:w-1/3 w-full sm:pr-2 text-left my-2">
                <label class="label" for="firstname">Prénom</label>
                <input id="firstname" class="input" v-model="firstname" name="firstname" required placeholder="John"/>
            </div>
            <div class="sm:w-1/3 w-full sm:pl-2 text-left my-2">
                <label class="label" for="lastname">Nom</label>
                <input id="lastname" class="input" v-model="lastname" name="lastname" required placeholder="Doe"/>
            </div>
            <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
                <label class="label" for="email">Adresse mail</label>
                <input id="email" v-model="email" class="input" required name="email" type="email" placeholder="JohnDoe@gmail.com"/>
            </div>
            <div class="sm:w-1/2 w-full sm:pl-2 text-left my-2">
                <label class="label" for="username">Pseudo</label>
                <input id="username" class="input" v-model="username" required name="username" placeholder="Jdoe"/>
            </div>
            <div class="w-full sm:pr-2 text-left my-2">
                <label class="label" for="description">Description</label>
                <textarea class="input w-full" placeholder="Bio, projets, souhaits..." v-model="description" name="description" id="description" rows="8"></textarea>
            </div>
            <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
                <label class="label" for="location">Ville, Pays</label>
                <input type="text" class="input" id="location" placeholder="Paris, France" v-model="location">
            </div>
            <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
                <label class="label" for="birthday">Date de naissance</label>
                <input type="date" class="input" id="birthday" placeholder="31/12/1990" v-model="birthday">
            </div>
            <h3 class="text-xl w-full text-ym-blue font-bold my-4">Styles de musique</h3>
            <div class="flex flex-wrap text-ym-grey">
                <div class="grid gap-4 grid-cols-2 w-full">
                    <div v-for="type in musicsTypes" v-bind:key="type.value">
                        <label :for="type.value" class="mr-2">{{ type.label }}</label>
                        <input type="checkbox" class="checkbox" :checked="type.checked" v-model="type.checked" v-bind:id="type.value"/>
                    </div>
                </div>
            </div>
            <h3 class="text-xl text-ym-blue w-full font-bold my-4">Types de profil</h3>
            <div class="flex flex-wrap text-ym-grey">
                <div class="grid gap-4 grid-cols-2 w-full">
                    <div v-for="type in profilesTypes" v-bind:key="type.value">
                        <label :for="type.value" class="mr-2">{{ type.label }}</label>
                        <input type="checkbox" class="checkbox" :checked="type.checked" v-model="type.checked" v-bind:id="type.value"/>
                    </div>
                </div>
            </div>
            <h3 class="text-xl text-ym-blue w-full font-bold my-4">Changer mon mot de passe</h3>
            <div class="sm:w-1/2 w-full sm:pl-2 text-left my-2">
                <label class="label" for="password">Mot de passe</label>
                <input id="password" class="input" v-model="password" required name="password" type="password" placeholder="Minimum 8 caractères"/>
            </div>
            <div class="sm:w-1/2 w-full sm:pl-2 text-left my-2">
                <label class="label" for="confirmPassword">Confirmation du mot de passe</label>
                <input id="confirmPassword" class="input" v-model="confirmPassword" required name="password" type="password" placeholder="Minimum 8 caractères"/>
            </div>
            <div class="mt-10 mb-16 w-full flex justify-center">
                <button class="btn-yzi" :disabled="!isFullFilled" v-on:click="updateUser">Sauvegarder</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import Vue from "vue";
    import ProfilesTypes from '../../store/constants/ProfilesTypes';
    import MusicsType from '../../store/constants/MusicsTypes';
    import modalUploadPicture from "@/components/upload/modalUploadPicture";

    export default {
        name: "ProfileSettings",
        components: {
            modalUploadPicture
        },
        data () {
            return {
                showModalUploadPicture: false,
                email: null,
                firstname: null,
                lastname: null,
                username: null,
                description: null,
                location: null,
                birthday: null,
                password: null,
                confirmPassword: null,
                profilesTypes: ProfilesTypes,
                musicsTypes: MusicsType,
            }
        },
        computed: {
            ...mapState({
                user: state => state.User.user
            }),
            /* Check optional and required fields */
            isFullFilled: function () {
                let requiredFilled = this.firstname && this.lastname && this.email && this.username
                let optionalFilled =  this.password ?
                    this.password.length > 7 && this.confirmPassword === this.password :
                    true
                return requiredFilled && optionalFilled
            },
            imageProfile: function () {
                return this.user.profilePicture ?
                    'data:'+ this.user.profilePicture.contentType +';base64,'+ this.user.profilePicture.picture
                    : require('../../assets/images/default-profile.jpg')
            },
        },
        mounted() {
            this.email = this.user.email
            this.firstname = this.user.firstname
            this.lastname = this.user.lastname
            this.description = this.user.description
            this.location = this.user.location
            this.birthday = this.user.birthday
            this.username = this.user.username
            this.password = this.user.password
            // Retrieve musics types of user's profile
            this.user.musicsTypes.forEach(music => {
                this.musicsTypes.forEach(obj => {
                    if(obj.value === music) obj.checked = true;
                })
            })
            // Retrieve profiles types of user's profile
            this.user.profilesTypes.forEach(profile => {
                this.profilesTypes.forEach(obj => {
                    if(obj.value === profile) obj.checked = true;
                })
            })
        },
        methods: {
            /* Get checked data to format API */
            formatCheckedData(checkData) {
                let data = []
                checkData.forEach( music => {
                    if(music.checked) data = [...data, music.value]
                })
                return data
            },
            updateUser: function () {
                let updateData = {
                    email: this.email,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    username: this.username,
                    description: this.description,
                    location: this.location,
                    birthday: this.birthday,
                    profilesTypes: this.formatCheckedData(this.profilesTypes),
                    musicsTypes: this.formatCheckedData(this.musicsTypes),
                }
                if (this.password) updateData.password = this.password
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

<style scoped>

</style>