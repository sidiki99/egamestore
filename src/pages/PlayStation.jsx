
import reviewIcon from "../assets/images/reviewIcon.png";
import games from "../data/games.json"

import { useNavigate } from "react-router-dom";
import useSlider from "../hooks/useSlider";
import useCart from "../hooks/useCart";
import PCGames from "./PCGames";




export default function PlayStation(){
  return(
    <div className="md:px-20 px-1.5">
    <HeroBanner />
    <AllGames />
    <PopularGames />
    <PCGames />
    <DeliveryPlatforms />
    </div>
  )
}
const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden mt-2 bg-[#171B22]  rounded-xl">
      <div className="mx-auto flex min-h-[520px] max-w-7xl flex-col items-center justify-between gap-10 px-6 py-12 md:flex-row  ">

        {/* LEFT CONTENT */}
        <div className="z-10 w-full md:w-1/2 flex justify-center md:justify-start">
          <div>
            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Play
            <span className="block text-[#FF6B1A]">
              Has No
            </span>
            <span className="block">
              Limits
            </span>
          </h1>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-lg bg-[#FF6B1A] px-8 py-3 font-semibold text-white transition duration-300 hover:bg-[#E85D0F]">
              Shop Now
            </button>

            <button className="rounded-lg border border-[#FF6B1A] px-8 py-3 font-semibold text-white transition duration-300 hover:bg-[#FF6B1A]">
              Learn More
            </button>
          </div>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex w-full justify-center md:w-1/2">
          <div className="absolute h-72 w-72 rounded-full bg-[#FF6B1A]/10 blur-3xl"></div>

          <img
            src="../src/assets/images/playstationHero.png"
            alt="Gaming Controller"
            className="relative z-10 w-full max-w-[550px] object-contain drop-shadow-[0_0_35px_rgba(255,107,26,0.25)]"
          />
        </div>

      </div>
    </section>
  );
};

 {/* best game section ends here */}
function AllGames(){
  const navigate=useNavigate();
 
  return(
   
 <section className="h-auto md:mt-20 mt-10   ">
  <div className="flex items-center gap-12 px-2 md:px-15 text-[12px]  md:text-[20px]">
    <p  className="font-semibold cursor-pointer ">All Games</p>   
  </div>

  <div className=" relative mt-3 md:mt-10">
  <div   className="overflow-hidden mx-2 md:mx-15 ">
    <div
      className=" flex flex-wrap   justify-center lg:justify-start overflow-hidden  gap-5 overflow-x-auto scroll-smooth  scrollbar-hide
      "
    >

     {games.map((game) => (
  <div
    key={game.id}
    className="shrink-0 w-[130px] h-[130px] sm:w-[190px] sm:h-[190px] border border-white hover:border-heading rounded-xl p-2 cursor-pointer transition duration-300"
  >
    <div className="group relative h-full w-full overflow-hidden rounded-xl">
     
      <img
        src={game.image}
        alt={game.title}
        className="h-full w-full rounded-xl object-cover transition duration-300 group-hover:scale-105"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition duration-300 group-hover:opacity-100">
        <button
          onClick={() => navigate(`/game/${game.id}`)}
          className="rounded-lg bg-heading px-5 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-heading/90"
        >
          View
        </button>
      </div>
    </div>
  </div>
))}

    </div>
  </div>
</div>
 </section>

  )
}

 {/* All game section ends here */}
 {/* best games section goes there */}
