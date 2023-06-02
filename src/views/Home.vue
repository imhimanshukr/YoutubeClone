<template>
    <v-row class="mt-0 ml-0 ml-sm-3 mr-0 mr-xs-2 scroll-vertical-hide v-height">
        <v-col cols="12" xl="3" lg="4" sm="6" class="pt-0" v-for="(item, index) in videoList" :key="index"  @click="$store.state.drawer = true;">
            <VideoCard :video="item.video"/>
        </v-col>
    </v-row>
</template>

<script>
import VideoCard from '@/components/VideoCard.vue';

export default {
    name: "homePage",
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