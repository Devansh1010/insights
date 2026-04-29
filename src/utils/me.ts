import axios from "axios"

export const getMe = async () => {
    try {
        const res = await axios.get('/api/user/me')
        return res.data.data

    } catch (error) {
        console.error('Error fetching user data:', error)
        return null
    }
}