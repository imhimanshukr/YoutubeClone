<template>
    <div>

        <v-row class="mt-0 ml-0 ml-sm-3 mr-0 mr-xs-2 scroll-vertical-hide v-height" v-if="videoList.length > 0">
            <v-col cols="12" xl="3" lg="4" sm="6" class="pt-0" v-for="(item, index) in videoList" :key="index"  @click="$store.state.drawer = true;">
            <VideoCard :video="item.video"/>
        </v-col>
    </v-row>
    <v-row class="mt-0 ml-0 ml-sm-3 mr-0 mr-xs-2 scroll-vertical-hide v-height" v-else>
        <v-col cols="12" xl="3" lg="4" sm="6" class="pt-0" v-for="(item, index) in 16" :key="index"  @click="$store.state.drawer = true;">
            <v-card elevation="0" :color="`grey ${$vuetify.theme.dark ? 'darken-2' : 'lighten-4'}`">
      <v-skeleton-loader
          type="image, list-item-avatar-three-line"
        ></v-skeleton-loader>
    </v-card>

        </v-col>
    </v-row>
            </div>
</template>

<script>
import VideoCard from '@/components/VideoCard.vue';
import {mapActions} from "vuex";

export default {
    name: "homePage",
    mounted(){
        if(this.$store.state.videos.length === 0){
            this.fetchVideos("new");
        }
    },
    methods:{
    ...mapActions(["fetchVideos"]),
    },
    computed:{
        videoList(){
            return this.$store.state.videos;
        }
    },
    components:{
        VideoCard,
    }
}
</script>

<style scoped>
.v-height{
    height: calc(100vh - 64px);
}
</style>