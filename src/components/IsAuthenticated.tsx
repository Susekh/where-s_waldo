import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FetchServerData from "@/customHooks/FetchServerData";

type ReactNodeProps = {
    children: JSX.Element;
};

function IsAuthenticated({ children }: ReactNodeProps) {
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuthentication() {
            try {
                const res = await FetchServerData("/auth/isAuthenticated");
                // If authentication is successful
                console.log(res);
                
                if (res.message === "User is Authenticated.") {
                    setAuthenticated(true);
                } else if (res.error === "Token not found") {
                    setError("User is not logged in.");
                    setTimeout(() => {
                        navigate("/log-in")
                    }, 1500);
                } 
                else {
                    setError("Authentication failed.");
                    setTimeout(() => {
                        navigate("/log-in")
                    }, 1500);
                }
            } catch (err) {
                setError(String(err));
            } finally {
                // Whether successful or error occurred, set loading to false
                setLoading(false);
            }
        }

        checkAuthentication();
    }, [navigate]);

    // Render children if authenticated, render loading indicator if still loading, otherwise render error message
    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading && authenticated && <>{children}</>}
            {!loading && !authenticated && <p className="text-white">{error}<br></br>you are now being redirected to login page...</p>}
        </>
    );
}

export default IsAuthenticated;
