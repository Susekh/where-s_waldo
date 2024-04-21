import GameBoard from "../components/GameBoard"
import RevealOnScroll from "@/components/animation/RevealOnScroll"
import { useApp } from "@/context/appContext";
import { useMediaQuery } from "react-responsive"
import { useEffect } from "react";


function PlayGame() {

    const { setGameTime } = useApp()

  const isDesktopOrLaptop = useMediaQuery({
      query: '(min-width: 1224px)'
  });

  const magnifierRadius = isDesktopOrLaptop ? 100 : 30;
  console.log(magnifierRadius);
  
  useEffect(() => {
    const timerId = setTimeout(() => {
        setGameTime((gameTime) => gameTime + 1);
    }, 1000);

    return () => {
        clearTimeout(timerId);
    };
  });

  return (
      <RevealOnScroll>
          <GameBoard src="src/assets/beach.webp" magnifierRadius={magnifierRadius} />
      </RevealOnScroll>
  );
}

export default PlayGame