<template>
    <div>
        <div>
            <Step1 v-if="step === 1" @increment="incrementStep" @decrement="decrementStep"/>
            <Step2 v-else-if="step === 2" @increment="incrementStep" @decrement="decrementStep"/>
            <Step3 v-else-if="step === 3" @increment="incrementStep" @decrement="decrementStep"/>
            <div v-else>
                <div class="flex justify-around flex-wrap">
                    <img src="../../assets/images/welcome.svg" class="sm:h-96 h-48 sm:mt-16" alt="Image de bienvenue"/>
                    <div class="py-8 flex flex-col justify-center">
                        <h2 class="font-black sm:text-5xl text-4xl text-main">
                            Bienvenue sur YziMusic <span class="text-ym-blue">{{ user.username }}</span>
                            <i class="fas fa-compact-disc ml-4"></i>
                        </h2>
                        <p class="font-medium text-white text-xl mb-10">
                            Vous pouvez désormais vous connecter en cliquant sur le bouton ci-dessous
                        </p>
                        <div>
                            <a href="/login" class="uppercase italic font-bold inline-block mt-2 btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-main hover:bg-main text-white font-normal py-4 px-4 rounded">
                                Se connecter
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Step1 from '../../components/registerSteps/RegisterStep1'
    import Step2 from '../../components/registerSteps/RegisterStep2'
    import Step3 from '../../components/registerSteps/RegisterStep3'

    export default {
        name: "Register",
        components: {
            Step1,
            Step2,
            Step3
        },
        data () {
            return {
                step: 1
            }
        },
        computed: {
            ...mapState({
                user: state => state.User.user,
                is_login: state => state.User.is_login
            })
        },
        methods: {
            incrementStep () {
                this.step++
            },
            decrementStep () {
                this.step--
            }
        }
    }
</script>

<style scoped>

</style>