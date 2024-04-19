import axios from "axios";


const SendData = async(userName : string, password : string, route : string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/${route}`, 
        {
            username : userName,
            password : password
        },
        {withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }});
    
        return response.data;
        
    } catch (error) {
        return { message : error }
    }
}


export default SendData