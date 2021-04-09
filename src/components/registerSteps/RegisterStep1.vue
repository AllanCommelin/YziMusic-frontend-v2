<template>
    <div>
        <h1 class="text-3xl my-4 font-bold text-white font-black">Vos informations</h1>
        <div class="flex flex-wrap justify-between text-ym-grey">
            <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
                <label class="label" for="firstname">Prénom*</label>
                <input id="firstname" class="input" v-model="firstname" name="firstname" required placeholder="John"/>
            </div>
            <div class="sm:w-1/2 w-full sm:pl-2 text-left my-2">
                <label class="label" for="lastname">Nom*</label>
                <input id="lastname" class="input" v-model="lastname" name="lastname" required placeholder="Doe"/>
            </div>
            <div class="w-full text-left my-2">
                <label class="label" for="email">Adresse mail*</label>
                <input id="email" v-model="email" class="input" required name="email" type="email" placeholder="JohnDoe@gmail.com"/>
            </div>
            <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
                <label class="label" for="username">Pseudo*</label>
                <input id="username" class="input" v-model="username" required name="username" placeholder="Jdoe"/>
            </div>
            <div class="sm:w-1/2 w-full sm:pl-2 text-left my-2">
                <label class="label" for="password">Mot de passe*</label>
                <input id="password" class="input" v-model="password" required name="password" type="password" placeholder="Minimum 8 caractères"/>
            </div>
            <div class="w-full text-right mt-4">
                <span>Champs obligatoires*</span>
            </div>
            <div class="mt-10 mb-16 w-full flex justify-center">
                <button class="btn-yzi" :disabled="!isFullFilled" v-on:click="next()">Suivant</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "RegisterStep1",
        data() {
          return {
              firstname: '',
              lastname: '',
              email: '',
              username: '',
              password: ''
          }
        },
        computed: {
            ...mapState({
                user: state => state.User.user
            }),
            /* Check all field are filled */
            isFullFilled: function () {
                return this.firstname !== ''
                    && this.lastname !== ''
                    && this.email !== ''
                    && this.username !== ''
                    && this.password !== ''
                    && this.password.length > 7
            }
        },
        created () {
            /* Get data if it already on store (ex step 2 to 1)*/
            if(this.user.firstname) this.firstname = this.user.firstname
            if(this.user.lastname) this.lastname = this.user.lastname
            if(this.user.email) this.email = this.user.email
            if(this.user.username) this.username = this.user.username
            if(this.user.password) this.password = this.user.password
        },
        methods: {
            next () {
                this.$store.dispatch('User/setUserField', {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email.toLowerCase(),
                    username: this.username,
                    password:this.password
                })
                this.$emit('increment')
            }
        }
    }
</script>

<style scoped>

</style>