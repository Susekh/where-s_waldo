import { useEffect } from "react"
import { useApp } from "@/context/appContext";
import fetchApiData from "@/utils/FetchServerData";
import { useToast } from "@/components/ui/use-toast";



function useIsUserLoggedIn(){
    const { logoutBtn, setLogoutBtn } = useApp()
    const { toast } = useToast()

    useEffect(() => {
        (async() => {
            const res = await fetchApiData("/auth/isAuthenticated");
    
    
            if (res.error === "Token not found") {
                setLogoutBtn(false);
            } else if (res.message.toString() === "User is Authenticated.") {
                console.log("User is authenticated. Logging in.");
                setLogoutBtn(true);
                
            } else {
                toast({
                    title : `Unexpected response : ${res}`
                })
            }
        })();
    } , [logoutBtn, setLogoutBtn, toast]);

}

export default useIsUserLoggedIn