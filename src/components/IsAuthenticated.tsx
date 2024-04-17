import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FetchServerData from "@/customHooks/FetchServerData";
import { useToast } from "./ui/use-toast";

type ReactNodeProps = {
    children: JSX.Element;
};

function IsAuthenticated({ children }: ReactNodeProps) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        async function checkAuthentication() {
            try {
                const res = await FetchServerData("/auth/isAuthenticated");
                // If authentication is successful
                console.log(res);
                
                if (res.message === "User is Authenticated.") {
                    setAuthenticated(true);
                } else if (res.error === "Token not found") {
                    toast({
                        title : "User is not logged in."
                    })
                    navigate("/log-in")
                } 
                else {
                    toast({
                        title : "Authentication failed."
                    })
                    navigate("/log-in")
                }
            } catch (err) {
                toast({
                    title : `${err}`
                })
            } finally {
                // Whether successful or error occurred, set loading to false
                setLoading(false);
            }
        }

        checkAuthentication();
    }, [navigate, toast]);

    // Render children if authenticated, render loading indicator if still loading, otherwise render error message
    return (
        <>
            {loading && <p className="text-white">Loading...</p>}
            {!loading && authenticated && <>{children}</>}
        </>
    );
}

export default IsAuthenticated;
