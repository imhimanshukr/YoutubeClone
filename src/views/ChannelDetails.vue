<template>
    <div class="channelDetail scroll-vertical-hide">
        <v-row>
            <v-col cols="12">
                <!-- Banner Part -->
                <img :src="channelDetail.banner.desktop[0].url" width="100%" />
                <div>
                    <div
                        class="d-flex flex-column flex-sm-row justify-center justify-sm-space-between mt-4 align-center px-lg-16">
                        <div class="d-flex flex-column flex-sm-row align-center">
                            <v-avatar :size="$vuetify.breakpoint.xs ? '55' : '128'" color="mainBg">
                                <img :src="channelDetail.avatar[2].url" alt="">
                            </v-avatar>
                            <div class="ml-sm-5">
                                <!-- <div class="d-flex align-center"> -->
                                <p class="fs-24 mb-0"
                                    :class="[{ 'fw-700 text-center break-spaces': $vuetify.breakpoint.xs }, $vuetify.theme.dark ? 'white--text' : 'black--text']">
                                    {{ channelDetail.title }}
                                    <v-icon
                                        v-if="channelDetail.badges.length > 0 ? channelDetail.badges[0].type === 'VERIFIED_CHANNEL' : false"
                                        class="fsn-14 ml-1"
                                        :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'">mdi-check-decagram</v-icon>
                                </p>
                                <!-- </div> -->
                                <p class="fs-14" :class="[$vuetify.theme.dark
                                    ? 'dark-theme-secondarytext'
                                    : 'light-theme-secondarytext', { 'text-center break-spaces': $vuetify.breakpoint.xs }
                                ]"> <span class="fw-600 mr-1">{{ channelDetail.username }}</span> <span class="mr-1">{{
    channelDetail.stats.subscribersText }}</span> <span>{{
        channelDetail.stats.videosText }}</span></p>
                            </div>
                        </div>
                        <v-btn :max-width="$vuetify.breakpoint.xs ? '370' : '105'" max-height="36" width="100%"
                            class="fs-12 rounded-xl text-capitalliz" elevation="0"
                            :class="$vuetify.theme.dark ? 'black--text' : 'white--text'"
                            :color="$vuetify.theme.dark ? '#f2f2f2' : '#252525'" @click="isSubscribe = !isSubscribe">{{ isSubscribe ? 'Subscribeed' : 'Subscribe'}}</v-btn>
                    </div>

                    <!-- Tabs -->
                    <v-card color="mainBg" elevation="0" class="ml-lg-6">
                        <v-tabs v-model="tab" class="channel px-lg-15"
                            :show-arrows="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs ? true : false"
                            :slider-color="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'"
                            :color="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'"
                            slider-size="3" background-color="mainBg" center-active elevation="0">
                            <v-tab v-for="item in items" :key="item.tab" class="fs-14 mr-sm-12">
                                {{ item.tab }}
                            </v-tab>
                        </v-tabs>
                        <v-tabs-slider color="green"></v-tabs-slider>
                        <v-divider></v-divider>
                        
                        <v-tabs-items v-model="tab" class="mx-lg-16 mx-2">
                            <v-tab-item v-for="item in items" :key="item.tab">
                                <v-card color="mainBg" elevation="0">
                                    <h1>{{ item.content }}</h1>
                                    <!-- Home tab -->
                                    <div v-show="item.tab === 'Home'" class="pt-7">
                                        <v-row class="mb-5 scroll-vertical-hide v-height" v-if="channelVideos.length > 1">
                                            <v-col class="py-sm-0 py-1" cols="12" v-for="(item, index) in channelVideos.slice(0, 1)"
                                            :key="index">
                                            <VideoCard :video="item.video" :isDetailShow=true />
                                        </v-col>
                                    </v-row>
                                        <v-divider></v-divider>
                                        <p class="fs-16 pt-3 fw-600">Videos</p>
                                        <v-row class="mt-0 ml-0 ml-sm-3 mr-0 mr-xs-2 scroll-vertical-hide v-height" v-if="channelVideos.length > 1">
                                            <v-col class="py-sm-2 py-1" cols="12" md="3" sm="6" v-for="(item, index) in channelVideos.slice(1, channelVideos.length - 1)"
                                            :key="index">
                                            <VideoCard :video="item.video" :isDetail=true />
                                        </v-col>
                                    </v-row>
                                <p class="fsn-16 text-center my-16" v-else>This channel has not any video.</p>
                                </div>
                                    <!-- Videos tab -->
                                    <div v-show="item.tab === 'Videos'" class="pt-4">
                                        <v-row class="mt-0 ml-0 ml-sm-3 mr-0 mr-xs-2 scroll-vertical-hide v-height" v-if="channelVideos.length > 0">
                                            <v-col class="py-sm-0 py-1" cols="12" md="3" sm="6" v-for="(item, index) in channelVideos"
                                            :key="index">
                                            <VideoCard :video="item.video" :isDetail=true />
                                        </v-col>
                                    </v-row>
                                <p class="fsn-16 text-center my-16" v-else>This channel has not any video.</p>
                                </div>
                                <!-- Playlist tab -->
                                <p class="fsn-16 text-center my-16" v-show="item.tab === 'Playlist'">Sorry, playlist details are not available.</p>
                                <!-- Community tab -->
                                <div v-show="item.tab === 'Community'" class="pt-4">
                                <v-row v-if="communityPost.length > 0">
                                    <v-col cols="12" v-for="(post, index) in communityPost" :key="index">
                                        <CommunityTab :communityPost="post"/>
                                    </v-col>
                                </v-row>
                                <p class="fsn-16 text-center my-16" v-else>This channel has not any post.</p>
                            </div>
                            <!-- Channel Details -->
                            <div v-show="item.tab === 'Channels'">
                                <p class="fsn-16 text-center my-16">Sorry, channel details are not available right now.</p>
                            </div>
                            <!-- About -->
                            <div v-show="item.tab === 'About'">
                                <p class="fsn-16 text-center my-16" v-if="!channelDetail">Unable to fetch data.</p>
                                <AboutTab v-else :about="channelDetail" />
                            </div>
                            </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import AboutTab from '@/components/AboutTab.vue';
