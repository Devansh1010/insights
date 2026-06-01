import axios from "axios"

const adminApi = axios.create({
    baseURL: "/api/internal/admin/catagory",
    withCredentials: true
})

export default adminApi