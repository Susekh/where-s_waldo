import { useEffect, useState } from "react";
import ChooseOption from "./ChooseOption";
import FetchServerData from "@/customHooks/FetchServerData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/appContext";



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
  const { gameTime, setGameTime , charArr, setCharArr } = useApp();
  const [isGameOver, setIsGameOver] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const magnifierHeight = 100
  const  magnifierWidth = 100

  function setDivLocation(top : number, left : number){
    setPos([top, left]);
    setVisible(true);
  }

  async function handleGameOver() {
    try {
        const res = await FetchServerData("/gameLogics/restart");
        if (res) {
            console.log(res);
            setIsGameOver(false);
            setGameTime(0);
            setCharArr([]);
        }
    } catch (error) {
        toast({
            title: `${error}`
        });
    }
}
  useEffect(() => {
    if(charArr.length === 4){
      setIsGameOver(true);
    }
  }, [charArr])

  

  useEffect(() => {
    (() => {
         setTimeout(() => {
      setGameTime(gameTime+1);
    }, 1000);
    })()
  })

  return (
    <div className="flex flex-col gap-4 items-center">
      

      <AlertDialog open={isGameOver}>
      <AlertDialogTrigger  asChild>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Congratulations you've Won!</AlertDialogTitle>
          <AlertDialogDescription>
            You've completed the game. Press restart to play again!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => navigate("/leader-board")}>Go to LeaderBoard</AlertDialogCancel>
          <AlertDialogAction onClick={handleGameOver}>Restart</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>



      <div className="flex gap-4">
        <div className=" bg-neutral-700 p-8 rounded-lg">
              <p className="text-white">TIME TAKEN : {gameTime} s</p>
        </div>
        <div className=" bg-neutral-700 p-8 rounded-lg">
              <p className="text-white">CHARACTERS LEFT : {4 - charArr.length}</p>
        </div>
      </div>
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
          // update cursor positionf
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
                  isVisible={isVisible}
                  timeTaken={gameTime}
                   />

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