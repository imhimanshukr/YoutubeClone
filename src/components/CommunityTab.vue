<template>
    <v-sheet outlined class="pa-4 rounded-lg">
        <div class="d-flex">
            <v-avatar>
                <img :src="communityPost.post.author.avatar[communityPost.post.author.avatar.length - 1].url" alt="avatar">
            </v-avatar>
            <div class="ml-2">
                <p class="fs-12 mb-2">CodeWithHarry <span class="ml-3">{{
                    communityPost.post.publishedTimeText }}</span></p>
                <p class="fs-16 break-spaces mb-2">{{ communityPost.post.text }}</p>
                <div v-if="communityPost.post.attachment.video">
                    <v-img class="rounded-lg pointer mr-3"
                        :src="communityPost.post.attachment.video.thumbnails[communityPost.post.attachment.video.thumbnails.length - 1].url"
                        alt="thumbnail" max-width="220" @click="playVideo(communityPost.post.attachment.video.videoId)"
                        v-if="communityPost.post.attachment.type === 'video'">
                        <span class="video-length">{{ formatVideoLength(communityPost.post.attachment.video.lengthSeconds)
                        }}</span>
                    </v-img>
                    <div>
                        <p class="fs-16 break-spaces mb-1" v-if="communityPost.post.attachment.video">{{
                            communityPost.post.attachment.video.title }}</p>
                        <div class="d-flex align-center pointer">
                            <div class="d-flex">
                                <div class="d-flex align-center" v-if="communityPost.post.attachment.video.author">
                                    <p class="fs-12 mb-0 pointer"
                                        :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'"
                                        @click="viewChannel(communityPost.post.attachment.video.author.channelId, video.author.canonicalBaseUrl)">
                                        {{ communityPost.post.attachment.video.author.title }}</p>
                                    <v-icon
                                        v-if="communityPost.post.attachment.video.author.badges.length > 0 ? communityPost.post.attachment.video.author.badges[0].type === 'VERIFIED_CHANNEL' : false"
                                        class="fs-12 ml-1 pointer"
                                        :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'"
                                        @click="viewChannel(communityPost.post.attachment.video.author.channelId, communityPost.post.attachment.video.author.canonicalBaseUrl)">mdi-check-decagram</v-icon>
                                </div>
                            </div>
                            <p class="fs-12 mb-0 ml-2"
                                :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'">{{
                                    formatCount(communityPost.post.attachment.video.stats.views) }} views <span>.</span> {{
        communityPost.post.attachment.video.publishedTimeText }}</p>
                        </div>
                        <p class="fs-12 break-spaces mb-1" v-if="communityPost.post.attachment.video">{{
                            communityPost.post.attachment.video.descriptionSnippet.replace("\n", "") }}</p>

                    </div>
                </div>
                <div v-if="communityPost.post.attachment.images">
                    <v-carousel hide-delimiters>
                        <v-carousel-item
                            v-for="(item,i) in communityPost.post.attachment.images"
                            :key="i"
                            >
                            <v-img :src="item.source[item.source.length-1].url" alt="" aspect-ratio="1"></v-img>
                        </v-carousel-item>
                    </v-carousel>
                </div>
                <div class="d-flex">
                        <div class="d-flex align-center">
                            <v-btn icon>
                                <v-icon class="fs-20 pointer" link>mdi-thumb-up-outline</v-icon>
                                </v-btn>
                                <span class="ml-1 fs-14">{{
                                    formatCount(communityPost.post.stats.likes, false)
                                }}</span>
                            <v-btn icon>
                                <v-icon class="fs-20 pointer ml-2">mdi-thumb-down-outline</v-icon>
                                </v-btn>
                            </div>
                        <div class="d-flex align-center ml-2">
                            <v-btn icon>
                                <v-icon class="fs-20 pointer">mdi-comment-text-outline</v-icon>
                            </v-btn>
                            <span class="fs-14">{{
                                    formatCount(communityPost.post.stats.comments, false)
                                }}</span>
                        </div>
                </div>
            </div>
        </div>
    </v-sheet>
</template>

<script>
import moment from 'moment';
export default {
    data: () => ({
    }),
    props: ["communityPost"],
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
        playVideo(videoId) {
            console.log("videoId: ", videoId);
            this.$router.push({
                name: "videoPlayer",
                params: {
                    id: videoId,
                    videoId
                }
            })
        },
        viewChannel(channelId, baseUrl){
          this.$router.push({
            name: "channelDetails",
            params:{
              id: baseUrl.replace("/", ""),
              channelId
            }
          })
        }
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
::v-deep .v-image, ::v-deep .v-carousel{
    height: auto !important;
}
</style>