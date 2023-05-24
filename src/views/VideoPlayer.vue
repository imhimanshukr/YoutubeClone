<template>
    <div class="video-player scroll-vertical-hide v-height">
        <v-row>
            <v-col cols="12" md="8">
                <LazyYoutube :src="`https://www.youtube.com/watch?v=${videoId}`" max-width="2000px" autoplay
                    aspect-ratio="16:9" thumbnail-quality="standard" />
                <h2 class="fs-20 break-spaces" :class="$vuetify.theme.dark
                    ? 'dark-theme-primarytext'
                    : 'light-theme-primarytext'
                    ">
                    {{ videoDetail.title }}
                </h2>
                <div class="d-flex flex-wrap mt-3 justify-space-between">
                    <div class="d-flex align-center justify-space-between head-w-100">
                        <div class="d-flex align-center">
                            <v-avatar class="h-9 w-9 rounded-full overflow-hidden mr-3" size="40">
                                <v-img :src="videoDetail.author.avatar[0].url" :alt="videoDetail.author.title" />
                            </v-avatar>
                            <div class="">
                                <p class="fs-14 mb-0 nowrap fw-600" :class="$vuetify.theme.dark
                                    ? 'dark-theme-primarytext'
                                    : 'light-theme-primarytext'
                                    ">
                                    {{ videoDetail.author.title }}
                                    <v-icon v-if="videoDetail.author.badges.length > 0
                                        ? videoDetail.author.badges[0].type ===
                                        'VERIFIED_CHANNEL'
                                        : false
                                        " class="fs-14 ml-1" :class="$vuetify.theme.dark
        ? 'dark-theme-secondarytext'
        : 'light-theme-secondarytext'
        ">mdi-check-decagram</v-icon>
                                </p>
                                <p class="fs-12 mb-0 nowrap">
                                    {{ videoDetail.author.stats.subscribersText }}
                                </p>
                            </div>
                        </div>
                        <v-btn max-width="9.5rem" max-height="3.6rem" class="ml-6 fs-12 rounded-xl text-capitalliz"
                            elevation="0" :class="$vuetify.theme.dark ? 'black--text' : 'white--text'" :color="$vuetify.theme.dark ? '#f2f2f2' : '#252525'">Subscribe</v-btn>
                    </div>
                    <div class="d-flex align-center head-w-100 justify-space-between">
                        <v-btn-toggle v-model="toggle_exclusive" rounded :outlined="true">
                            <v-btn max-height="3.6rem" class="like-btn" color="btnBg">
                                <v-icon class="fs-20">mdi-thumb-up-outline</v-icon>
                                <span class="ml-1 fs-14">{{
                                    formatCount(videoDetail.stats.likes, false)
                                }}</span>
                            </v-btn>
                            <v-btn max-height="3.6rem" color="btnBg">
                                <v-icon class="fs-20">mdi-thumb-down-outline</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                        <v-btn max-height="3.6rem" class="like-btn ml-2" color="btnBg" rounded elevation="0">
                            <v-icon class="fs-20">mdi-share-outline</v-icon>
                            <span class="ml-1 fs-14 text-capitalize">Share</span>
                        </v-btn>
                        <v-btn max-height="3.6rem" class="like-btn ml-2" color="btnBg" rounded elevation="0">
                            <v-icon class="fs-20">mdi-download-outline</v-icon>
                            <span class="ml-1 fs-14 text-capitalize">Download</span>
                        </v-btn>

                        <v-menu left bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn max-height="3.6rem" min-width="3.6rem" class="like-btn ml-2 pa-0 rounded-circle"
                                    color="btnBg" elevation="0" v-bind="attrs" v-on="on">
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item link>
                                    <v-list-item-icon class="my-2">
                                        <v-icon>mdi-playlist-plus</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title class="fs-14">Save</v-list-item-title>
                                </v-list-item>
                                <v-list-item link>
                                    <v-list-item-icon class="my-2">
                                        <v-icon>mdi-flag-outline</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title class="fs-14">Report</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
                <!-- Description -->
                <v-sheet color="btnBg" link class="mt-3 px-4 py-3 rounded-lg pointer"
                    :class="{ 'desc-sheet': !$vuetify.theme.dark }" elevation="0">
                    <div @click="showMoreDesc = !showMoreDesc">
                        <p class="mb-0 fs-14 fw-600" :class="$vuetify.theme.dark
                            ? 'dark-theme-secondarytext'
                            : 'light-theme-secondarytext'
                            ">
                            <span :class="$vuetify.theme.dark
                                ? 'dark-theme-primarytext'
                                : 'light-theme-primarytext'
                                ">{{ formatCount(videoDetail.stats.views, false) }} views
                            </span>
                            <span :class="$vuetify.theme.dark
                                ? 'dark-theme-primarytext'
                                : 'light-theme-primarytext'
                                ">{{ videoDetail.publishedDate }}
                            </span>
                            <span>{{ videoDetail.superTitle.items.join(" ") }}</span>
                        </p>
                        <p class="fs-14 mb-0" v-html="shortWrapText(videoDetail.description)" v-if="!showMoreDesc"></p>
                        <p class="fs-14 mb-0" v-html="wrapDesc(videoDetail.description)" v-else></p>
                    </div>
                    <p class="fs-14 fw-600 mb-0 pointer" @click="showMoreDesc = !showMoreDesc">{{ showMoreDesc ? 'Show less'
                        : 'Show more' }}</p>
                </v-sheet>
                <!-- Comment Section -->
                <!-- For mobile -->
                <v-divider v-if="$vuetify.breakpoint.xs && !showCommentList" class="mt-3"></v-divider>
                <div class="d-flex justify-space-between align-center mt-2 mb-3" v-if="$vuetify.breakpoint.xs">
                    <p class="fs-20 mr-5 mb-0" style="position: relative;bottom: -3px; left:10px;"
                        @click="showCommentList = true">Comments: {{
                            formatCount(videoComments.totalCommentsCount, true) }}</p>
                    <p class="mb-0 pointer" style="transform: rotate(90deg)" @click="showCommentList = true"
                        v-if="!showCommentList">
                        <v-icon class="fs-20" style="position: relative;left: 6px;">mdi-chevron-left</v-icon>
                        <v-icon class="fs-20">mdi-chevron-right</v-icon>
                    </p>
                    <v-icon v-else @click="showCommentList = false">mdi-close</v-icon>
                </div>
                <v-divider v-if="$vuetify.breakpoint.xs && !showCommentList"></v-divider>
                <!-- For desktop -->
                <div class="d-flex mt-4 align-baseline" v-if="!$vuetify.breakpoint.xs">
                    <p class="fs-16 mr-5">{{ formatCount(videoComments.totalCommentsCount, true) }} Comments</p>
                    <v-menu left bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn max-height="3.6rem" color="transparent" min-width="3.6rem" class="like-btn ml-2 pa-0"
                                elevation="0" v-bind="attrs" v-on="on">
                                <v-icon>mdi-sort-variant</v-icon>
                                <span class="ml-1 fs-14 text-capitalize">Sort by</span>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item link>
                                <v-list-item-title class="fs-14">Top comments</v-list-item-title>
                            </v-list-item>
                            <v-list-item link>
                                <v-list-item-title class="fs-14">Newest first</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <div class="d-flex mb-4"
                    v-if="$vuetify.breakpoint.xs && showCommentList ? true : !$vuetify.breakpoint.xs ? true : false">
                    <v-avatar size="37" class="mr-4"><img
                            src="https://lh3.googleusercontent.com/a/AGNmyxZ7qhL59QyDyrMQnr4OloKhOWgpWNeNXk3p1Y3Z"
                            alt=""></v-avatar>
                    <div style="width:95%;">
                        <v-text-field placeholder="Add a comment..." class="mt-0 pt-0" hide-details
                            @click="showCommentBtn = true" v-model="userComment"></v-text-field>
                        <div class="d-flex justify-end mt-2" v-if="showCommentBtn">
                            <v-btn color="transparent" class="fs-14 rounded-xl text-capitalize" elevation="0"
                                @click="showCommentBtn = false; userComment = null;">
                                Cancel
                            </v-btn>
                            <v-btn :disabled="!userComment" color="indigo"
                                class="fs-14 rounded-xl text-capitalize ml-2 white--text" elevation="0" @click="addComment">
                                Comment
                            </v-btn>
                        </div>
                    </div>
                </div>
                <!-- Comment list -->
                <div v-if="$vuetify.breakpoint.xs && showCommentList ? true : !$vuetify.breakpoint.xs ? true : false"
                    :class="$vuetify.breakpoint.xs ? 'v-height scroll-vertical-hide' : ''">
                    <div class="d-flex mt-4" v-for="(comment, index) in videoComments.comments" :key="index">
                        <v-avatar size="37" class="mr-4"><img :src="comment.author.avatar[0].url" alt=""></v-avatar>
                        <div style="width:95%;">
                            <p class="fs-12 fw-500 mb-1">{{ comment.author.title }} <span class=" ml-1 fw-500" :class="$vuetify.theme.dark
                                ? 'dark-theme-secondarytext'
                                : 'light-theme-secondarytext'
                                "> {{ comment.publishedTimeText }}</span></p>
                            <p class="fs-14 mb-1">{{ comment.content }}</p>
                            <div class="d-flex align-center">
                                <v-btn icon>
                                    <v-icon class="fs-20">mdi-thumb-up-outline</v-icon>
                                </v-btn>
                                <p class="fs-12 mr-2 mb-0" v-if="comment.stats.votes">{{ formatCount(comment.stats.votes,
                                    false) }}</p>
                                <v-btn icon>
                                    <v-icon class="fs-20">mdi-thumb-down-outline</v-icon>
                                </v-btn>
                                <v-btn small color="transparent" class="fs-14 rounded-xl text-capitalize ml-2"
                                    elevation="0">
                                    Reply
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </div>

            </v-col>
            <v-col cols="12" md="4">
                <!-- Related Videos -->
                <div class="">
                    <RealtedVideo />
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { LazyYoutube } from "vue-lazytube";
import { mapActions } from "vuex";
import RealtedVideo from "../components/RelatedVideo.vue";

