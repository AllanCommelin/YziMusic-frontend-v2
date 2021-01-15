<template>
    <div>
        <h2 class="text-3xl mb-6 font-bold text-white">Votre profil</h2>
        <div class="flex flex-wrap text-ym-grey">
            <div class="grid gap-4 grid-cols-2 w-full">
                <textarea class="input w-full" v-model="description" name="description" id="description" rows="8"></textarea>
            </div>
            <div class="w-full my-6">
                <input type="text" class="input" v-model="location">
                <input type="date" class="input" v-model="birthday">
            </div>
            <div class="grid gap-4 grid-cols-2 w-full">
                <div v-for="type in musicsTypes" v-bind:key="type.value">
                    <label :for="type.value">{{ type.label }}</label>
                    <input type="checkbox" class="checkbox" :checked="type.checked"
                           v-model="type.checked"
                           v-bind:id="type.value"
                    />
                </div>
                <div v-for="type in profilesTypes" v-bind:key="type.value">
                    <label :for="type.value">{{ type.label }}</label>
                    <input type="checkbox" class="checkbox" :checked="type.checked"
                           v-model="type.checked"
                           v-bind:id="type.value"
                    />
                </div>
            </div>
            <div class="mt-10 w-full flex justify-center">
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
            this.description = this.user.description ? this.user.description :''
            this.location = this.user.location ? this.user.location :''
            this.birthday = this.user.birthday ? this.user.birthday :''
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
                    }
                )
                return data
            },
            next() {
                this.$store.dispatch('User/SET_USER_FIELD', {
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
            handleCheckbox(event) {
                console.log(event)
            }
        }
    }
</script>

<style scoped>

</style>