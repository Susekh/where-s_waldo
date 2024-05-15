import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useIsUserLoggedIn from "../customHooks/useIsUserLoggedIn";
import { Menu, X } from "lucide-react";
import Logout from "./LogoutBtn";
import { v4 as uuidv4 } from 'uuid';



interface navOptions {
    id : string;
    name : string;
    slug : string
}

const lists_l: Array<navOptions> = [
    {   
        id : uuidv4(),
        name : "HOME",
        slug : "/"
    },
    {
        id : uuidv4(),
        name : "PLAY",
        slug : "/play-game",
    },
    {
        id : uuidv4(),
        name : "LEADER BOARD",
        slug : "/leader-board"
    }
]

const lists_r : Array<navOptions> = [
    {
        id : uuidv4(),
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
                    key={list.id} 
                    onClick={() =>navBarClickHander(list.slug, device)}  
                    className={` text-white font-Jersey10 font-bold pl-2 pr-2  ${device === "mobile" ? "text-sm" : "text-xl"} duration-100 ease-in-out hover:cursor-pointer md:hover:bg-neutral-800 rounded-md  hover:border-b-4  md:border-red-500`}
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
