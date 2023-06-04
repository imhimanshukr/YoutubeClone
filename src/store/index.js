import Vue from "vue";
import Vuex from "vuex";
import { fetchDataFromApi } from "@/api";
import data from "./dummy.JSON";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    drawer: false,
    videos: [],
    feedTitle: [],
    videoDetail: null,
    relatedContent: [],
    hideSidebar: false,
    videoComments: [],
    autoCompleteData: [],
    selectedSearch: "",
    channelDetail: [],
    channelVideos: [],
    channelCommunity: [],
    respMessage: null,
  },
  getters: {},
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
    setMessage(state, msg) {
      state.respMessage = msg;
    },
  },
  actions: {
    async fetchVideoDetail({ commit }, videoId) {
      try {
        console.log("VI: ", videoId);
        console.log("VI Detail: ", data.desc);
        const response = await fetchDataFromApi(`video/details/?id=${videoId}`);
        console.log("recommendationFeedTitle: ", response);
        commit("setVideoDetail", response);

        // commit("setVideoDetail", data.desc);
      } catch (err) {
        console.log("err: ", err.response.data.message);
        commit("setMessage", err.response.data.message);
      }
    },
    async fetchVideos({ commit }, query) {
      try {
        const response = await fetchDataFromApi(`search/?q=${query}`);
        console.log("videos: ", response.contents);
        const videos = response.contents
          .filter((item) => item.video && item.type === "video")
          .map((item) => {
            return {
              ...item,
              type: "video",
              video: { ...item.video },
            };
          });
        console.log("123 videos: ", videos);
        commit("setVideos", videos);

        // console.log("videos list: ", data.videos);
        //   commit("setVideos", data.videos);
        //   commit("setFeedTitle", query);
      } catch (err) {
        console.log("err: ", err.response.data.message);
        commit("setMessage", err.response.data.message);
      }
    },
    async fetchRelatedVideos({ commit }, videoId) {
      try {
        const response = await fetchDataFromApi(
          `video/related-contents/?id=${videoId}`
        );
        const videos = response.contents
          .filter((item) => item.video && item.type === "video")
          .map((item) => {
            return {
              ...item,
              type: "video",
              video: { ...item.video },
            };
          });
        commit("setRelatedContent", videos);
        console.log("related: ", videos);

        //   console.log("related: ", data.related, videoId);
        // commit("setRelatedContent", data.related);
      } catch (err) {
        console.log("err: ", err.response.data.message);
        commit("setMessage", err.response.data.message);
      }
    },
    async fetchVideoComment({ commit }, videoId) {
      try {
        const response = await fetchDataFromApi(
          `video/comments/?id=${videoId}`
        );
        commit("setVideoComment", response);
        console.log("data.commentData:", response);

        // console.log("data.commentData:", videoId, data.commentData);
        // commit("setVideoComment", data.commentData);
      } catch (err) {
        console.log("err: ", err.response.data.message);
        commit("setMessage", err.response.data.message);
      }
    },
    async fetchAutoCompleteSearch({ commit }, query) {
        try {
          const response = await fetchDataFromApi(`auto-complete/?q=${query}`);
          console.log("setAutoComplete: ", response);
          commit("setAutoComplete", response.results);

          // commit("setFeedTitle", query);
          // console.log("data.autoComplete: ", data.autoComplete);
          // commit("setAutoComplete", data.autoComplete);
        } catch (err) {
          console.log("err: ", err.response.data.message);
          commit("setMessage", err.response.data.message);
        }
    },
    async fetchChannelDetail({ commit }, channelId) {
      try {
        const response = await fetchDataFromApi(
          `channel/details/?id=${channelId}`
        );
        commit("setChannelDetail", response);
        console.log("setChannelDetail", response);

        // commit("setFeedTitle", channelId);
        // commit("setChannelDetail", data.channelDetail)
        // console.log("setChannelDetail", data.channelDetail)
      } catch (err) {
        console.log("err: ", err.response.data.message);
        commit("setMessage", err.response.data.message);
      }
    },
    async fetchChannelVideos({ commit }, channelId) {
      try {
        const response = await fetchDataFromApi(
          `channel/videos/?id=${channelId}`
        );
        commit("setChannelVideos", response.contents);
        console.log("setChannelVideos", response.contents);

        // commit("setFeedTitle", channelId);
        // commit("setChannelVideos", data.channelVideos)
        // console.log("setChannelVideos", data.channelVideos)
      } catch (err) {
        console.log("err: ", err.response.data.message);
        commit("setMessage", err.response.data.message);
      }
    },
    async fetchChannelCommunity({ commit }, channelId) {
      try {
        const response = await fetchDataFromApi(
          `channel/community/?id=${channelId}`
        );
        commit("setChannelCommunity", response.contents);
        console.log("setChannelCommunity", response.contents);

        // commit("setFeedTitle", channelId);
        // commit("setChannelCommunity", data.channelCommunity)
        // console.log("setChannelCommunity", data.channelCommunity)
      } catch (err) {
        console.log("err: ", err.response.data.message);
        commit("setMessage", err.response.data.message);
      }
    },
  },
});
