<template>
    <div class="pt-6">
        <v-row>
            <v-col cols="12" sm="7">
                <p :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" class="fs-16">Description</p>
                <p :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" class="fs-14 break-spaces">{{ about.description }}</p>
                <v-divider></v-divider>
                <p :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" class="fs-16 my-3">Details</p>
                <p :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" class="fs-12 mb-4">Location: <span>{{ about.country }}</span></p>
                <v-divider></v-divider>
                <p :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" class="fs-16 my-3">Links</p>
                <p :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" v-for="(link, index) in about.links" :key="index" class="d-flex align-center">
                    <v-avatar size="16">
                        <img :src="link.icon" alt="icon">
                    </v-avatar>
                    <a :href="link.targetUrl" class="fs-12 ml-2 text-decoration-none" target="_blank">{{ link.title }}</a>
                </p>
                    <v-divider></v-divider>
            </v-col>
            <v-col cols="12" sm="4" class="offset-sm-1">
                <p :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" class="fs-16">Stats</p>
                <v-divider></v-divider>
                <p :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" class="fs-14 my-2">{{ about.joinedDateText }}</p>
                <v-divider></v-divider>
                <p :class="$vuetify.theme.dark ? 'white--text' : 'black--text'" class="fs-14 my-2 mb-6">{{ about.stats.views.toLocaleString('en-US') }} views</p>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        props:["about"],
    }
</script>

<style lang="scss" scoped>

</style>