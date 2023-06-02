<template>
    <div>
        <div class="d-flex mb-2" v-for="(item, index) in videoList" :key="index">
            <v-row>
                <v-col cols="5" class="pr-0"  @click="playVideo(item.video.videoId)">
                    <v-img class="rounded-lg img-width pointer" :src="item.video.thumbnails[0].url" :alt="item.video.title">
                        <span class="video-length">{{ formatVideoLength(item.video.lengthSeconds) }}</span>
                    </v-img>
                </v-col>
                <v-col cols="7" class="pl-0">
                    <div class="ml-2">
                        <h3 class="fs-14 break-spaces"
                            :class="$vuetify.theme.dark ? 'dark-theme-primarytext' : 'light-theme-primarytext'"  @click="playVideo(item.video.videoId)">{{textTruncate(item.video.title) }}
                        </h3>
                        <div class="d-flex align-center">
                            <p class="fs-12 mb-0"
                                :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'">{{
                                    item.video.author.title }}</p>
                            <v-icon
                                v-if="item.video.author.badges.length > 0 ? item.video.author.badges[0].type === 'VERIFIED_CHANNEL' : false"
                                class="fs-12 ml-1"
                                :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'">mdi-check-decagram</v-icon>
                        </div>
                        <div class="d-flex align-center">
                            <p class="fs-12 mb-0"
                                :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'"  @click="playVideo(item.video.videoId)">{{
                                    formatCount(item.video.stats.views) }} views <span>.</span> {{ item.video.publishedTimeText }}</p>
                        </div>
                    </div>
                </v-col>
            </v-row>
            </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
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
        textTruncate(text){
            if(text.length > 50){
                return text.slice(0, 47)+'...'
            }
            return text;
        },
        playVideo(videoId){
            console.log("videoId: ", videoId);
            console.log("window.location.pathname: ", window.location.pathname);
            window.location.pathname = `play-video/${videoId}`
            // console.log("wwww: ", window.location.pathname.split("/"));
            // this.$router.push({
            //     name: "videoPlayer",
            //     params:{
            //         id: videoId
            //     }
            // })
        }
    },
    computed: {
        videoList() {
            console.log("this.$store.state.relatedContent: ", this.$store.state.relatedContent);
            return this.$store.state.relatedContent;
        }
    },
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
}</style>