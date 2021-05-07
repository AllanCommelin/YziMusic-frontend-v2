<template>
    <div class="overlay bg-gray-300 py-6 flex flex-col justify-center">
        <div class="py-3 h-full sm:max-w-xl sm:min-w-1/2 sm:mx-auto">
            <div class="relative h-full bg-white min-w-1xl flex flex-col justify-around rounded-xl shadow-lg">
                <button v-on:click="closeModal" class="absolute right-2 top-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/></svg>
                </button>
                <div class="px-12 py-5 text-center">
                    <h2 class="text-gray-800 text-3xl font-black uppercase text-center">Changer</h2>
                    <h3 class="text-gray-800 text-2xl font-medium text-center">ma photo de profil</h3>
                </div>
                <div class="bg-gray-200 w-full h-full p-8 flex flex-col items-center">
                    <div class="flex flex-col items-center py-2 space-y-3">
                        <span class="text-lg text-gray-800">Image actuelle</span>
                        <div class="flex space-x-3 pt-1 pb-6">
                            <img id="imageProfile" :src="imageProfile" alt="Photo de profil" class="profile-img h-24 w-24 relative block mx-auto rounded-full border-solid border-main border-5">
                        </div>
                    </div>
                    <div class="flex w-full items-center justify-center bg-grey-lighter">
                        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-main hover:text-white">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-center leading-normal">Sélectionner une photo (max: 15mb)</span>
                            <input type='file' v-on:change="onFileChange" class="hidden" />
                        </label>
                    </div>
                </div>
                <div :class="['py-6 flex items-center justify-center text-xl text-bold hover:text-white rounded-b-xl', !selectedImage ? 'bg-gray-400 hover:bg-gray-600' : 'bg-white hover:bg-main']">
                    <button v-on:click="onUploadFile" :disabled="!selectedImage">Sauvegarder</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    export default {
        name: "modalUploadPicture",
        props: {
            imageProfile: String,
            user: Object
        },
        data () {
            return {
                selectedImage: "",
            }
        },
        methods: {
            closeModal() {
                this.$emit('close')
            },
            onFileChange(e) {
                const selectedFile = e.target.files[0]; // Accessing file
                this.selectedImage = selectedFile;
                // Create reader to make preview of picture
                let reader = new FileReader();
                reader.onload = function(){
                    let output = document.getElementById('imageProfile');
                    output.src = reader.result;
                };
                // Convert to base64 string
                reader.readAsDataURL(this.selectedImage);
            },
            onUploadFile() {
                const formData = new FormData();
                formData.append("image", this.selectedImage);  // Appending file
                // Sending file to the backend
                Vue.prototype.$http.put(process.env.VUE_APP_API_URL+'/api/users/upload/picture/'+this.user._id, formData)
                    .then(() => {
                        //Todo : Manage response
                        this.closeModal();
                    })
                    .catch(err => {
                        //Todo : Manage response
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