function PopularGames(){
   const navigate = useNavigate();
    const { addToCartItem } = useCart();
   //  Best games slider
   const {
     next: bestNext,
     prev: bestPrev,
     sliderRef: bestSliderRef,
     currentCard: bestCurrentCard,
     totalCards: bestTotalCards,
     goToCard: bestGoToCard,
   } = useSlider(300);
  return(
   
     <section className="h-auto md:mt-20 mt-0 bg-[#171B22]  rounded-xl py-5 px-2">
      <div className="flex items-center gap-12 px-2 md:px-15 text-[12px]  md:text-[20px]">
        <p  className="font-semibold cursor-pointer ">Popular Games</p>
        <p className="text-heading cursor-pointer">View All <i className="fa fa-angle-right"></i>
        </p>
      </div>
    
      <div className=" relative mt-3 md:mt-10">
    
      {/* Previous Button */}
      <button
        className=" hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10text-[#A1A1AA] text-3xl transition duration-300 hover:text-heading cursor-pointer "
         onClick={bestPrev} >
        <i className="fa fa-angle-left" />
      </button>
      
        {/* Slider Start here */}
      <div   className="overflow-hidden mx-2 md:mx-15 ">
    
        <div ref={bestSliderRef}
          className="  flex   overflow-hidden  gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth  scrollbar-hide
          "
        >
          {/* .slice(0, 8) */}
    
          {games.filter((game)=>(
             game.rating > 94
          )).map((game) => (        
            <div
              key={game.id}
              className=" shrink-0 w-[140px] sm:w-[180px] md:w-[240px] lg:w-[240px]
                h-[220px]  sm:h-[270px] md:h-[330px] lg:h-[330px] border
                border-white rounded-xl p-2 "
              >
                          {/* Image */}
              <div
                className="
                  relative h-[60%]  bg-cover  bg-center rounded-xl "
                style={{
                  backgroundImage: `url(${game.image})`,
                }}
              >
                {/* Discount Section */}
                <span
                  className=" inline-block bg-heading  px-2    md:px-3  py-1  rounded-xl
                    text-[9px]  md:text-[18px]  "
                >
                  {game.discount}%
                </span>
              </div>
    
              {/* Game Info */}
              <div>
                <div
                  className=" flex  justify-between items-center  mt-2 text-[9px] md:text-[18px]"
                >
                  <p className="truncate mr-2">
                    {game.title}
                  </p>
    
                  <div className="text-orange-500 shrink-0">
                    ★★★★☆
                  </div>
                </div>
    
    
                {/* Price + Review */}
                <div
                  className=" flex justify-between items-center  mt-2 text-[9px] md:text-[18px] "
                >
                  <div>
                    {game.oldPrice && (
                      <span className="line-through text-gray-400 mr-1 text-sm">
                        {game.oldPrice}$
                      </span>
                    )}
    
                    <span>
                      {game.price}$
                    </span>
                  </div>
    
                  <div className="flex items-center gap-1 text-white">
                    <img
                      src={reviewIcon} alt="Reviews"
                      className="w-4 md:w-6"
                    />
    
                    <span className="text-yellow-400">
                      {game.rating}
                    </span>
                     <span className=" text-gray-400">
                      /100
                    </span>
                  </div>
                </div>
    
    
                          {/* Buttons */}
                <div className="flex justify-between gap-2 mt-2 text-[9px] md:text-[16px] w-full">
                  <button className="border border-heading rounded-md px-1 md:px-3 py-1 md:py-2 whitespace-nowrap flex-1 min-w-0"
                  onClick={() => addToCartItem(game)}>
                    Add  cart
                  </button>
    
                  <button className="border-2 border-heading bg-heading rounded-md px-1 md:px-3 py-1 md:py-2 whitespace-nowrap flex-1 min-w-0"
                  onClick={() => navigate(`/game/${game.id}`)}>
                    Buy it Now
                  </button>
                </div>
    
              </div>
    
            </div>
    
          ))}
    
        </div>
      </div>
    
    
      {/* Next Button */}
      <button
        className="
          next hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10 text-[#A1A1AA] text-3xl transition duration-300 hover:text-heading  cursor-pointer "onClick={bestNext} >
        <i className="fa fa-angle-right" />
      </button>
    
    
      {/* Pagination */}
    <div className="flex justify-center items-center gap-3 mt-4 md:mt-8">
      {Array.from({ length: bestTotalCards }).map((_, index) => (
        <button
          key={index}
          onClick={() => bestGoToCard(index)}
          className={`rounded-full transition-all duration-300 ${
            bestCurrentCard === index
              ? "w-2 h-2 md:w-4 md:h-4 bg-heading"
              : " w-1 h-1 md:w-3 md:h-3 bg-white"
          }`}
        />
      ))}
    </div>
    
    </div>
     </section>
    
  )
}

 {/* best game section ends here */}
 {/* Dilivery Platforms */}

 function DeliveryPlatforms(){
  return(
      

             <div className="border border-gray-400 rounded-lg p-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 mt-2">

                  {/* Platform */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black flex items-center justify-center">
                      <img
                        src="../src/assets/images/platform.png"
                        alt="Platform"
                        className="w-5 h-5"
                      />
                    </div>

                    <div>
                      <p className="text-white text-sm">
                        Platform
                      </p>
                      <p className="text-gray-400 text-[9px] mt-1">
                        Win/XB One/XB XS
                      </p>
                    </div>
                  </div>


                  {/* Region */}
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">
                      🌎
                    </div>

                    <div>
                      <p className="text-white text-sm">
                        Region
                      </p>
                      <p className="text-gray-400 text-[9px] mt-1">
                        Global
                      </p>
                    </div>
                  </div>
                  {/* Delivery */}
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      🚚
                    </div>

                    <div>
                      <p className="text-white text-sm">
                        Delivery
                      </p>
                      <p className="text-gray-400 text-[9px] mt-1">
                        Online
                      </p>
                    </div>
                  </div>

            </div>
  )
 }