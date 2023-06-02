<template>
    <v-card elevation="0" class="mobile-sidebar" :class="{ 'mobile-sidebar-mode': $store.state.hideSidebar }">
        <v-navigation-drawer v-model="drawer" :mini-variant.sync="$store.state.drawer"
            :mini-variant-width="$store.state.hideSidebar || $vuetify.breakpoint.xs ? '0' : '72'" width="240" color="mainBg"
            permanent :floating="true">
            <v-list :class="$store.state.drawer ? 'pa-1' : 'pa-4'">
                <v-list-item v-for="item in $store.state.drawer ? itemsCategory.slice(0, 4) : itemsCategory"
                    :key="item.title" link :to="item.to" class="rounded-lg mb-2" :class="[
                        $store.state.drawer ? 'pa-0 text-center' : '',
                        $vuetify.theme.dark ? 'nav-link-dark' : 'nav-link-light',
                        currentQuery === item.name
                            ? $vuetify.theme.dark
                                ? 'dark-btn'
                                : 'light-btn'
                            : '',
                    ]" :style="$store.state.drawer
    ? 'min-height: 66px; background-color: transparent;'
    : 'min-height: 40px;'
    " @click="activeLink(item.name)">
                    <v-list-item-icon class="d-block mt-2 mb-0" :style="!$store.state.drawer ? 'margin-left: -5px' : ''">
                        <v-icon color="primaryText">{{ currentQuery === item.name ? item.icon2 : item.icon1 }}</v-icon>
                        <p class="ma-0 fs-10 text-center" v-if="$store.state.drawer">
                            {{ item.title }}
                        </p>
                    </v-list-item-icon>

                    <v-list-item-content style="margin-left: -18px;margin-top: 2px;">
                        <v-list-item-title class="fs-14">{{
                            item.title
                        }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider v-if="!$store.state.drawer"></v-divider>

            <v-list :class="$store.state.drawer ? 'pa-1' : 'pa-4'" v-if="!$store.state.drawer">
                <v-list-item v-for="item in itemsMenu" :key="item.title" link :to="item.to"
                    :active-class="$vuetify.theme.dark ? 'dark-btn' : 'light-btn'" class="rounded-lg" :class="[
                        $store.state.drawer ? 'pa-0 text-center' : '',
                        $vuetify.theme.dark ? 'nav-link-dark' : 'nav-link-light',
                    ]" :style="$store.state.drawer
    ? 'min-height: 66px; background-color: transparent;'
    : 'min-height: 40px;'
    " @click="activeLink(item.title)">
                    <v-list-item-icon class="d-block mt-2 mb-0" :style="!$store.state.drawer ? 'margin-left: -5px' : ''">
                        <v-icon color="primaryText" v-if="item.title === 'Logout'" @click="logout">{{ currentQuery ===
                            item.name ? item.icon2 : item.icon1 }}</v-icon>
                        <v-icon color="primaryText" v-else>{{ currentQuery === item.name ? item.icon2 : item.icon1
                        }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content style="margin-left: -18px;margin-top: 2px;">
                        <v-list-item-title class="fs-14" v-if="item.title === 'Logout'" @click="logout">{{
                            item.title
                        }}</v-list-item-title>
                        <v-list-item-title class="fs-14" v-else>{{
                            item.title
                        }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            drawer: true,
            itemsCategory: [
                { title: "Home", icon1: "mdi-home-outline", icon2: "mdi-home", name: "Trending", to: "/" },
                { title: "Shorts", icon1: "mdi-fire", icon2: "mdi-fire", name: "Shorts" },
                { title: "Music", icon1: "mdi-music-note-outline", icon2: "mdi-music-note", name: "Music" },
                { title: "Films", icon1: "mdi-movie-outline", icon2: "mdi-movie", name: "Films" },
                { title: "Live", icon1: "mdi-account-tie-voice-outline", icon2: "mdi-account-tie-voice", name: "Live" },
                { title: "Gaming", icon1: "mdi-gamepad-variant-outline", icon2: "mdi-gamepad-variant", name: "Gaming" },
                { title: "Sports", icon1: "mdi-trophy-outline", icon2: "mdi-trophy", name: "Sports" },
                { title: "Learning", icon1: "mdi-book-open-outline", icon2: "mdi-book-open", name: "Learning" },
                { title: "Fashion & beauty", icon1: "mdi-tshirt-crew-outline", icon2: "mdi-tshirt-crew", name: "Fashion & beauty" },
            ],
            itemsMenu: [
                { title: "Logout", icon1: "mdi-logout", icon2: "mdi-logout" },
                { title: "Settings", icon1: "mdi-cog-outline", icon2: "mdi-cog" },
                { title: "Report History", icon1: "mdi-clock-time-nine-outline", icon2: "mdi-clock-time-eight" },
                { title: "Help", icon1: "mdi-help-circle-outline", icon2: "mdi-help-circle", },
                { title: "Send feedback", icon1: "mdi-email-outline", icon2: "mdi-email" },
            ],
            currentQuery: "New",
        };
    },
    mounted() {
        this.fetchVideos(this.currentQuery);
        console.log("window.location.pathname: ", window.location.pathname);
    },
    methods: {
        ...mapActions(["fetchVideos"]),
        activeLink(title) {
            this.currentQuery = title;
            this.fetchYoutubeVideos(title);
        },
        fetchYoutubeVideos(query) {
            this.fetchVideos(query)
        },
        logout() {
            sessionStorage.clear();
            this.$router.push("/")
        }
    },
};
</script>

<style scoped>
::v-deep .v-list-item--link:before {
    background-color: transparent !important;
}

.nav-link-dark:hover {
    background-color: #272727 !important;
}

.nav-link-light:hover {
    background-color: #f2f2f2 !important;
}

::v-deep .v-navigation-drawer__content {
    height: calc(100vh - 65px) !important;
    overflow-x: hidden;
    overflow-y: hidden;
}

::v-deep .v-navigation-drawer__content:hover {
    overflow-y: auto;
}

::v-deep .v-navigation-drawer__content:hover::-webkit-scrollbar {
    width: 8px;
}

::v-deep .v-navigation-drawer__content::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
}

::v-deep .v-navigation-drawer__content::-webkit-scrollbar-thumb {
    background-color: #909090;
    border-radius: 4px;
}

.mobile-sidebar-mode {
    position: absolute;
    z-index: 99;
}

@media screen and (max-width: 600px) {
    .mobile-sidebar {
        position: absolute;
        z-index: 99;
    }
}</style>
