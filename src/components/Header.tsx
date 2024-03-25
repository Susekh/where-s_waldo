import { useNavigate } from "react-router-dom";
import { useApp } from "../context/appContext";
import getLogoutRoute from "../customHooks/fetchData";


interface headerOptions {
    key : number;
    name : string;
    slug : string
}

const lists_l: Array<headerOptions> = [
    {   
        key : 1,
        name : "HOME",
        slug : "/"
    },
    {
        key : 2,
        name : "PLAY",
        slug : "/play-game",
    },
    {
        key : 3,
        name : "LEADER BOARD",
        slug : "/leader-board"
    }
]

const lists_r : Array<headerOptions> = [
    {
        key : 1,
        name : 'LOGIN',
        slug : '/log-in'
    }
]

function Header(){
    const { logoutBtn, setLogoutBtn } = useApp()
    const navigate = useNavigate();


    const handleLogout = async() => {
        const response = await getLogoutRoute();
        
        if(response.message === "User successfully logged out"){
            //call the display msg function
            alert("User Logged out")
            setLogoutBtn(false);
        } else {
            //call the display msg and show the error
            alert("Couldn't logout user")
        }
        navigate("/log-in")
    }

  return (
    <header className=" bg-neutral-700 p-4 flex justify-between fixed right-0 left-0 top-0 z-10">
        <ul className=" flex gap-8">
            {
                lists_l.map((list) => (
                    <li
                    key={list.key} 
                    onClick={() =>navigate(list.slug)}  
                    className="
                     text-white  text-xl hover:cursor-pointer hover:bg-gradient-to-r from-red-500 via-white to-pink-500 hover:text-transparent bg-clip-text
                     "
                     >{list.name}</li>
                ))
            }
        </ul>
        <ul className=" flex gap-8" >
            {
                lists_r.map((list) => (
                    
                !logoutBtn? 
                    <li
                    key={list.key} 
                    onClick={() =>navigate(list.slug)}  
                    className="
                     text-white  text-xl hover:cursor-pointer hover:bg-gradient-to-r from-red-500 via-white to-pink-500 hover:text-transparent bg-clip-text
                     "
                     >{list.name}</li> 
                     : 
                     <li
                     onClick = {handleLogout}
                     className="
                     text-white  text-xl hover:cursor-pointer hover:bg-gradient-to-r from-red-500 via-white to-pink-500 hover:text-transparent bg-clip-text
                     "
                     >
                        LOGOUT
                     </li>
                ))
            }
        </ul>
    </header>
  );
}

export default Header;
