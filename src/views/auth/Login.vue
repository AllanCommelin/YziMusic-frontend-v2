<template>
    <div class="mx-auto max-w-md">
        <h1 class="text-3xl my-4 font-bold text-white font-black">Connexion</h1>
        <div class="flex flex-wrap justify-between text-ym-grey">
            <div class="w-full text-left my-2">
                <label class="label" for="email">Adresse mail</label>
                <input id="email" v-model="email" class="input" required name="email" type="email" placeholder="JohnDoe@gmail.com"/>
            </div>
            <div class="w-full text-left my-2">
                <label class="label" for="password">Mot de passe</label>
                <input id="password" class="input" v-model="password" required name="password" type="password" v-on:keyup.enter="login" placeholder="Minimum 8 caractères"/>
            </div>
            <div class="mt-10 w-full flex justify-center items-center flex-col">
                <button class="btn-yzi w-max" :disabled="!isFullFilled" v-on:click="login">Se connecter</button>
                <router-link class="my-2 hover:underline" to="Register">
                    Pas encore de compte ?
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Login",
        data () {
            return {
                email: '',
                password: '',
            }
        },
        computed: {
            ...mapState({
                user: state => state.User.user,
                is_login: state => state.User.is_login,
            }),
            /* Check all field are filled */
            isFullFilled: function () {
                return this.email !== ''
                    && this.password !== ''
            }
        },
        watch: {
            is_login: function () {
                if (this.is_login) this.$router.push({name: 'Home'})
            }
        },
        methods: {
            ...mapActions({
                logInUser: 'User/logInUser'
            }),
            login () {
                this.logInUser({
                    email: this.email.toLowerCase(),
                    password: this.password
                })
            }
        }
    }
</script>

<style scoped>

</style>