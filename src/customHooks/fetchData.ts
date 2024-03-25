import axios from "axios"

const GetLogoutRoute = async() => {
    
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/log-out`);
        
        return response.data

    } catch (error) {
        console.log(error);
        alert(error)


    }
}

export default GetLogoutRoute