import GameBoard from "../components/GameBoard"
import RevealOnScroll from "@/components/animation/RevealOnScroll"
import { useApp } from "@/context/appContext";
import { useMediaQuery } from "react-responsive"
import { useEffect } from "react";


function PlayGame() {

    const { setGameTime } = useApp()

  const isMobile = useMediaQuery({
      query: '(min-width: 767px)'
  });

  const magnifierRadius = isMobile ? 100 : 30;
  
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
          <GameBoard src="/images/beach.webp" magnifierRadius={magnifierRadius} />
      </RevealOnScroll>
  );
}

export default PlayGame