export default {
    data: () => ({
        videoId: null,
        showMoreDesc: false,
        showCommentBtn: false,
        userComment: null,
        showCommentList: false,
    }),
    mounted() {
        this.videoId = window.location.pathname.match(/play-video\/(.*)/)[1];
        console.log("videoId: ", this.videoId);
        this.fetchVideoDetail(this.videoId);
        this.fetchRelatedVideos(this.videoId);
        this.fetchVideoComment(this.videoId);
    },
    methods: {
        ...mapActions(["fetchVideoDetail", "fetchRelatedVideos", "fetchVideoComment"]),
        formatCount(count, comment) {
            if (count >= 1000000) {
                return (count / 1000000).toFixed(1) + "M";
            } else if (count >= 1000 && !comment) {
                return (count / 1000).toFixed(0) + "K";
            } else if (count >= 10000 && comment) {
                return (count / 1000).toFixed(0) + "K";
            } else return count;
        },
        wrapDesc(desc) {
            if (typeof desc === "string") {
                const urlRegex = /(https?:\/\/[^\s]+)/g
                const descWithLinks = desc.replace(urlRegex, '<a target="_blank" href="$&">$&</a>')
                return `<p>${descWithLinks.replace(/\n/g, '<br>')}</p>`
            }
            return "";
        },
        shortWrapText(desc) {
            if (typeof desc === 'string') {
                const sentences = desc.split("\n");
                return `<span>${sentences[0]}</span>`
            }
        },
        addComment() {
            this.$store.state.videoComments.comments.unshift({
                "author": {
                    "avatar": [
                        {
                            "height": 48,
                            "url": "https://lh3.googleusercontent.com/a/AGNmyxZ7qhL59QyDyrMQnr4OloKhOWgpWNeNXk3p1Y3Z",
                            "width": 48
                        },
                    ],
                    "title": "Himanshu Kumar"
                },
                "creatorHeart": false,
                "content": this.userComment,
                "publishedTimeText": "0 seconds ago",
                "stats": {
                    "replies": 0,
                    "votes": 0
                }
            })
            this.showCommentBtn = false;
            this.userComment = null;
        }
    },
    computed: {
        videoDetail() {
            return this.$store.state.videoDetail;
        },
        videoComments() {
            console.log("videoComments: ", this.$store.state.videoComments);
            return this.$store.state.videoComments;
        }
    },
    components: {
        LazyYoutube,
        RealtedVideo,
    },
};
</script>

<style scoped>
.video-player {
    padding: 1.5rem 2rem 0 3rem;
}

.v-height {
    height: calc(100vh - 64px);
}

::v-deep .theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn,
::v-deep .theme--dark.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn {
    border-color: transparent !important;
}

::v-deep .theme--light.v-btn-toggle:not(.v-btn-toggle--group) .like-btn.v-btn.v-btn {
    border-right-color: #d9d9d9 !important;
    padding-right: 0.2rem;
}

.desc-sheet:hover {
    background-color: #e3e1e1 !important;
}

@media screen and (max-width: 600px) {
    .head-w-100 {
        width: 100%;
        margin: 4px 0;
    }

    .video-player {
        padding: 10px;
    }
}</style>
