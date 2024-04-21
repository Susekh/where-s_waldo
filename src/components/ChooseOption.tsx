import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useApp } from "@/context/appContext";

interface charObject {
    id: number;
    name: string;
    src : string;
  }



function ChooseOption({ charList, posTop, posLeft, isVisible, timeTaken }:
    { charList : charObject[], posTop : number, posLeft : number, isVisible : boolean, timeTaken : number}) 
{

  const { setCharArr, charArr } = useApp();

    //coordinates of waldo : x:900 y:350, wizard : x:395 y:330, Odlaw x:158 y:333, Wenda x:1124 y:380
    const { toast } = useToast();


    const handleIsFound = async(character : string) => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/gameLogics/isFound`, {
            divTop : posTop,
            divLeft : posLeft,
            radius : 100,
            timeTaken : timeTaken,
            character : character
          },{
            withCredentials : true
          })

          if(response.data.correct){
            toast({
              title : `You Found ${character}!`
            })
          } else {
            toast({
              title : `${character} is not there :(`
            })
          }
          setCharArr(response.data.charactersFound);
          
        } catch (error) {
          toast({
            title : `${error}`
          })
        }
    }


    //To move chooseOption part to top when it goes too below the picture 
  let styleTop
  if(posTop > 600){
    styleTop = posTop - 330
  } else {
    styleTop = 100 + posTop
  }
  

  return (
      <div
        style={{ 
          top : `${styleTop}px`,
          left : `${posLeft-35}px`
        }} 
        className={`${isVisible ? "" : "hidden"} bg-neutral-800 absolute p-1 md:p-4 grid gap-2 rounded-xl`}>
            {   
                charList.map((char) => (
                    charArr.includes(char.name) ?
                       null 
                       : 
                       <div key={char.id} className=" bg-neutral-200 rounded-lg p:1 md:p-2">
                        <img  src={char.src} className=" inline w-3 md:w-6"  />
                        <button onClick={() => handleIsFound(char.name)} className=" bg-neutral-300 p-2 h-9 lg:w-24 lg:h-12 lg:ml-2  rounded-lg hover:bg-red-200 text-xs md:text-lg font-bold">{char.name}</button>
                      </div>
                ))
            }
    </div>
    
  )
}

export default ChooseOption