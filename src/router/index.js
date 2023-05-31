import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue";
import VideoPlayer from "../views/VideoPlayer.vue";
import SearchResult from "../views/SearchResult.vue";
import ChannelDetails from "../views/ChannelDetails.vue";
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name: "homePage",
    component: Home
  },
  {
    path: "/play-video/:id",
    name: "videoPlayer",
    component: VideoPlayer
  },
  {
    path: "/search-result",
    name: "searchResult",
    component: SearchResult
  },
  {
    path: "/channel/:id",
    name: "channelDetails",
    component: ChannelDetails
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log("to.path: ", to.path);
  if(to.path.includes('play-video')){
    store.state.hideSidebar = true;
    store.state.drawer = true;
  }else if (window.screen.width > 600) {
    store.state.hideSidebar = false;
    store.state.drawer = false;
  } else {
    store.state.hideSidebar = true;
    store.state.drawer = true;
  }
  // if (to.path === '/' || to.path === '/search-result' || to.path.includes('channel')) {
  //   store.state.hideSidebar = false;
  //   store.state.drawer = false;
  // } else {
  //   store.state.hideSidebar = true;
  //   store.state.drawer = true;
  // }
  next();
});
export default router
