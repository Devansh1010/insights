import axios from "axios"

const seriesApi = axios.create({
    baseURL: "/api/series",
    withCredentials: true
})

export default seriesApi