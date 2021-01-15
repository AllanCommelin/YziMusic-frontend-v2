<template>
    <div>
        <div>
            <h2>Step : {{ step }}</h2>
            <Step1 v-if="step === 1" @increment="incrementStep" @decrement="decrementStep"/>
            <Step2 v-else-if="step === 2" @increment="incrementStep" @decrement="decrementStep"/>
            <Step3 v-else-if="step === 3" @increment="incrementStep" @decrement="decrementStep"/>
            <div v-else-if="step === 4">
                Envoyer à l'api

                renvoyer vers la page de connexion

                pour le dev
                <button class="btn-yzi" v-on:click="decrementStep">Retour</button>
            </div>
        </div>
    </div>
</template>

<script>
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