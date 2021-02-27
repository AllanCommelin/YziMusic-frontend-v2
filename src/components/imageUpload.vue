<template>
    <!-- POC-->
    <div>
        <span>Image upload</span>
        <input type="file" v-on:change="onFileChange">
        <button v-on:click="onUploadFile" :disabled="!selectedImage">Upload</button>
    </div>
</template>

<script>
import {mapState} from "vuex";
import Vue from "vue";

export default {
    name: "imageUpload",
    data () {
        return {
            selectedImage: "",
        }
    },
    computed: {
        ...mapState({
            authUser: state => state.User.user,
            is_login: state => state.User.is_login
        }),
    },
    methods: {
        onFileChange(e) {
            const selectedFile = e.target.files[0]; // accessing file
            this.selectedImage = selectedFile;
        },
        onUploadFile() {
            const formData = new FormData();
            formData.append("image", this.selectedImage);  // appending file

            // sending file to the backend
            Vue.prototype.$http.put('http://localhost:6985/api/users/upload/picture/'+this.authUser._id, formData)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}
</script>

<style scoped>

</style>