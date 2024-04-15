import axios from "axios"

const FetchServerData = async(path : string) => {
    
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}${path}`,
         
            {withCredentials: true});
        
        return response.data

    } catch (error) {
        
        console.log("ERR ::",error.response.data);
        return error.response.data
        
    }
}

export default FetchServerData