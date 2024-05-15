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
            
            const resErr = res?.response?.data?.error || "Token found";
    
            if ( resErr === "Token not found") {
                setLogoutBtn(false);
            } else if (res.message === "User is Authenticated.") {
                setLogoutBtn(true);
            } else {
                toast({
                    title : `Unexpected response : ${res.message}`
                })
            }
        })();
    } , [logoutBtn, setLogoutBtn, toast]);

}

export default useIsUserLoggedIn