<template>
    <div>
        <h2 class="text-3xl mb-6 font-bold text-white">Votre profil</h2>
        <div class="flex flex-wrap text-ym-grey text-left">
            <div class="w-full sm:pr-2 text-left my-2">
                <label class="label" for="description">Description*</label>
                <textarea class="input w-full" placeholder="Bio, projets, souhaits..." v-model="description" name="description" id="description" rows="8"></textarea>
            </div>
            <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
                <label class="label" for="location">Ville, Pays*</label>
                <input type="text" class="input" id="location" placeholder="Paris, France" v-model="location">
            </div>
            <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
                <label class="label" for="birthday">Date de naissance*</label>
                <input type="date" class="input" id="birthday" placeholder="31/12/1990" v-model="birthday">
            </div>
           <div class="w-full sm:w-1/2">
               <h3 class="text-xl w-full text-ym-blue font-bold my-4">Styles de musique</h3>
               <div class="flex flex-wrap text-ym-grey">
                   <div class="grid gap-4 grid-cols-2 w-full">
                       <div v-for="type in musicsTypes" v-bind:key="type.value">
                           <label :for="type.value" class="mr-2">{{ type.label }}</label>
                           <input type="checkbox" class="checkbox" :checked="type.checked" v-model="type.checked" v-bind:id="type.value"/>
                       </div>
                   </div>
               </div>
           </div>
            <div class="w-full sm:w-1/2">
                <h3 class="text-xl text-ym-blue w-full font-bold my-4">Types de profil</h3>
                <div class="flex flex-wrap text-ym-grey">
                    <div class="grid gap-4 grid-cols-2 w-full">
                        <div v-for="type in profilesTypes" v-bind:key="type.value">
                            <label :for="type.value" class="mr-2">{{ type.label }}</label>
                            <input type="checkbox" class="checkbox" :checked="type.checked" v-model="type.checked" v-bind:id="type.value"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full text-right mt-4">
                <span>Champs obligatoires*</span>
            </div>
            <div class="mt-10 mb-16 w-full flex justify-center">
                <button class="btn-yzi" v-on:click="previous()">Retour</button>
                <button class="btn-yzi" :disabled="!isFullFilled" v-on:click="next()">Suivant</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import ProfilesTypes from '../../store/constants/ProfilesTypes'
    import MusicsType from '../../store/constants/MusicsTypes'

    export default {
        name: "RegisterStep2",
        data() {
            return {
                profilesTypes: ProfilesTypes,
                musicsTypes: MusicsType,
                description: '',
                location: '',
                birthday: '',
            }
        },
        computed: {
            ...mapState({
                user: state => state.User.user
            }),
            /* Check all field are filled */
            isFullFilled: function () {
                return this.description !== ''
                    && this.location !== ''
                    && this.birthday !== ''
            }
        },
        created () {
            /* Get data if it already on store (ex step 3 to 2)*/
            if(this.user.description) this.description = this.user.description
            if(this.user.location) this.location = this.user.location
            if(this.user.birthday) this.birthday = this.user.birthday

            this.user.musicsTypes.forEach(music => {
                this.musicsTypes.forEach(obj => {
                    if(obj.value === music) obj.checked = true;
                })
            })
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
            next() {
                this.$store.dispatch('User/setUserField', {
                    profilesTypes: this.formatCheckedData(this.profilesTypes),
                    musicsTypes: this.formatCheckedData(this.musicsTypes),
                    description: this.description,
                    location: this.location,
                    birthday:this.birthday
                })
                this.$emit('increment')
            },
            previous() {
                this.$emit('decrement')
            },
        }
    }
</script>

<style scoped>

</style>