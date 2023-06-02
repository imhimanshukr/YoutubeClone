<template>
    <div class="login">
        <div class="d-flex flex-column align-center justify-center" style="height: 90%">
            <img src="../assets/login.png" alt="" class="logo">
            <v-btn rounded color="white" outlined class="youtube-btn fs-16" @click="login">Get Started</v-btn>
        </div>
        <p class="fs-16 white--text text-center">Developed with<v-icon color="white">mdi-heart-outline</v-icon> by Himanshu </p>
    </div>
</template>

<script>
    export default {
        name: "loginPage",
        methods:{
            login(){
                sessionStorage.setItem("youtube-loggeedin", true)
                this.$router.push("/home")
            }
        }
    }
</script>

<style scoped>
    .login {
        background-color: #FB000F;
        height: 100vh;
    }
    .youtube-btn{
        max-width: 270px;
    width: 100%;
    font-weight: bold !important;
    border: 2px solid #fff;
    }

    @media screen and (max-width: 600px) {
        .logo{
            max-width: 230px;
        }
    .youtube-btn{
max-width: 190px;
    }
}
</style>