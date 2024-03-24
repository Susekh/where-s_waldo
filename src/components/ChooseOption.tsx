
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


  return (
    <div
        style={{ 
          top : `${100+posTop}px`,
          left : `${posLeft-35}px`
        }} 
        className={`${isVisible ? "" : "hidden"} bg-teal-400 absolute p-1 md:p-4 grid gap-2 rounded-xl`}>
            {   
                charList.map((char) => (
                    <div key={char.id} className="bg-white rounded-lg p:1 md:p-2">
                    <img  src={char.src} className=" inline w-3 md:w-6"  />
                    <button className=" bg-gray-200 p-2 h-9 lg:w-24 lg:h-12 lg:ml-2  rounded-lg hover:bg-slate-300 text-xs md:text-lg font-bold">{char.name}</button>
                    </div>
                ))
            }
    </div>
  )
}

export default ChooseOption