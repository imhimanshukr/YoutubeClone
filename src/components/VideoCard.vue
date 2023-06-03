<template>
    <v-card elevation="0" color="mainBg" :class="[{'mobile-mode' : isDetail}, {'showFirstVideo' : isDetailShow}]">
      <v-img
        class="rounded-lg img-width pointer" :class="[{'mobile-img' : isDetail}, {'showFirstimg' : isDetailShow}]"
        :src="video.thumbnails[video.thumbnails.length-1].url"
        :alt="video.title"
        cover
        @click="playVideo(video.videoId)"
        v-if="video.thumbnails && video.thumbnails.length > 0"
      >
        <span class="video-length">{{ formatVideoLength(video.lengthSeconds) }}</span>
      </v-img>
      <div class="mt-2">
        <div class="d-flex">
          <v-avatar v-if="video.author" class="h-9 w-9 rounded-full overflow-hidden pointer" size="36" @click="viewChannel(video.author.channelId, video.author.canonicalBaseUrl)">
            <v-img
              :src="video.author.avatar[0].url"
              :alt="video.author.title"
            />
          </v-avatar>
          <div class="ml-2">
            <p class="fs-16 mb-2" v-if="isDetailShow" @click="playVideo(video.videoId)">{{ video.title }}</p>
            <h3 v-else class="fs-14 break-spaces pointer" :class="$vuetify.theme.dark ? 'dark-theme-primarytext' : 'light-theme-primarytext'" @click="playVideo(video.videoId)">{{ video.title }}</h3>
            <div class="d-flex align-center" v-if="video.author">
              <p class="fs-14 mb-0 pointer" :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'" @click="viewChannel(video.author.channelId, video.author.canonicalBaseUrl)">{{ video.author.title }}</p>
              <v-icon v-if="video.author.badges.length > 0 ? video.author.badges[0].type === 'VERIFIED_CHANNEL' : false" class="fs-14 ml-1 pointer" :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'" @click="viewChannel(video.author.channelId, video.author.canonicalBaseUrl)">mdi-check-decagram</v-icon>
            </div>
            <div class="d-flex align-center pointer" @click="playVideo(video.videoId)">
              <p class="fs-14 mb-0" :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'">{{ formatCount(video.stats.views) }} views <span>.</span> {{ video.publishedTimeText }}</p>
            </div>
          </div>
        </div>
      </div>
    </v-card>
</template>

<script>
import moment from "moment";
export default {
  name: "VideoCard",
  props: {
    video: Object,
    isDetail: {
      type: Boolean,
      default: false,
    },
    isDetailShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatVideoLength(lengthSeconds) {
      if(lengthSeconds){

        const duration = moment.duration(lengthSeconds, "seconds");
        const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      if (hours && hours > 0) {
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      } else {
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      }
    }
    return ""
    },
    formatCount(count) {
      if(count){
        if (count >= 1000000) {
          return (count / 1000000).toFixed(1) + "M";
            } else if (count >= 1000) {
                return (count / 1000).toFixed(0) + "K";
            } else {
                return count.toString();
            }
        }
        return ""
        },
        playVideo(videoId){
            console.log("videoId: ", videoId);
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
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
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
.showFirstVideo {
  display: flex;
}
.showFirstimg{
  max-width: 400px;
}

@media screen and (max-width: 600px) {
    .img-width {
        max-width: 400px !important;
    }
    .mobile-img{
      max-width: 180px !important;
    }
    .mobile-mode{
      display: flex !important;
    }
    .showFirstVideo {
      display: block;
    }
}
@media screen and (max-width: 420px) {
    .img-width {
        max-width: 370px !important;
    }
    .mobile-img{
      max-width: 180px !important;
    }
}
@media screen and (max-width: 380px) {
    .img-width {
        max-width: 100% !important;
    }
    .mobile-img{
      max-width: 180px !important;
    }
}
@media screen and (max-width: 365px) {
    .img-width {
        max-width: 330px !important;
    }
    .mobile-img{
      max-width: 180px !important;
    }
}
@media screen and (max-width: 320px) {
    .img-width {
        max-width: 300px !important;
    }
    .mobile-img{
      max-width: 180px !important;
    }
}
</style>