import VideoCard from '@/components/VideoCard.vue';
import CommunityTab from '@/components/CommunityTab.vue';

export default {
    data() {
        return {
            channelId: null,
            tab: null,
            isSubscribe: false,
            items: [
                { tab: 'Home'},
                { tab: 'Videos'},
                { tab: 'Playlist'},
                { tab: 'Community'},
                { tab: 'Channels'},
                { tab: 'About'},
            ],

        }
    },
    mounted() {
        this.channelId = this.$route.params.channelId;
        if (this.channelId) {
            sessionStorage.setItem("channelId", this.channelId)
        } else {
            this.channelId = sessionStorage.getItem("channelId");
        }
        console.log("this.channelId: ", this.channelId);
        // this.fetchChannelDetail(this.channelId);
        // this.fetchChannelVideos(this.channelId);
        // this.fetchChannelCommunity(this.channelId);
        this.loadData();
    },
    methods: {
        ...mapActions(["fetchChannelDetail", "fetchChannelVideos", "fetchChannelCommunity"]),
        async loadData() {
        try {
            await this.fetchChannelDetail(this.channelId);
            await this.fetchChannelVideos(this.channelId);
            await this.fetchChannelCommunity(this.channelId);
        } catch (error) {
        // Handle error if necessary
        console.error(error);
        }
    },
    },
    computed: {
        channelDetail() {
            console.log("this.$store.state.channelDetail: ", this.$store.state.channelDetail);
            return this.$store.state.channelDetail;
        },
        channelVideos(){
            console.log("this.$store.state.channelDetail: ", this.$store.state.channelVideos);
            return this.$store.state.channelVideos;
        },
        communityPost(){
            console.log("this.$store.state.channelCommunity: ", this.$store.state.channelCommunity);
            return this.$store.state.channelCommunity;
        }
    },
    components: {
        AboutTab,
        VideoCard,
        CommunityTab
    }
}
</script>

<style scoped>
.channelDetail {
    height: calc(100vh - 74px);
}

::v-deep .channel.v-tabs {
    max-width: 100vw;
}
::v-deep .theme--light.v-tabs .v-tab--active:focus:before, ::v-deep .theme--light.v-tabs .v-tab:focus:before, ::v-deep .theme--light.v-tabs .v-tab:hover:before {
    opacity: 0 !important;
}
</style>