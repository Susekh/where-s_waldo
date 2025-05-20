import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useApp } from "@/context/appContext";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";

interface charObject {
  id: number;
  name: string;
  src: string;
}

function ChooseOption({
  charList,
  cellId,
  posTop,
  posLeft,
  isVisible,
  timeTaken,
}: {
  charList: charObject[];
  cellId: number;
  posTop: number;
  posLeft: number;
  isVisible: boolean;
  timeTaken: number;
}) {
  const { setCharArr, charArr } = useApp();
  const { toast } = useToast();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const adjustedTop =
    posTop > 600 ? posTop - (isMobile ? 100 : 100) : posTop + (isMobile ? 15 : 100);
  const adjustedLeft = posLeft - (isMobile ? 15 : 35);

  const handleIsFound = async (character: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/gameLogics/isFound`,
        {
          timeTaken,
          cellId,
          character,
        },
        { withCredentials: true }
      );

      toast({
        title: response.data.correct
          ? `You Found ${character}!`
          : `${character} is not there :(`,
      });

      setCharArr(response.data.charactersFound);
    } catch (error) {
      toast({ title: `${error}` });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={`${adjustedTop}-${adjustedLeft}`} 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            top: `${adjustedTop}px`,
            left: `${adjustedLeft}px`,
          }}
          className="absolute z-50 bg-neutral-800 rounded-lg p-1 md:p-4 grid gap-[2px] md:gap-2 w-fit max-w-[90vw]"
        >
          {charList.map((char) =>
            charArr.includes(char.name) ? null : (
              <motion.div
                onClick={() => handleIsFound(char.name)}
                key={char.id}
                whileHover={{ scale: 1.03 }}
                className="flex items-center md:gap-1 bg-neutral-200 md:px-1 py-[2px] md:py-1 rounded"
              >
                <img
                  src={char.src}
                  alt={char.name}
                  className="w-2 h-2 pl-1 md:w-6 md:h-6 object-contain"
                />
                <p
                  className="text-[4px] md:text-sm font-bold px-2 py-0.5 rounded"
                >
                  {char.name}
                </p>
              </motion.div>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ChooseOption;
