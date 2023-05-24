import Vue from 'vue'
import Vuex from 'vuex'
// import { fetchDataFromApi } from '@/api';
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
  },
  actions: {
    async fetchVideoDetail({commit}, videoId) {
      console.log("VI: ", videoId);
      console.log("VI Detail: ", data.desc);
      // const response = await fetchDataFromApi(`video/details/?id=${videoId}`);
      // console.log("recommendationFeedTitle: ", response);
      commit("setVideoDetail", data.desc);
    },
    async fetchVideos({ commit }, query) {
    //   const response = await fetchDataFromApi(`search/?q=${query}`);
      // console.log("videos: ", response.contents);
    console.log("videos list: ", data.videos);
      commit("setFeedTitle", query);
      commit("setVideos", data.videos);
    },
    async fetchRelatedVideos({commit}, videoId){
        // const response = await fetchDataFromApi(`video/related-contents/?id=${videoId}`);
        // commit("setRelatedContent", response.contents);
        console.log("related: ", data.related, videoId);
      commit("setRelatedContent", data.related);

    },
    async fetchVideoComment({commit}, videoId){
        // const response = await fetchDataFromApi(`video/comments/?id=${videoId}`);
        // commit("setVideoComment", response);
        console.log("data.commentData:", videoId, data.commentData);
        commit("setVideoComment", data.commentData);
    },
    async fetchAutoCompleteSearch({commit}, query){
      let typingTimer = null;
      let typingDelay = 1000;

      clearTimeout(typingTimer);

      typingTimer = setTimeout(async () =>{
        // const response = await fetchDataFromApi(`auto-complete/?q=${query}`);
        // console.log("response: ", response);
        // commit("setAutoComplete", response.results);
        commit("setFeedTitle", query);
        console.log("data.autoComplete: ", data.autoComplete);
        commit("setAutoComplete", data.autoComplete);
      }, typingDelay)
    }
  },
})
