import GameBoard from "../components/GameBoard"
import RevealOnScroll from "@/components/animation/RevealOnScroll"
function PlayGame() {
  return (
      <RevealOnScroll>
        <GameBoard src="src/assets/beach.webp" />
      </RevealOnScroll>
  )
}

export default PlayGame