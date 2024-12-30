import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || null


const Api = {

    get: async (url, header=[]) => {
        const token = localStorage.getItem('token')
        if(token) {
            header['Authorization'] = `Bearer ${token}`
        }
        try {
            let result = await axios.get(`${apiUrl}/${url}`,
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                        ...header
                    }
                }
            )
            return result
        }
        catch (err) {
            return err
        }
        
    },

    post: async (url, data) => {
        try {
            let result = await axios.post(`${apiUrl}/${url}`, data,
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
            return result
        }
        catch (err) {
            return err
        }

    }
}

export default Api