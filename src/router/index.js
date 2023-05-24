import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue";
import VideoPlayer from "../views/VideoPlayer.vue";
import SearchResult from "../views/SearchResult.vue";
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/search-result') {
    store.state.hideSidebar = false;
    store.state.drawer = true;
  } else {
    store.state.hideSidebar = true;
    store.state.drawer = true;
  }
  next();
});
export default router
