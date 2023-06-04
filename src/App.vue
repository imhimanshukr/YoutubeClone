<template>
  <v-app>
    <Navbar v-if="isLoggedIn"/>
    <div class="d-flex">
      <Sidebar v-if="isLoggedIn"/>
      <v-row :class="$vuetify.theme.dark ? 'dark-bg' : 'light-bg'">
        <v-col cols="12">
          <v-main class="main-container" :class="$vuetify.theme.dark ? 'dark-theme' : 'light-theme'">
            <p class="red--text text-center" style="font-size: 25px;" v-if="respMessage && respMessage.includes('You have exceeded the')">{{ respMessage }}</p>
            <router-view v-else/>
          </v-main>
        </v-col>
      </v-row>
      </div>
  </v-app>
</template>

<script>
import Navbar from "../src/components/NavBar.vue"
import Sidebar from "../src/components/SideBar.vue"

export default {
  name: 'App',

  data: () => ({
    darkMode: false,
    windowUrl: "",
  }),
  methods: {
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },
  computed:{
		isLoggedIn(){
      const loggedIn = sessionStorage.getItem("youtube-loggeedin");
			if (!loggedIn && this.$route.path !== '/') {
			this.$router.replace("/")
			} else if (loggedIn && this.$route.path === '/') {
			this.$router.replace("/home")
			}
			return loggedIn;
		},
    respMessage(){
      return this.$store.state.respMessage;
    }
},
  components:{
    Navbar,
    Sidebar,
  },
  
};
</script>

<style scoped>
.dark-theme{
  background-color: #0F0F0F;
}
.light-theme{
  background-color: #fff;
}

</style>
