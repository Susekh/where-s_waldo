import { useEffect } from "react"
import { useApp } from "@/context/appContext";
import fetchApiData from "@/customHooks/FetchServerData";



function useIsUserLoggedIn(){
    const { logoutBtn, setLogoutBtn } = useApp()

    useEffect(() => {
        (async() => {
            const res = await fetchApiData("/auth/isAuthenticated");
    
            console.log("Response from API:", res);
    
            if (res.error === "Token not found") {
                console.log("Token not found. Logging out.");
                setLogoutBtn(false);
            } else if (res.message.toString() === "User is Authenticated.") {
                console.log("User is authenticated. Logging in.");
                setLogoutBtn(true);
                console.log(logoutBtn);
                
            } else {
                console.log("Unexpected response from API:", res);
            }
        })();
    } , [logoutBtn, setLogoutBtn]);

}

export default useIsUserLoggedIn