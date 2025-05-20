import { useEffect, useState } from "react";
import ChooseOption from "./ChooseOption";
import FetchServerData from "@/utils/FetchServerData";
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
} from "@/components/ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/appContext";
import { useMediaQuery } from "react-responsive";

function GameBoard({
  src,
  zoomLevel = 1.5,
  magnifierRadius,
}: {
  width?: string;
  height?: string;
  zoomLevel?: number;
  src: string;
  magnifierRadius: number;
}) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[posTop, posLeft], setPos] = useState([0, 0]);
  const [isVisible, setVisible] = useState(false);
  const { gameTime, setGameTime, charArr, setCharArr } = useApp();
  const [isGameOver, setIsGameOver] = useState(false);
  const [cellId, setCellId] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });
  const gridRows = 18;
  const gridCols = 20;

  const magnifierHeight = magnifierRadius;
  const magnifierWidth = magnifierRadius;

  // Adjust media query as needed — here it's not used for magnifier show/hide
  // You can remove this if unused or keep for other logic

  function setDivLocation(top: number, left: number) {
    setPos([top, left]);
    setVisible(true);
  }

  async function handleGameOver() {
    try {
      const res = await FetchServerData("/gameLogics/restart");
      if (res) {
        setIsGameOver(false);
        setGameTime(0);
        setCharArr([]);
      }
    } catch (error) {
      toast({
        title: `${error}`,
      });
    }
  }

  useEffect(() => {
    if (charArr.length === 4) {
      setIsGameOver(true);
    }
  }, [charArr]);

  useEffect(() => {
    (async () => {
      try {
        const res = await FetchServerData("/gameLogics/charArr");
        setCharArr(res.charArr);
        setGameTime(res.time);
      } catch (error) {
        toast({
          title: `${error}`,
        });
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center">
      <AlertDialog open={isGameOver}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Congratulations you've Won!</AlertDialogTitle>
            <AlertDialogDescription>
              You've completed the game. Press restart to play again!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate("/leader-board")}>
              Go to LeaderBoard
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleGameOver}>
              Restart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex gap-4">
        <div className="bg-neutral-700 p-8 rounded-lg">
          <p className="text-white">TIME TAKEN : {gameTime} s</p>
        </div>
        <div className="bg-neutral-700 p-8 rounded-lg">
          <p className="text-white">
            CHARACTERS LEFT : {4 - (charArr ? charArr.length : 0)}
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center relative ml-auto cursor-pointer">
        <img src={src} alt="beach image" className="h-full w-full" />

        {/* {grid} */}

        <div className="absolute z-0 top-0 left-0 h-full w-full">
          <div
            className="relative h-full w-full"
            style={{
              display: "grid",
              gridTemplateRows: `repeat(${gridRows}, 1fr)`,
              gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            }}
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
              const { top, left } = e.currentTarget.getBoundingClientRect();
              const mouseX = e.clientX - left;
              const mouseY = e.clientY - top;
              setXY([mouseX, mouseY]);
              setShowMagnifier(true);
            }}
          >
            {Array.from({ length: gridRows * gridCols }).map((_, idx) => {
              const cellId = idx + 1;
              return (
                <div
                  key={cellId}
                  id={`cell-${cellId}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Clicked cellId (desktop):", cellId);
                    setCellId(cellId);

                    // Use existing x, y state from onMouseMove
                    setDivLocation(
                      y - magnifierHeight / 2,
                      x - magnifierWidth / 2
                    );

                    setShowMagnifier(true);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();

                    const touch = e.touches[0];
                    const parent = e.currentTarget.parentElement;
                    if (!parent) return;

                    const parentRect = parent.getBoundingClientRect();
                    const touchX = touch.clientX - parentRect.left;
                    const touchY = touch.clientY - parentRect.top;

                    console.log("Touched cellId (mobile):", cellId);

                    setXY([touchX, touchY]); // update magnifier position
                    setCellId(cellId);
                    setDivLocation(
                      touchY - magnifierHeight / 2,
                      touchX - magnifierWidth / 2
                    );

                    setShowMagnifier(true);
                  }}
                  className="bg-transparent"
                  style={{ width: "100%", height: "100%" }}
                  aria-label={`Select cell ${cellId}`}
                />
              );
            })}

            {/* magnifier */}

            <div
              style={{
                height: `${magnifierHeight}px`,
                width: `${magnifierWidth}px`,
                top: `${y - magnifierHeight / 2}px`,
                left: `${x - magnifierWidth / 2}px`,
                backgroundImage: `url('${src}')`,
                backgroundSize: `${imgWidth * zoomLevel}px ${
                  imgHeight * zoomLevel
                }px`,
                backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
                backgroundPositionY: `${
                  -y * zoomLevel + magnifierHeight / 2
                }px`,
              }}
              className={`absolute ${
                showMagnifier && !isMobile ? "" : "hidden"
              } z-50 pointer-events-none rounded-full opacity-100 border border-gray-300 bg-white bg-no-repeat bg-cover`}
            />
          </div>
        </div>

        <div
          style={{
            top: `${posTop}px`,
            left: `${posLeft}px`,
            width: `${isMobile ? 16 : magnifierWidth}px`,
            height: `${isMobile ? 16 : magnifierHeight}px`,
          }}
          className={`absolute rounded-full border-red-500 ${
            isVisible ? "" : "hidden"
          } ${isMobile ? "border-2" : "border-4"}`}
        />

        <ChooseOption
          charList={[
            { id: 1, name: "WALDO", src: "/images/characters/Waldo.png" },
            { id: 2, name: "WIZARD", src: "/images/characters/Wizard.png" },
            { id: 3, name: "WENDA", src: "/images/characters/Wenda.png" },
            { id: 4, name: "ODLAW", src: "/images/characters/Odlaw.png" },
          ]}
          posTop={posTop}
          posLeft={posLeft}
          isVisible={isVisible}
          timeTaken={gameTime}
          cellId={cellId}
        />
      </div>
    </div>
  );
}

export default GameBoard;
