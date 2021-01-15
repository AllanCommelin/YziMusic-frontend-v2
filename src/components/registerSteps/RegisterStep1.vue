<template>
    <div>
        <h2 class="text-3xl mb-6 font-bold text-white">Vos informations</h2>
        <div class="flex flex-wrap text-ym-grey">
            <div class="grid gap-4 grid-cols-2 w-full">
                <input class="input" v-model="firstname" name="firstname" required placeholder="Prénom"/>
                <input class="input" v-model="lastname" name="lastname" required placeholder="Nom"/>
            </div>
            <div class="w-full my-6">
                <input v-model="email" class="input" required name="email" type="email" placeholder="exemple@gmail.com"/>
            </div>
            <div class="grid gap-4 grid-cols-2 w-full">
                <input class="input" v-model="username" required name="username" placeholder="Pseudo"/>
                <input class="input" v-model="password" required name="password" type="password"/>
            </div>
            <div class="mt-10 w-full flex justify-center">
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
            }
        },
        created () {
            /* Get data if it already on store (ex step 2 to 1)*/
            this.firstname = this.user.firstname ? this.user.firstname :''
            this.lastname = this.user.lastname ? this.user.lastname :''
            this.email = this.user.email ? this.user.email :''
            this.username = this.user.username ? this.user.username :''
            this.password = this.user.password ? this.user.password :''
        },
        methods: {
            next () {
                this.$store.dispatch('User/SET_USER_FIELD', {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
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