<template>
    <div>
        <h2 class="text-3xl my-4 font-bold text-white font-black">Mon profil</h2>
        <div class="flex flex-wrap justify-between text-ym-grey">
            <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
                <label class="label" for="firstname">Prénom</label>
                <input id="firstname" class="input" v-model="firstname" name="firstname" required placeholder="John"/>
            </div>
            <div class="sm:w-1/2 w-full sm:pl-2 text-left my-2">
                <label class="label" for="lastname">Nom</label>
                <input id="lastname" class="input" v-model="lastname" name="lastname" required placeholder="Doe"/>
            </div>
            <div class="w-full text-left my-2">
                <label class="label" for="email">Adresse mail</label>
                <input id="email" v-model="email" class="input" required name="email" type="email" placeholder="JohnDoe@gmail.com"/>
            </div>
            <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
                <label class="label" for="username">Pseudo</label>
                <input id="username" class="input" v-model="username" required name="username" placeholder="Jdoe"/>
            </div>
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

    export default {
        name: "ProfileSettings",
        data () {
            return {
                email: null,
                firstname: null,
                lastname: null,
                username: null,
                password: null,
                confirmPassword: null,
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
            }
        },
        mounted() {
            this.email = this.user.email
            this.firstname = this.user.firstname
            this.lastname = this.user.lastname
            this.username = this.user.username
            this.password = this.user.password
        },
        methods: {
            updateUser: function () {
                let updateData = {
                    email: this.email,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    username: this.username
                }
                if (this.password) updateData.password = this.password
                Vue.prototype.$http.put('http://localhost:6985/api/users/' + this.user._id, updateData)
                    .then(res => {
                        console.log('Update success', res)
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