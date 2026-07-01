import axios from "axios";

const seriesApi = axios.create({
    baseURL: "/api/series",
    withCredentials: true
})

export const getUserSeries = async () => {

    const res = await axios.get('/api/user/get-user-series');

    return res.data.data;
}