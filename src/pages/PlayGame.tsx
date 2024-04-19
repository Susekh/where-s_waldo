import GameBoard from "../components/GameBoard"
import RevealOnScroll from "@/components/animation/RevealOnScroll"
import { useMediaQuery } from "react-responsive"


function PlayGame() {
  const isDesktopOrLaptop = useMediaQuery({
      query: '(min-width: 1224px)'
  });

  const magnifierRadius = isDesktopOrLaptop ? 100 : 30;
  console.log(magnifierRadius);
  

  return (
      <RevealOnScroll>
          <GameBoard src="src/assets/beach.webp" magnifierRadius={magnifierRadius} />
      </RevealOnScroll>
  );
}

export default PlayGame