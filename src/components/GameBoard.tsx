import { useState } from "react";
import ChooseOption from "./ChooseOption";


function GameBoard(
  {
    src,
    zoomLevel = 1.5
  }: {
    width?: string;
    height?: string;
    zoomLevel?: number;
    src : string;
  }
) {


  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[posTop, posLeft], setPos] = useState([0, 0]);
  const [isVisible, setVisible] =  useState(false);

  const magnifierHeight = 100
  const  magnifierWidth = 100

  function setDivLocation(top : number, left : number){
    setPos([top, left]);
    setVisible(true);
  }

  return (
    <div className=" h-fill">
      <div
        onClick={() => {
          setDivLocation(y - magnifierHeight / 2,  x - magnifierWidth / 2)
          }}
       className="flex justify-center items-center relative ml-auto">
      <img 
        src={src}
        alt="beach image"
        className="h-full w-full"
        onMouseEnter={(e) => {
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
        onMouseMove={(e) => {
          // update cursor position
          // Update cursor position
          const { top, left } = e.currentTarget.getBoundingClientRect();
          const mouseX = e.clientX - left;
          const mouseY = e.clientY - top;

          setXY([mouseX, mouseY]);
    }}
     />
    <div 
        style={{
            top : `${posTop}px`,
            left : `${posLeft}px`
        }}
        className={`rounded-full ${isVisible ? "" : "hidden"} h-24 w-24 absolute border-4 border-red-500`}>

    </div>

    <ChooseOption 
                  charList={
                    [
                      {
                        id : 1,
                        name : "WALDO",
                        src : "src/assets/characters/Waldo.png"
                      },
                      {
                        id : 2,
                        name : "WIZARD",
                        src : "src/assets/characters/Wizard.png"
                      },
                      {
                        id : 3,
                        name : "WENDA",
                        src : "src/assets/characters/Wenda.png"
                      },
                      {
                        id : 4,
                        name : "ODLAW",
                        src : "src/assets/characters/Odlaw.png"
                      }
                    ]
                  } 
                  posTop={posTop}
                  posLeft={posLeft}
                  isVisible={isVisible} />

    <div
        style={{
          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          backgroundImage: `url('${src}')`,

          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          //calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
        }}
        className={`absolute ${showMagnifier ? "" : "hidden"} 
                    pointer-events-none 
                    rounded-full
                    opacity-100 
                    border border-gray-300 
                    bg-white bg-no-repeat bg-cover`}
      />
    </div>
    </div>
  )
}

export default GameBoard