import axios from "axios"

const blogApi = axios.create({
    baseURL: "/api/blog",
    withCredentials: true
})

export default blogApi