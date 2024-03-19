import { useNavigate } from "react-router-dom"


export default function Home() {

  const navigate = useNavigate()

  return (
    <div className="text-center p-16 flex flex-col gap-12">
      <div className="">
      <p className="text-white sm:text-2xl">
      In a whirlwind world of colors and characters, Where's Waldo stands out in his iconic red and white stripes. With each turn of the page, the challenge begins to find him hidden amidst the chaos. Join the adventure, sharpen your eyes, and embark on the quest to locate Waldo in the most unexpected places.
      </p>
      </div>
      <div className="">
        <button onClick={() => navigate("/play-game")} className="text-white bg-neutral-500 p-4 rounded-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Start Playing
        </button>
      </div>
    </div>
  )
}
