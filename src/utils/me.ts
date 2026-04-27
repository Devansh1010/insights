import axios from "axios"

export const getMe = async () => {
    try {
        const res = await axios.get('/api/user/me')
        console.log("getMe response:", res.data.data)
        return res.data.data

    } catch (error) {
        console.error('Error fetching user data:', error)
        return null
    }
}