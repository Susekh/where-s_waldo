import AnimatedPage from "@/components/animation/AnimatedPage";
import RevealOnScroll from "@/components/animation/RevealOnScrollEnhanced";
import Button from "@/components/ui/HomeButton";
import Card from "@/components/ui/HomeCard";
import SlCarousel from "@/components/ui/SlCarousel";
import SlCarouselItem from "@/components/ui/SlCarouselItem";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface CharList {
  id: string;
  name: string;
  src: string;
}

const chars: CharList[] = [
  {
    id: uuidv4(),
    name: "waldo",
    src: "/images/characters/homePageImgs/waldo.png",
  },
  {
    id: uuidv4(),
    name: "wenda",
    src: "/images/characters/homePageImgs/wenda.png",
  },
  {
    id: uuidv4(),
    name: "odlaw",
    src: "/images/characters/homePageImgs/odlaw.png",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <div className="bg-black min-h-screen">
        {/* Hero Section */}
        <div className="relative h-64 sm:h-80 md:h-[32rem] w-full overflow-hidden flex">
          <SlCarousel
            autoplay
            loop
            mouseDragging
            scrolling={false}
            className="absolute h-full w-full"
          >
            <SlCarouselItem>
              <img
                src="/images/where-s-waldo-island-lighthouse-uro1jzxt4ghasrbc.jpg"
                className="w-full h-full object-cover object-top blur-sm scale-105 hover:scale-100 transition-transform duration-[8s] ease-out"
                alt="island"
              />
            </SlCarouselItem>
            <SlCarouselItem>
              <img
                src="/images/where-s-waldo-comic-convention-45idn1a9ald1kq5v.jpg"
                className="w-full h-full object-cover blur-sm scale-105 hover:scale-100 transition-transform duration-[8s] ease-out"
                alt="comic"
              />
            </SlCarouselItem>
          </SlCarousel>

          {/* overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/50 z-10"></div>

          <div className="absolute inset-0 flex items-center justify-center md:pb-20 z-10">
            <div className="text-center px-4 w-full max-w-lg">
              <RevealOnScroll>
                <p className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-Jersey10 drop-shadow-2xl leading-tight">
                  Find Waldo
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={300}>
                <Button
                  onClick={() => navigate("/play-game")}
                  type="primary"
                  danger
                  className="mt-6 w-36 sm:w-44 h-12 font-Jersey10 sm:h-16 text-lg sm:text-3xl pulse-on-hover mx-auto md:mx-0"
                >
                  Start Now
                </Button>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        {/* Characters Section*/}
        <section className="text-left p-4 sm:p-6 md:p-8 mt-12 md:mt-16">
          <div>
            <RevealOnScroll>
              <p className="z-10 relative translate-y-4 sm:translate-y-6 md:translate-y-9 font-Jersey10 text-4xl sm:text-6xl md:text-7xl lg:text-9xl text-red-500 drop-shadow-lg text-center md:text-left">
                WALDO & CHARS
              </p>
            </RevealOnScroll>
            <div className="flex flex-col md:flex-row  gap-6 sm:gap-8 md:gap-16 lg:gap-32 mt-8 md:mt-12 justify-center md:justify-start">
              {chars.map((char, index) => (
                <RevealOnScroll key={char.id} delay={index * 200}>
                  <div className="grid max-w-sm mx-auto md:mx-0">
                    <Card
                      className="w-full sm:w-80 md:w-72 lg:w-96 h-48 sm:h-56 md:h-64 bg-gradient-to-br from-neutral-300 to-neutral-400 hover:from-red-900 hover:to-red-800 rounded-lg border-2 border-transparent hover:border-red-500 shadow-xl hover:shadow-2xl hover:shadow-red-500/25"
                      cover={
                        <img
                          alt={char.name}
                          src={char.src}
                          className="w-full h-full object-cover hover:opacity-90 transition-all duration-500 group-hover:scale-110"
                        />
                      }
                    />
                    <p className="font-Jersey10 mt-4 sm:mt-6 md:mt-8 text-center text-white text-3xl sm:text-4xl md:text-5xl capitalize drop-shadow-lg hover:text-red-400 transition-colors duration-300 cursor-default">
                      {char.name}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Who is Waldo Section*/}
        <div className="text-left p-4 sm:p-6 md:p-8 items-center flex mt-16 sm:mt-20 md:mt-24 flex-col gap-8 sm:gap-10 md:gap-12">
          <RevealOnScroll>
            <p className="font-Jersey10  text-white text-4xl sm:text-6xl md:text-7xl lg:text-9xl mt-4 sm:mt-6 md:mt-8 drop-shadow-lg text-center md:text-left">
              WHERE IS WALDO?
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="flex flex-col-reverse md:flex-row gap-8 sm:gap-12 md:gap-24 lg:gap-32 xl:gap-72 items-center">
              <div className="w-full md:w-96 md:ml-0 lg:ml-28 flex flex-col space-y-4 sm:space-y-6 text-center md:text-left">
                <h2 className="font-Jersey10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg">
                  WHO IS WALDO?
                </h2>
                <p className="text-white text-left leading-relaxed text-base sm:text-lg opacity-90 hover:opacity-100 transition-opacity duration-300 max-w-2xl mx-auto md:mx-0">
                  In a whirlwind world of colors and characters, Waldo stands
                  out in his iconic red and white stripes. With each turn of the
                  page, the challenge begins to find him hidden amidst the
                  chaos. Join the adventure, sharpen your eyes, and embark on
                  the quest to locate Waldo in the most unexpected places.
                </p>
                <Button
                  onClick={() => navigate("/play-game")}
                  type="primary"
                  danger
                  className="h-10 sm:h-12 w-36 sm:w-44 text-lg sm:text-xl mx-auto md:mx-0"
                >
                  FIND WALDO
                </Button>
              </div>

              <div className="overflow-hidden rounded-lg shadow-2xl hover:shadow-red-500/20 transition-shadow duration-500 flex-shrink-0">
                <img
                  src="/images/characters/waldo_wanted.png"
                  className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-[30rem] h-auto hover:scale-105 transition-transform duration-500"
                  alt="Waldo Wanted Poster"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* More About Waldo Section*/}
        <section className="mt-16 flex flex-col items-center sm:mt-20 p-4 sm:p-6 md:p-8">
          <RevealOnScroll>
            <p className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-Jersey10 text-center md:text-left drop-shadow-lg">
              MORE ABOUT WALDO
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <div className="flex flex-col justify-center md:flex-row mt-12 sm:mt-16 md:mt-24 gap-8 sm:gap-12 md:gap-16 lg:gap-44 items-center">
              <div className="flex-shrink-0 overflow-hidden rounded-lg shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:scale-105 order-1 md:order-none">
                <img
                  src="/images/characters/waldo-home.png"
                  className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-[800px] h-auto"
                  alt="Waldo at home"
                />
              </div>
              <div className="w-full md:w-96 order-2 md:order-none">
                <p className="text-white text-left text-base sm:text-lg md:text-xl leading-relaxed opacity-90 hover:opacity-100 transition-opacity duration-300 max-w-2xl mx-auto md:mx-0">
                  "Where's Waldo?" was born as a series of captivating puzzle
                  books by Martin Handford in 1987, where readers were tasked
                  with spotting the elusive character in densely packed
                  illustrations. Now, we've translated that enchanting
                  experience into a digital format, allowing you to enjoy the
                  hunt on your device.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </section>
      </div>
    </AnimatedPage>
  );
}
