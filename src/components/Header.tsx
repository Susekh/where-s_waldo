import { useNavigate } from "react-router-dom";


const lists = [
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

function Header(){
    
  const navigate = useNavigate();
  return (
    <header className=" bg-neutral-700 p-4">
        <ul className=" flex gap-8">
            {
                lists.map((list) => (
                    <li
                    key={list.key} 
                    onClick={() =>navigate(list.slug)}  
                    className="
                     text-white  text-xl hover:cursor-pointer
                     "
                     >{list.name}</li>
                ))
            }
        </ul>
    </header>
  );
}

export default Header;
