import { useNavigate } from "react-router-dom";
import FetchServerData from "@/utils/FetchServerData";
import { useToast } from "./ui/use-toast";
import { useApp } from "@/context/appContext";


type NavOption = {
    key: number;
    name: string;
    slug: string;
}

type Props = {
    lists_r: NavOption[];
}


function Logout({lists_r} : Props) {
    const { toast } = useToast();
    const navigate = useNavigate();

    const { logoutBtn, setLogoutBtn, setCharArr } = useApp();

    const handleLogout = async() => {
        const response = await FetchServerData("/auth/log-out");
        
        if(response.message === "User logged Out"){
            setCharArr([]);
            toast({
                title: response.message
            })
            navigate("/log-in");
            setLogoutBtn(false);
        } else {
            toast({
                title: "Couldn't logout user",
                description : response.message
            })
        }
    }

  return (
    <>
        {
                            lists_r.map((list) => (
                    
                                !logoutBtn? 
                                    <li
                                    key={list.key} 
                                    onClick={() =>navigate(list.slug)}  
                                    className="
                                     text-white font-Jersey10  font-bold  text-xl hover:cursor-pointer hover:border-b-4 hover:border-red-500
                                     "
                                     >{list.name}</li> 
                                     : 
                                     <li
                                     onClick = {handleLogout}
                                     className="
                                     text-white font-Jersey10  font-bold text-sm md:text-xl hover:border-b-4 hover:border-red-500
                                     "
                                     >
                                        LOGOUT
                                     </li>
                                ))
        }
    </>
  )
}

export default Logout