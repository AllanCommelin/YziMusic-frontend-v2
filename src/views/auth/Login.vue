<template>
    <div>
        <h1 class="text-3xl my-4 font-bold text-white font-black">Connexion</h1>
        <div v-if="error" class="my-2">
            <alert :msg='error' type="error"></alert>
        </div>
        <div class="flex flex-wrap justify-between text-ym-grey">
            <div class="w-full text-left my-2">
                <label class="label" for="email">Adresse mail</label>
                <input id="email" v-model="email" class="input" required name="email" type="email" placeholder="JohnDoe@gmail.com"/>
            </div>
            <div class="w-full text-left my-2">
                <label class="label" for="password">Mot de passe</label>
                <input id="password" class="input" v-model="password" required name="password" type="password" v-on:keyup.enter="login" placeholder="Minimum 8 caractères"/>
            </div>
            <div class="mt-10 w-full flex justify-center">
                <button class="btn-yzi" :disabled="!isFullFilled" v-on:click="login">Se connecter</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import Alert from '@/components/Alert'

    export default {
        name: "Login",
        components: {
            Alert
        },
        data () {
            return {
                email: null,
                password: null,
            }
        },
        computed: {
            ...mapState({
                user: state => state.User.user,
                is_login: state => state.User.is_login,
                error: state => state.User.errorLogin
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
                    email: this.email,
                    password: this.password
                })
            }
        }
    }
</script>

<style scoped>

</style>