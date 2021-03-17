<template>
    <div class="overlay bg-gray-300 py-6 flex flex-col justify-center">
        <div class="py-3 h-full sm:max-w-xl sm:min-w-1/2 sm:mx-auto">
            <div class="relative h-full bg-white min-w-1xl flex flex-col justify-around rounded-xl shadow-lg">
                <button v-on:click="closeModal" class="absolute right-2 top-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
                </button>
                <div class="px-12 py-5 text-center">
                    <h2 class="text-gray-800 text-3xl font-black uppercase text-center">Ajouter</h2>
                    <h3 class="text-gray-800 text-2xl font-medium text-center">un projet musical</h3>
                </div>
                <div class="bg-gray-200 w-full h-full p-8 flex flex-col items-center">
                    <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
                        <label class="label --light" for="name">Nom du projet</label>
                        <input id="name" v-model="name" class="input --light " required name="name" type="text" placeholder="Titre du projet"/>
                    </div>
                    <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
                        <label class="label --light" for="date">Date de sortie</label>
                        <input id="date" v-model="date" class="input --light shadow-lg" required name="date" type="date"/>
                    </div>
                    <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
                        <label class="label --light" for="tag">Genre musical</label>
                        <div class="relative">
                            <select id="tag" v-model="tag" class="block appearance-none w-full bg-white shadow-lg border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tights outline-none">
                                <option v-for="type in musicsTypes" v-bind:key="type.value" :value="type.value">{{ type.label }}</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full items-center justify-center bg-grey-lighter my-auto">
                        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-main hover:text-white">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-center leading-normal">Sélectionner un projet</span>
                            <input type='file' v-on:change="onFileChange" class="hidden" />
                        </label>
                    </div>
                </div>
                <div :class="['py-6 flex items-center justify-center text-xl text-bold hover:text-white rounded-b-xl', !selectedTrack ? 'bg-gray-400 hover:bg-gray-600' : 'bg-white hover:bg-main']">
                    <button v-on:click="onUploadFile" :disabled="!selectedTrack">Ajouter</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import MusicsType from "@/store/constants/MusicsTypes";

    export default {
        name: "modalUploadPicture",
        data () {
            return {
                musicsTypes: MusicsType,
                selectedTrack: "",
                tracks: [],
                name: '',
                tag: '',
                date: null,
                track: null,
                audio: null
            }
        },
        methods: {
            closeModal() {
                this.$emit('close')
            },
            onFileChange(e) {
                const selectedFile = e.target.files[0]; // accessing file
                this.selectedTrack = selectedFile;
            },
            onUploadFile() {
                const formData = new FormData();
                formData.append("track", this.selectedTrack);  // appending file
                formData.append("name", this.name);  // appending name
                formData.append("tag", this.tag);  // appending tag
                formData.append("date", this.date);  // appending date

                // sending file to the backend
                Vue.prototype.$http.post('http://localhost:6985/api/tracks/upload/', formData)
                    .then(res => {
                        console.log(res);
                        // update list of tracks in store
                        this.closeModal();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 11;
        background-color: rgba(0, 0, 0, .6);
        overflow: hidden;
        padding: 1rem;
    }
</style>