import { useNavigate } from "react-router-dom";
import { useApp } from "../context/appContext";
import { useState } from "react";
import FetchServerData from "../customHooks/FetchServerData";
import useIsUserLoggedIn from "./auth/useIsUserLoggedIn";
import { Menu, X } from "lucide-react";
import { useToast } from "./ui/use-toast";


interface navOptions {
    key : number;
    name : string;
    slug : string
}

const lists_l: Array<navOptions> = [
    {   
        key : 14363456,
        name : "HOME",
        slug : "/"
    },
    {
        key : 265463345,
        name : "PLAY",
        slug : "/play-game",
    },
    {
        key : 345243,
        name : "LEADER BOARD",
        slug : "/leader-board"
    }
]

const lists_r : Array<navOptions> = [
    {
        key : 4524543,
        name : 'LOGIN',
        slug : '/log-in'
    }
]

function NavBar(){
    const { logoutBtn, setLogoutBtn } = useApp()
    const [isOpen, setIsOpen] = useState(false);

    const { toast } = useToast();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
      };

    const mobileNavBarClickHander = (slug: string) => {
        navigate(slug);
        toggleNavbar();
    }




    const navigate = useNavigate();


    useIsUserLoggedIn()

    const handleLogout = async() => {
        const response = await FetchServerData("/auth/log-out");
        
        if(response.message === "User logged Out"){
            //call the display msg function
            toast({
                title: response.message
            })
            navigate("/log-in");
            setLogoutBtn(false);
        } else {
            //call the display msg and show the error
            toast({
                title: "Couldn't logout user",
                description : response.message
            })
        }
    }

  return (
    <>
    <nav className=" bg-neutral-700 p-4 flex justify-between fixed right-0 left-0 top-0 z-20">
        <ul className="gap-8 hidden justify-end md:flex">
            {
                lists_l.map((list) => (
                    <li
                    key={list.key} 
                    onClick={() =>navigate(list.slug)}  
                    className="
                     text-white font-Jersey10 font-bold  text-xl hover:cursor-pointer
                     "
                     >{list.name}</li>
                ))
            }
        </ul>
        <div className=" md:hidden">
        <button onClick={toggleNavbar}>
          {isOpen ? <X color="white" /> : <Menu color="white" />}</button>
        </div>
        <ul className=" flex gap-8" >
            {
                lists_r.map((list) => (
                    
                !logoutBtn? 
                    <li
                    key={list.key} 
                    onClick={() =>navigate(list.slug)}  
                    className="
                     text-white font-Jersey10  font-bold  text-xl hover:cursor-pointer 
                     "
                     >{list.name}</li> 
                     : 
                     <li
                     onClick = {handleLogout}
                     className="
                     text-white font-Jersey10  font-bold text-sm md:text-xl 
                     "
                     >
                        LOGOUT
                     </li>
                ))
            }
        </ul>
    </nav>
    {
        isOpen && (
            <ul className=" fixed z-10 mt-14 gap-4 p-8 bg-neutral-700 flex basis-full flex-col items-center  md:hidden">
            {
                lists_l.map((list) => (
                    <li
                    key={list.key} 
                    onClick={() =>mobileNavBarClickHander(list.slug)}  
                    className="
                     text-white font-Jersey10 font-bold text-sm hover:cursor-pointer 
                     "
                     >{list.name}</li>
                ))
            }
            </ul>
        )
    }
    </>
  );
}

export default NavBar;
