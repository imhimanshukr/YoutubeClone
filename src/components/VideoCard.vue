<template>
    <v-card :to="'/play-video/' + video.videoId" elevation="0" color="mainBg">
      <v-img
        class="rounded-lg img-width"
        :src="video.thumbnails[0].url"
        :alt="video.title"
        cover
      >
        <span class="video-length">{{ formatVideoLength(video.lengthSeconds) }}</span>
      </v-img>
      <div class="mt-2">
        <div class="d-flex">
          <v-avatar class="h-9 w-9 rounded-full overflow-hidden" size="36">
            <v-img
              :src="video.author.avatar[0].url"
              :alt="video.author.title"
            />
          </v-avatar>
          <div class="ml-2">
            <h3 class="fs-14 break-spaces" :class="$vuetify.theme.dark ? 'dark-theme-primarytext' : 'light-theme-primarytext'">{{ video.title }}</h3>
            <div class="d-flex align-center">
              <p class="fs-14 mb-0" :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'">{{ video.author.title }}</p>
              <v-icon v-if="video.author.badges.length > 0 ? video.author.badges[0].type === 'VERIFIED_CHANNEL' : false" class="fs-14 ml-1" :class="$vuetify.theme.dark ? 'dark-theme-secondarytext' : 'light-theme-secondarytext'">mdi-check-decagram</v-icon>
            </div>
            <div class="d-flex align-center">
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
@media screen and (max-width: 600px) {
    .img-width {
        max-width: 400px !important;
    }
}
@media screen and (max-width: 420px) {
    .img-width {
        max-width: 370px !important;
    }
}
@media screen and (max-width: 380px) {
    .img-width {
        max-width: 100% !important;
    }
}
@media screen and (max-width: 365px) {
    .img-width {
        max-width: 330px !important;
    }
}
@media screen and (max-width: 320px) {
    .img-width {
        max-width: 300px !important;
    }
}
</style>
