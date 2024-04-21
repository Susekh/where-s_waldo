import { useNavigate } from "react-router-dom"
import { SlCarousel, SlCarouselItem } from "@shoelace-style/shoelace/dist/react"
import { Button, Card } from "antd"
import RevealOnScroll from "@/components/animation/RevealOnScroll"
import AnimatedPage from "@/components/animation/AnimatedPage"


interface charList {
  key : number;
  name : string;
  src : string;
}


const chars : Array<charList> = 
  [
    {
      key : 9893845,
      name : "waldo",
      src : "/images/characters/homePageImgs/waldo.png"
    },
    {
      key: 9987332,
      name : "wenda",
      src : "/images/characters/homePageImgs/wenda.png"
    },
    {
      key:9998734,
      name : "odlaw",
      src : "/images/characters/homePageImgs/odlaw.png"
    }
  ]


export default function Home() {

  const navigate = useNavigate()

  return (
    <AnimatedPage>
      <>
      <div className="relative md:h-[32rem] w-full h-56  overflow-hidden flex">
      <SlCarousel autoplay loop mouseDragging scrolling={false} className=" absolute md:h-full w-full">
        <SlCarouselItem>
          <img  src="/images/where-s-waldo-island-lighthouse-uro1jzxt4ghasrbc.jpg" className="object-top blur-sm" alt="island" />
        </SlCarouselItem>
        <SlCarouselItem>
          <img src="/images/where-s-waldo-comic-convention-45idn1a9ald1kq5v.jpg" className="blur-sm" alt="comic" />
        </SlCarouselItem>
      </SlCarousel>
      <div className="absolute w-full md:translate-x-1/3 md:translate-y-2/3 flex flex-col">
        <RevealOnScroll>
          <p className="  text-white text-9xl  font-BebasNeue">Find Waldo</p>
        </RevealOnScroll>
        <Button onClick={() => navigate("/play-game")}  type="primary" danger className="ml-32 w-44 h-16 text-2xl">Start Now</Button>
      </div>
    </div>
    

    <section className="text-left p-4 mt-">
      <div>
      <RevealOnScroll><p className=" z-10 relative translate-y-9 font-BebasNeue text-9xl text-red-500">WALDO & CHARS</p></RevealOnScroll>
      <div className="flex md:flex-row flex-col gap-16 md:gap-32">
        {
          chars.map((char) => (
            <div className="grid">
            <Card 
            key={char.key}
            className=" md:w-96 h-64 bg-neutral-300 hover:bg-red-900 overflow-clip rounded-none border-none" 
            cover={
              <img
                alt={char.name}
                src={char.src}
                className="overflow-hidden hover:opacity-25 transition-opacity duration-300 ease-in-out object-cover"
              />
              }
            />
            <RevealOnScroll><p className=" font-BebasNeue mt-8 textce text-white text-5xl">{char.name}</p></RevealOnScroll>
            
            </div>
            
          ))
        }
      </div>
      </div>
    </section>


    
    <div className=" text-left p-4 flex mt-24 flex-col gap-12">
      <RevealOnScroll><p className=" font-BebasNeue text-white text-9xl mt-8">WHERE IS WALDO?</p></RevealOnScroll>
      
      <RevealOnScroll>
        <div className=" flex md:flex-row flex-col-reverse  md:gap-72">
          <div className="md:w-96 md:ml-28 md:flex md:flex-col mt-12">
            <h2 className=" font-BebasNeue text-7xl text-white">WHO IS WALDO?</h2>
            <p className="text-white text-left mt-8">
            In a whirlwind world of colors and characters, Waldo stands out in his iconic red and white stripes. With each turn of the page, the challenge begins to find him hidden amidst the chaos. Join the adventure, sharpen your eyes, and embark on the quest to locate Waldo in the most unexpected places.
            </p>
            <Button  onClick={() => navigate("/play-game")}  type="primary" danger className="h-12 mt-8 w-44 text-xl" >FIND WALDO</Button>
          </div>

          <div className="overflow-hidden">
            <img src="/images/characters/waldo_wanted.png" className="md:h-[35rem] md:w-[30rem]" alt="" />
          </div>
        </div>
      </RevealOnScroll>
      
      
    </div>


        <section className="mt-20">
        
       
          <RevealOnScroll><p className="text-white text-9xl font-BebasNeue">MORE ABOUT WALDO</p></RevealOnScroll>
          <RevealOnScroll>
            <div className="md:flex mt-24 gap-44">
              <img
                src="/images/characters/waldo-home.png"
                width={800}
              />
              <p className="text-white md:w-68 md:w-96 text-left text-xl mt-20">Where's Waldo?" was born as a series of captivating puzzle books by Martin Handford in 1987, where readers were tasked with spotting the elusive character in densely packed illustrations. Now, we've translated that enchanting experience into a digital format, allowing you to enjoy the hunt on your device.</p>
            </div>
          </RevealOnScroll>
        
        </section>
      </>
    
    </AnimatedPage>
  )
}
