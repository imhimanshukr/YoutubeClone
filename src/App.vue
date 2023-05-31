<template>
  <v-app>
    <Navbar/>
    <div class="d-flex">
      <Sidebar/>
      <v-row :class="$vuetify.theme.dark ? 'dark-bg' : 'light-bg'">
        <v-col cols="12">
          <v-main class="main-container" :class="$vuetify.theme.dark ? 'dark-theme' : 'light-theme'">
            <router-view/>
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
  components:{
    Navbar,
    Sidebar,
  }
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
