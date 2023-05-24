import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";
const API_KEY = "ab806c9d26mshfdbb2785037ac9bp16b07fjsn0e4d82ad3407";

const options = {
    params: { hl: "en", gl: "IN" },
    headers: {
        "X-RapidAPI-Key":API_KEY,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
};

export const fetchDataFromApi = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
};

/*
Yes, most of the endpoints require an ID parameter to identify the specific video, channel, or playlist you are requesting data for. The ID can be a video ID, channel ID, or playlist ID depending on the endpoint. Here are the required ID parameters for each endpoint:

1. Search for Videos: The `q` parameter specifies the search query, and the `type` parameter specifies the type of results you want to receive (e.g. video, channel, playlist).
Example URL: `${BASE_URL}/search?q=keyword&type=video`

2. Get Video Details: The `video_id` parameter specifies the ID of the video you want to retrieve details for.
Example URL: `${BASE_URL}/get_video_info?video_id=VIDEO_ID`

3. Get Video Statistics: The `video_id` parameter specifies the ID of the video you want to retrieve statistics for.
Example URL: `${BASE_URL}/get_video_stats?video_id=VIDEO_ID`

4. Get Related Videos: The `video_id` parameter specifies the ID of the video you want to retrieve related videos for.
Example URL: `${BASE_URL}/related_videos?video_id=VIDEO_ID`

5. Get Video Captions: The `video_id` parameter specifies the ID of the video you want to retrieve captions for.
Example URL: `${BASE_URL}/get_captions?video_id=VIDEO_ID`

6. Get Channel Details: The `channel_id` parameter specifies the ID of the channel you want to retrieve details for.
Example URL: `${BASE_URL}/get_channel_info?channel_id=CHANNEL_ID`

7. Get Playlist Details: The `playlist_id` parameter specifies the ID of the playlist you want to retrieve details for.
Example URL: `${BASE_URL}/get_playlist_info?playlist_id=PLAYLIST_ID`

In each of these examples, `VIDEO_ID`, `CHANNEL_ID`, and `PLAYLIST_ID` would need to be replaced with the actual IDs for the video, channel, or playlist you are requesting data for.
*/