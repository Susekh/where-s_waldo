interface charObject {
    id: number;
    name: string;
    src : string;
  }


function ChooseOption({ charList, cTop, cLeft, isVisible }:
    { charList : charObject[], cTop : number, cLeft : number, isVisible : boolean}) 
{
  return (
    <div
        style={{ 
          top : `${100+cTop}px`,
          left : `${cLeft-35}px`
        }} 
        className={`${isVisible ? "" : "hidden"} bg-teal-400 absolute p-1 md:p-4 grid gap-2 rounded-xl`}>
            {
                charList.map((char) => (
                    <div className="bg-white rounded-lg p:1 md:p-2">
                    <img src={char.src} className=" inline w-3 md:w-6"  />
                    <button key={char.id} className=" bg-gray-200 p-2 h-9 lg:w-24 lg:h-12 lg:ml-2  rounded-lg hover:bg-slate-300 text-xs md:text-lg font-bold">{char.name}</button>
                    </div>
                ))
            }
    </div>
  )
}

export default ChooseOption