<template>
    <div>
    <div class="scroll-vertical-hide v-height" v-if="videoList.length > 0">
        <div class="d-flex mb-3 ml-2 ml-md-4" v-for="(item, index) in videoList" :key="index">
            <v-row v-if="!$vuetify.breakpoint.xs">
                <v-col cols="4" @click="playVideo(item.video.videoId)" v-if="item.video.thumbnails">
                    <v-img class="rounded-lg pointer" :src="item.video.thumbnails[0].url" :alt="item.video.title">
                        <span class="video-length">{{ formatVideoLength(item.video.lengthSeconds) }}</span>
                    </v-img>
                </v-col>
                <v-col cols="7" class="pl-0">
                    <div class="ml-2">
                        <p class="fs-18 mb-0 break-spaces pointer"
                            :class="$vuetify.theme.dark ? 'dark-theme-primarytext' : 'light-theme-primarytext'"
                            @click="playVideo(item.video.videoId)">
                            {{ item.video.title }}
                        </p>
                        <div class="d-flex align-center">
                            <p class="fs-12 mb-0 pointer"
                                :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'"
                                @click="playVideo(item.video.videoId)">{{
                                    formatCount(item.video.stats.views) }} views <span>.</span> {{ item.video.publishedTimeText
    }}</p>
                        </div>
                        <div class="d-flex align-center mt-2">
                            <v-avatar class="h-9 w-9 rounded-full mr-2 overflow-hidden pointer" size="25" @click="viewChannel(item.video.author.channelId, item.video.author.canonicalBaseUrl)">
                                <v-img :src="item.video.author.avatar[0].url" :alt="item.video.author.title" />
                            </v-avatar>
                            <p class="fs-12 mb-0 pointer"
                                :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'" @click="viewChannel(item.video.author.channelId, item.video.author.canonicalBaseUrl)">{{
                                    item.video.author.title }}</p>
                            <v-icon
                                v-if="item.video.author.badges.length > 0 ? item.video.author.badges[0].type === 'VERIFIED_CHANNEL' : false"
                                class="fs-12 ml-1 pointer"
                                :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'" @click="viewChannel(item.video.author.channelId, item.video.author.canonicalBaseUrl)">mdi-check-decagram</v-icon>
                        </div>
                        <p class="fs-12 mb-0 pointer" @click="playVideo(item.video.videoId)">{{
                            item.video.descriptionSnippet }}</p>
                    </div>
                </v-col>
            </v-row>
            <!-- Mobile screen -->
            <v-row v-else>
                <v-col cols="12">
                    <VideoCard :video="item.video" />
                </v-col>
            </v-row>
        </div>
    </div>
    <div v-else>
        <div v-for="item in 10" :key="item">
            <v-row>
                <v-col cols="4">
                    <v-skeleton-loader
                    type="image"
                    ></v-skeleton-loader>
                </v-col>
                <v-col cols="8">
                    <v-skeleton-loader
                    type="list-item-avatar-three-line"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
        </div>    </div>
</div>
</template>

<script>
import moment from "moment";
import VideoCard from "@/components/VideoCard.vue";

export default {
    data: () => ({
        searchQuery: ""
    }),
    mounted() {
        this.searchQuery = this.$route.params.query;
        if (this.searchQuery) {
            sessionStorage.setItem("searchQuery", this.searchQuery)
        } else {
            this.searchQuery = sessionStorage.getItem("searchQuery");
        }
        console.log("this.searchQuery: ", this.searchQuery);
    },
    methods: {
        formatVideoLength(lengthSeconds) {
            const duration = moment.duration(lengthSeconds, "seconds");
            const hours = Math.floor(duration.asHours());
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            if (hours > 0) {
                return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            } else {
                return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            }
        },
        formatCount(count) {
            if (count >= 1000000) {
                return (count / 1000000).toFixed(1) + "M";
            } else if (count >= 1000) {
                return (count / 1000).toFixed(0) + "K";
            } else {
                return count.toString();
            }
        },
        playVideo(videoId){
            this.$router.push({
                name: "videoPlayer",
                params:{
                    id: videoId,
                    videoId
                }
            })
        },
        viewChannel(channelId, baseUrl){
          console.log("baseUrl: ", baseUrl);
          this.$router.push({
            name: "channelDetails",
            params:{
              id: baseUrl.replace("/", ""),
              channelId
            }
          })
        }
    },
    computed: {
        videoList() {
            console.log("this.$store.state.videos: ", this.$store.state.videos);
            return this.$store.state.videos;
        }
    },
    components: {
        VideoCard,
    }
}
</script>

<style scoped>
.video-length {
    right: 1rem;
    position: absolute;
    bottom: 1rem;
    color: white;
    background: black;
    padding: 0 .5rem;
    font-size: 1.2rem;
    border-radius: .5rem;
}

.v-height {
    height: calc(100vh - 74px);
}</style>