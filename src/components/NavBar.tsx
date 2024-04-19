import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useIsUserLoggedIn from "../customHooks/useIsUserLoggedIn";
import { Menu, X } from "lucide-react";
import Logout from "./LogoutBtn";


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
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
      };

    const navBarClickHander = (slug: string, device : string) => {
        if(device === "mobile"){
            navigate(slug);
            toggleNavbar();
        } else {
            navigate(slug);
        }
    }

    const renderList = (lists : Array<navOptions>, device : string) => {
              return (  lists.map((list : navOptions) => (
                    <li
                    key={list.key} 
                    onClick={() =>navBarClickHander(list.slug, device)}  
                    className={` text-white font-Jersey10 font-bold  ${device === "mobile" ? "text-sm" : "text-xl"} hover:cursor-pointer hover:border-b-4  border-red-500`}
                    >{list.name}</li>
                ))
            )
    }




    const navigate = useNavigate();


    useIsUserLoggedIn()



  return (
    <>
    <nav className=" bg-neutral-700 h-12 md:h-16 p-4 flex justify-between fixed right-0 left-0 top-0 z-20">
        <ul className="gap-8 hidden justify-end md:flex">
            {
                renderList(lists_l, "desktop")
            }
        </ul>
        <div className=" md:hidden">
        <button onClick={toggleNavbar}>
          {isOpen ? <X color="white" /> : <Menu color="white" />}</button>
        </div>
        <ul className=" flex gap-8" >
            <Logout lists_r={lists_r}/>
        </ul>
    </nav>
    {
        isOpen && (
            <ul className=" fixed z-10 mt-14 gap-4 p-8 bg-neutral-700 flex basis-full flex-col items-center  md:hidden">
            {
                renderList(lists_l, "mobile")
            }
            </ul>
        )
    }
    </>
  );
}

export default NavBar;
