import axios from "axios";

interface charObject {
    id: number;
    name: string;
    src : string;
  }



function ChooseOption({ charList, posTop, posLeft, isVisible }:
    { charList : charObject[], posTop : number, posLeft : number, isVisible : boolean}) 
{
    //send posTop , posLeft and radius of the circle when one of the character's button is clicked

    //coordinates of waldo : x:900 y:350, wizard : x:395 y:330, Odlaw x:158 y:333, Wenda x:1124 y:380
    const top = posTop;
    const left = posLeft;


    const handleIsFound = async(character : string) => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/gameLogics/isFound`, {
            divTop : top,
            divLeft : left,
            radius : 100,
            character : character
          },{
            withCredentials : true
          })

          console.log(response.data.correct);
          console.log(response.data.charactersFound);
          
        } catch (error) {
          alert(error)
        }
    }

  return (
    <div
        style={{ 
          top : `${100+posTop}px`,
          left : `${posLeft-35}px`
        }} 
        className={`${isVisible ? "" : "hidden"} bg-neutral-800 absolute p-1 md:p-4 grid gap-2 rounded-xl`}>
            {   
                charList.map((char) => (
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