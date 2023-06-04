import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";
// const API_KEY = "ab806c9d26mshfdbb2785037ac9bp16b07fjsn0e4d82ad3407";
const API_KEY = "cadceef2famshdd1e5215136a4e1p10fafajsnc33b5f7666d5";

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


