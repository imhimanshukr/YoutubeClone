import Vue from 'vue'
import Vuex from 'vuex'
import { fetchDataFromApi } from '@/api';
import data from "./dummy.JSON";

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    drawer: false,
    videos: [],
    feedTitle:[],
    videoDetail: null,
    relatedContent: [],
    hideSidebar: false,
    videoComments: [],
    autoCompleteData: [],
    selectedSearch:"",
    channelDetail: [],
    channelVideos: [],
    channelCommunity: [],
  },
  getters: {
  },
  mutations: {
    setVideos(state, videos) {
      state.videos = videos;
    },
    setFeedTitle(state, feedTitle) {
      state.feedTitle = feedTitle;
    },
    setVideoDetail(state, videoDetail) {
      state.videoDetail = videoDetail;
    },
    setRelatedContent(state, relatedContent) {
      state.relatedContent = relatedContent;
    },
    setVideoComment(state, videoComments) {
      state.videoComments = videoComments;
    },
    setAutoComplete(state, autoCompleteData) {
      state.autoCompleteData = autoCompleteData;
    },
    setSelectedSearch(state, value) {
      state.selectedSearch = value;
    },
    setChannelDetail(state, detail) {
      state.channelDetail = detail;
    },
    setChannelVideos(state, videos) {
      state.channelVideos = videos;
    },
    setChannelCommunity(state, communityPost) {
      state.channelCommunity = communityPost;
    },
  },
  actions: {
    async fetchVideoDetail({commit}, videoId) {
      console.log("VI: ", videoId);
      console.log("VI Detail: ", data.desc);
      const response = await fetchDataFromApi(`video/details/?id=${videoId}`);
      console.log("recommendationFeedTitle: ", response);
      commit("setVideoDetail", response);

      // commit("setVideoDetail", data.desc);
    },
    async fetchVideos({ commit }, query) {
      const response = await fetchDataFromApi(`search/?q=${query}`);
      console.log("videos: ", response.contents);
      const videos = response.contents.filter((item) => item.video && item.type === 'video').map((item) => {
        return{
          ...item, type: 'video', video: { ...item.video }
        }
      });
      console.log("123 videos: ", videos);
        commit("setVideos", videos);
      
      // console.log("videos list: ", data.videos);
      //   commit("setVideos", data.videos);
      //   commit("setFeedTitle", query);
    },
    async fetchRelatedVideos({commit}, videoId){
        const response = await fetchDataFromApi(`video/related-contents/?id=${videoId}`);
        const videos = response.contents.filter((item) => item.video && item.type === 'video').map((item) => {
          return{
            ...item, type: 'video', video: { ...item.video }
          }
        });
        commit("setRelatedContent", videos);
          console.log("related: ", videos);

      //   console.log("related: ", data.related, videoId);
      // commit("setRelatedContent", data.related);

    },
    async fetchVideoComment({commit}, videoId){
        const response = await fetchDataFromApi(`video/comments/?id=${videoId}`);
        commit("setVideoComment", response);
        console.log("data.commentData:", response);

        // console.log("data.commentData:", videoId, data.commentData);
        // commit("setVideoComment", data.commentData);
    },
    async fetchAutoCompleteSearch({commit}, query){
      let typingTimer = null;
      let typingDelay = 1000;

      clearTimeout(typingTimer);

      typingTimer = setTimeout(async () =>{
        const response = await fetchDataFromApi(`auto-complete/?q=${query}`);
        console.log("setAutoComplete: ", response);
        commit("setAutoComplete", response.results);

        // commit("setFeedTitle", query);
        // console.log("data.autoComplete: ", data.autoComplete);
        // commit("setAutoComplete", data.autoComplete);
      }, typingDelay)
    },
    async fetchChannelDetail({commit}, channelId){
      const response = await fetchDataFromApi(`channel/details/?id=${channelId}`);
      commit("setChannelDetail", response)
      console.log("setChannelDetail", response)

      // commit("setFeedTitle", channelId);
      // commit("setChannelDetail", data.channelDetail)
      // console.log("setChannelDetail", data.channelDetail)
    },
    async fetchChannelVideos({commit}, channelId){
      const response = await fetchDataFromApi(`channel/videos/?id=${channelId}`);
      commit("setChannelVideos", response.contents)
      console.log("setChannelVideos", response.contents)

      // commit("setFeedTitle", channelId);
      // commit("setChannelVideos", data.channelVideos)
      // console.log("setChannelVideos", data.channelVideos)
    },
    async fetchChannelCommunity({commit}, channelId){
      const response = await fetchDataFromApi(`channel/community/?id=${channelId}`);
      commit("setChannelCommunity", response.contents)
      console.log("setChannelCommunity", response.contents)

      // commit("setFeedTitle", channelId);
      // commit("setChannelCommunity", data.channelCommunity)
      // console.log("setChannelCommunity", data.channelCommunity)
    },
  },
})
