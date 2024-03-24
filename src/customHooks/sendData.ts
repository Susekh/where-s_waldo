import axios from "axios";


const SendData = async(userName : string, password : string, route : string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${route}`, {
            username : userName,
            password : password
        });

        return response.data;
        
    } catch (error) {
        return { message : "Server Error" }
    }
}


export default SendData