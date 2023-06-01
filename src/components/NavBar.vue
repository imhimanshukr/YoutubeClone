<template>
  <div>
    <v-app-bar color="mainBg" elevation="0" class="navbar mb-sm-0 mb-1">
      <v-icon class="fsn-26 pointer ml-0 ml-sm-2 mr-sm-5" color="primaryText"
        @click.stop="$store.state.drawer = !$store.state.drawer">mdi-menu</v-icon>

      <img width="90px" class="pointer" src="../assets/dark-logo.png" alt="logo"
        v-if="$vuetify.theme.dark && !$vuetify.breakpoint.xs" @click="goToHome" />
      <img width="90px" class="pointer" src="../assets/light-logo.png" alt="logo"
        v-if="!$vuetify.theme.dark && !$vuetify.breakpoint.xs" @click="goToHome" />
      <img src="../assets/youtube-logo.png" width="40px" class="mx-3" alt="logo" v-if="$vuetify.breakpoint.xs"
        @click="goToHome">
      <v-spacer></v-spacer>

      <v-autocomplete :items="$store.state.autoCompleteData" :search-input.sync="search" clearable dense
        :outlined="!$vuetify.breakpoint.xs" rounded hide-details hide-no-data hide-selected
        :filled="$vuetify.breakpoint.xs" placeholder="Search" @change="selectSearchItem">
        <template #append>
          <v-icon class="no-rotate pointer" @click="handleSearch"> mdi-magnify </v-icon>
        </template>
      </v-autocomplete>

      <v-spacer></v-spacer>
      <v-btn icon v-if="!$vuetify.breakpoint.xs">
        <v-icon>{{
          $vuetify.theme.dark ? "mdi-video-plus" : "mdi-video-plus-outline"
        }}</v-icon>
      </v-btn>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark" v-if="!$vuetify.breakpoint.xs">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>

      <v-menu left :offset-x=true :offset-y=true max-width="300">
        <template v-slot:activator="{ on, attrs }">
            <v-avatar size="35" v-bind="attrs" v-on="on"><img
                src="https://lh3.googleusercontent.com/a/AGNmyxZ7qhL59QyDyrMQnr4OloKhOWgpWNeNXk3p1Y3Z"
                alt="" /></v-avatar>
        </template>

        <v-list dense>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://lh3.googleusercontent.com/a/AGNmyxZ7qhL59QyDyrMQnr4OloKhOWgpWNeNXk3p1Y3Z"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <span class="fw-400">
                  Himanshu Kumar
                </span>
              </v-list-item-title>
              <v-list-item-title>
                <span class="fw-400">
                himanshu@gmail.com
              </span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            active-class="active-link"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" v-if="!item.text === 'Appearance'"></v-icon>
              <v-icon v-text="item.icon" v-else @click="$vuetify.theme.dark = !$vuetify.theme.dark"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-if="item.text === 'Appearance'" @click="$vuetify.theme.dark = !$vuetify.theme.dark"><span class="fw-400">{{ item.text }} : {{ $vuetify.theme.dark ? ' Dark' : ' Light' }}</span></v-list-item-title>
              <v-list-item-title v-else><span class="fw-400">{{ item.text }}</span></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      search: "",
      searchInput: "",
      items: [
        { text: 'Appearance', icon: 'mdi-theme-light-dark' },
        { text: 'Location: India', icon: 'mdi-web' },
        { text: 'Language: British English', icon: 'mdi-translate' },
        { text: 'Setting', icon: 'mdi-cog-outline' },
        { text: 'Help', icon: 'mdi-help-circle-outline' },
        { text: 'Send Feedback', icon: 'mdi-message-alert' },
      ],
    };
  },
  methods: {
    ...mapActions(["fetchAutoCompleteSearch", "fetchVideos"]),
    selectSearchItem(event) {
      console.log("eve: ", event);
      this.fetchVideos(event);
      if (window.location.pathname !== "/search-result") {
        this.$router.replace({
          name: "searchResult",
          params: {
            query: event,
          }
        })
      } else {
        sessionStorage.setItem("searchQuery", this.searchQuery)
      }
    },
    handleSearch() {
      console.log("eve: ", this.searchInput);
      this.fetchVideos(this.searchInput);
      if (window.location.pathname !== "/search-result") {
        this.$router.replace({
          name: "searchResult",
          params: {
            query: this.searchInput,
          }
        })
      } else {
        sessionStorage.setItem("searchQuery", this.searchInput)
      }
    },
    goToHome() {
      this.$router.push("/")
    }
  },
  watch: {
    search(query) {
      this.searchInput = query;
      console.log("query: ", query);
      if (query?.length > 3) {
        this.fetchAutoCompleteSearch(query);
        console.log("$store.state.autoCompleteData: ", this.$store.state.autoCompleteData);
      }
    },
  },
};
</script>

<style scoped>
.no-rotate {
  transform: none !important;
}

::v-deep .v-list-item__title {
  font-size: 1.6rem !important;
  line-height: 2rem !important;
}

::v-deep .v-menu__content::-webkit-scrollbar {
  width: 0px !important;
}

::v-deep .v-autocomplete__content.v-menu__content {
  border-radius: 30px !important;
}

::v-deep .v-menu__content {
  top: 62px !important;
  left: 1213px !important;
}
.active-link {
  background-color: transparent !important;
}
</style>
