import games from "../data/games.json"
console.log(games)
import reviewIcon from "../assets/images/reviewIcon.png";
import useSlider from "../hooks/useSlider";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";



function Home() {
  const navigate = useNavigate();

  // Trending games slider
const {
  next: trendingNext,
  prev: trendingPrev,
  sliderRef: trendingSliderRef,
  currentCard: trendingCurrentCard,
  totalCards: trendingTotalCards,
  goToCard: trendingGoToCard,
} = useSlider(300);


// Tournaments slider
const {
  // next: tournamentNext,
  // prev: tournamentPrev,
  sliderRef: tournamentSliderRef,
} = useSlider(300);
 //  Best games slider
const {
  next: bestNext,
  prev: bestPrev,
  sliderRef: bestSliderRef,
  currentCard: bestCurrentCard,
  totalCards: bestTotalCards,
  goToCard: bestGoToCard,
} = useSlider(300);

 //  UpComing  games slider
const {
  next: upcomingNext,
  prev: upcomingPrev,
  sliderRef: upcomingSliderRef,
  currentCard: upcomingCurrentCard,
  totalCards: upcomingTotalCards,
  goToCard: upcomingGoToCard,
} = useSlider(300);

const isFutureDate = (date) => {
  const [day, month, year] = date.split("/");
    if (!date) {
    return false;
  }


  const releaseDate = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return releaseDate >= today;
};

const upcomingGames = games.filter((game) =>
  isFutureDate(game.releaseDate)
);
 const { addToCartItem } = useCart();
 


  return (
    <div>
  <main className="bg-[url('/images/games/mb-hero-bg.png')] md:bg-[url('/images/games/hero-bg.png')] bg-cover bg-center bg-no-repeat mt-10  md:min-h-[450px]   min-h-[300px]       flex md:pt-7 md:pb-30 pt-5 px-5 ">
    <div className="max-w-7xl mx-auto w-full flex items-start  md:items-center justify-between">
      <div className="w-full  min-[375px]:items-center min-[375px]:text-center sm:text-center flex flex-col md:items-start md:w-1/2">
        <h1 className="font-bold text-3xl   sm:text-4xl        md:text-[44px]                text-heading">
          Your Next Game is
        </h1>
        <h1 className="font-bold text-3xl   sm:text-4xl md:text-4xl  text-text">
          Just one Click away
        </h1>
        <p className="mt-4   text-sm sm:text-base  md:text-lg lg:text-xl  text-gray-300">
          Get instant CD keys for less – play in seconds.
        </p>
        <div className="mt-8  flex flex-wrap  gap-4">
          <a onClick={()=>navigate("/deals")}
            className="px-3 py-2  md:px-7  rounded-xl bg-heading  border-2 cursor-pointer border-heading">
           
            Browse Deals
          </a>
          <a  onClick={()=>navigate("/all-games")}
            className="px-3 py-2  md:px-7 rounded-xl border-2   border-heading cursor-pointer">
           
            View Games
          </a>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <h2 className="text-xl lg:text-2xl font-semibold">
          The Most
          <span className="text-heading"> Popular </span>
          Games
        </h2>
        <div className="flex items-end gap-4 mt-6">
          <div className="w-24 lg:w-38 xl:w-38">
            <img
              className="w-full rounded object-cover transition-transform duration-300 hover:translate-y-5 hover:scale-111"
              src="/images/games/heroimg1.png"
            />
          </div>
          <div className="w-24 lg:w-38 xl:w-38 h-28 md:43 lg:h-52 min-[800px]:h-33         min-[860px]:h-35           min-[990px]:h-38">
            <img
              className="w-full h-full rounded object-cover transition-transform duration-300 hover:translate-y-5 hover:scale-111"
              src="/images/games/heroimg2.jpg"
            />
          </div>
          <div className="w-24 lg:w-38 xl:w-38">
            <img
              className="w-full rounded object-cover transition-transform duration-300 hover:translate-y-5 hover:scale-111"
              src="/images/games/heroimg3.png"
            />
          </div>
          <div className="w-24 lg:w-38 xl:w-38">
            <img
              className="w-full rounded object-cover transition-transform duration-300 hover:translate-y-5 hover:scale-111"
              src="/images/games/heroimg4.png"
            />
          </div>
        </div>
        <p className="-mt-25 ml-30">
          <a
            className="inline-block  font-bold border-b-4   border-transparent  -m-20        hover:border-heading"
            href="#">
            Customer Reviews
          </a>
        </p>
      </div>
    </div>
  </main>

  
{/* Category Geos There */}

<section className="hidden md:block mx-2 md:mx-10 lg:mx-35 mt-20">
  <div className="grid grid-cols-12 gap-3">
    <div className="col-span-6 h-40 lg:h-52 xl:h-64 overflow-hidden rounded-2xl">
      <img
        src="/images/games/ca1.png"
        alt="Sports & Racing"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

    <div className="col-span-3 h-40 lg:h-52 xl:h-64 overflow-hidden rounded-2xl">
      <img
        src="/images/games/ca2.png"
        alt="RPG"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

    <div className="col-span-3 h-40 lg:h-52 xl:h-64 overflow-hidden rounded-2xl">
      <img
        src="/images/games/ca3.png"
        alt="Adventure"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

    <div className="col-span-3 h-40 lg:h-52 xl:h-64 overflow-hidden rounded-2xl">
      <img
        src="/images/games/ca4.png"
        alt="Strategy"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

  
    <div className="col-span-3 h-40 lg:h-52 xl:h-64 overflow-hidden rounded-2xl">
      <img
        src="/images/games/ca5.png"
        alt="Survival"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

  
    <div className="col-span-6 h-40 lg:h-52 xl:h-64 overflow-hidden rounded-2xl">
      <img
        src="/images/games/ca6.png"
        alt="Action"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

  </div>
</section>


{/* MObile View  */}

<section className="md:hidden px-2 mt-6">
  <div className="grid grid-cols-2 gap-3">

    <div className="h-56 overflow-hidden rounded-2xl">
      <img
        src="/images/games/cat1 (1).jpg"
        alt="Category"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

    <div className="h-56 overflow-hidden rounded-2xl">
      <img
        src="/images/games/cat1 (2).jpg"
        alt="Category"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

  </div>
</section>


{/* categoies ends there  */}

 {/* trending games section goes there */}
 <section className="h-auto md:mt-20 mt-0 px-2 lg:px-25">
  <div className="flex items-center justify-between gap-12 px-2 md:px-15 text-[12px]  md:text-[20px]">
    <p  className="font-semibold cursor-pointer ">Trending Games</p>
    <p className="text-heading cursor-pointer"
    onClick={()=>navigate("/trending-games")}>View All <i className="fa fa-angle-right"></i>
    </p>
  </div>

  <div className=" relative mt-3 md:mt-10">

  {/* Previous Button */}
  <button
    className="prev hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10text-[#A1A1AA] text-3xl transition duration-300 hover:bg-heading cursor-pointer bg-black/30 p-2 px-3 "
     onClick={trendingPrev} >
    <i className="fa fa-angle-left" />
  </button>
  
    {/* Slider Start here */}
  <div   className="overflow-hidden mx-2 md:mx-15 ">

    <div ref={trendingSliderRef}
      className="  flex   overflow-hidden  gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth  scrollbar-hide
      "
    >
      {/* .slice(0, 8) */}

      {games.slice(0,8).map((game) => (        
        <div
          key={game.id}
          className=" shrink-0 w-[140px] sm:w-[180px] md:w-[240px] lg:w-[240px]
            h-[220px]  sm:h-[270px] md:h-[330px] lg:h-[330px] border
            border-white rounded-xl p-2 "
          >
                      {/* Image */}
          <div
          onClick={() => navigate(`/game/${game.id}`)}
            className="
              relative h-[60%]  bg-cover  bg-center rounded-xl overflow-hidden group cursor-pointer "
            style={{
              backgroundImage: `url(${game.image})`,
            }}
          >
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
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
               onClick={() =>{ addToCartItem(game),navigate("/checkout")}}>
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
      next hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10 text-[#A1A1AA] text-3xl transition duration-300   hover:bg-heading cursor-pointer bg-black/30 p-2 px-3 "
      onClick={trendingNext} >
    <i className="fa fa-angle-right" />
  </button>


  {/* Pagination */}
<div className="flex justify-center items-center gap-3 mt-4 md:mt-8">
  {Array.from({ length: trendingTotalCards }).map((_, index) => (
    <button
      key={index}
      onClick={() => trendingGoToCard(index)}
      className={`rounded-full transition-all duration-300 ${
        trendingCurrentCard === index
          ? "w-2 h-2 md:w-4 md:h-4 bg-heading"
          : " w-1 h-1 md:w-3 md:h-3 bg-white"
      }`}
    />
  ))}
</div>

</div>
 </section>
 {/* trending game section ends here */}

 {/* Tournament section goes here */}
 <div>
  <section className="relative  px-2 lg:px-30   w-auto ">
   
    {/* <button className="prev hidden lg:block absolute left-0 top-2/7 -translate-y-1/2  ml-25        text-[#A1A1AA] text-3xl transition duration-300 hover:bg-heading cursor-pointer bg-black/30 p-2 px-3"
    onClick={tournamentPrev}>
      <i className="fa fa-angle-left" />
    </button> */}

  <div
    className="relative h-auto bg-cover bg-center bg-no-repeat md:mt-20 mt-4 py-6 md:mx-10"
    style={{
      backgroundImage: "url('/src/assets/images/tournament-bg.jpg')"
    }}
  >
    <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 65%, rgba(83,53,43,0.65) 0%, rgba(42,44,51,0.92) 50%, #2A2C33 100%)"
        }}
      ></div>
      
      <p className=" font-bold text-lg md:text-4xl mt-5 md:mt-15 text-heading text-center relative z-10 ">
        Join <span className="text-white">The Big Tournaments</span>
      </p>

      {/* scrollbar */}

      <div ref={tournamentSliderRef} className=" relative z-10 flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth  mt-5 scrollbar-hide">
       
          {/* Each game */}
          {
            games.filter((game)=>{
              return game.category === "FPS" || game.category === "Battle Royale"

            })
           .map((game)=>(
             <div key={game.id} className="card snap-start shrink-0 w-60 h-auto rounded-xl p-2  ">
             <div 
             onClick={() => navigate(`/game/${game.id}`)}
             className="h-70 bg-no-repeat bg-cover bg-center rounded-xl flex items-end relative overflow-hidden group cursor-pointer"
              style={{
              backgroundImage: `url(${game.image})`,
            }}
            >
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
            <div className=" bg-[linear-gradient(rgba(0,0,0,0.88),rgba(0,0,0,0.5))]  w-100 px-4 ">
              <p className="font-bold">{game.title}</p>
              <div className="flex gap-4"   
              onClick={() =>{ addToCartItem(game),navigate("/checkout")}}
                >
                <p   onClick={() =>{ addToCartItem(game),navigate("/checkout")}}>Buy Now  </p>
                <span>
                  <a href="#">
                    <i className="fa fa-long-arrow-right text-heading" />
                  </a>
                </span>
              </div>
            </div>
          </div>
          </div>

          ))      
        }
      </div>

      
        <BattleBanner  />
     

      <div className=" w-full lg:hidden items-center">
        <img className="w-auto" src="/images/games/mb-war.png" />
      </div>
    </div>
  </section>
</div>
{/* Tournament section ends here */}

{/* best games section goes there */}
 <section className="h-auto md:mt-20 mt-0 px-2 lg:px-25">
  <div className="flex items-center justify-between gap-12 px-2 md:px-15 text-[12px]  md:text-[20px]">
    <p  className="font-semibold cursor-pointer ">Best Games</p>
    <p className="text-heading cursor-pointer"
     onClick={()=>navigate("/best-games")}
     >View All <i className="fa fa-angle-right"></i>
    </p>
  </div>

  <div className=" relative mt-3 md:mt-10">

  {/* Previous Button */}
  <button
    className=" hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10text-[#A1A1AA] text-3xl transition duration-300 hover:bg-heading cursor-pointer bg-black/30 p-2 px-3 "
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
          onClick={() => navigate(`/game/${game.id}`)}
            className="
              relative  group  group-hover:bg-black/30 h-[60%]  bg-cover  bg-center rounded-xl "
            style={{
              backgroundImage: `url(${game.image})`,
            }}
          >
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>

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
                onClick={() =>{ addToCartItem(game),navigate("/checkout")}}>
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
      next hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10 text-[#A1A1AA] text-3xl transition duration-300  hover:bg-heading cursor-pointer bg-black/30 p-2 px-3 "onClick={bestNext} >
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
 {/* best game section ends here */}

 {/* upcoming games section goes here */}

 <div className="h-auto mt-20 px-2 lg:px-25">
  <div className="flex items-center justify-between gap-12 md:px-15 px-3 text-[12px] md:text-[20px]">
    <p className="font-semibold cursor-pointer">UpComing Games</p>
    <p className="text-heading cursor-pointer">
      View All <i className="fa fa-angle-right" />
    </p>
  </div>
  <div className=" relative md:mt-10 mt-4">
    <button className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10        text-[#A1A1AA] text-3xl transition duration-300 hover:bg-heading cursor-pointer bg-black/30 p-2 px-3"
    onClick={upcomingPrev}>
      <i className="fa fa-angle-left" />
    </button>
    <div className="overflow-hidden md:mx-15">
      <div ref={upcomingSliderRef} className=" flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
       
     
       {upcomingGames.map((game)=>(
         <div key={game.id} className=" snap-start shrink-0 w-35 md:w-60 lg:w-60 h-55 md:h-87 lg:h-87 border-2 border-heading rounded-xl p-2">
          <div 
          className="md:min-h-[70%] min-h-[63%]  bg-cover bg-center rounded-xl relative overflow-hidden group cursor-pointer"
          style={{
              backgroundImage: `url(${game.image})`,
            }}>
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
         </div>
          <div>
            <div className="flex justify-between mt-2 text-[9px] md:text-[18px]">
              <p>{game.title}</p>
            </div>
            <div className="flex justify-between mt-0 text-[9px] md:text-[18px]">
              <p>{game.price} $</p>
            </div>
            <div className="flex justify-between text-[9px] md:text-[15px] gap-2 items-center align-middle">
              <div className="flex gap-2 mt-2">
                <img
                  className=" h-5 w-5 object-contain"
                  src="/images/games/dateicon.png"
                />
                <span className="text-[#979797] break-all">{game.releaseDate}</span>
              </div>
              <div className="flex gap-2 break-all">
                <p>Pre-Order</p>
                <span>
                  <a href="#">
                    <i className="fa fa-long-arrow-right text-heading" />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
       ))}
      </div>
    </div>
    <button className="next hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10            text-[#A1A1AA] text-3xl transition duration-300 hover:bg-heading cursor-pointer bg-black/30 p-2 px-3"
    onClick={upcomingNext}>
      <i className="fa fa-angle-right cursor-pointer" />
    </button>
        {/* Pagination */}
    <div className="flex justify-center items-center gap-3 mt-4 md:mt-8">
      {Array.from({ length: upcomingTotalCards }).map((_, index) => (
        <button
          key={index}
          onClick={() => upcomingGoToCard(index)}
          className={`rounded-full transition-all duration-300 ${
          upcomingCurrentCard === index
              ? "w-2 h-2 md:w-4 md:h-4 bg-heading"
              : " w-1 h-1 md:w-3 md:h-3 bg-white"
          }`}
        />
      ))}
    </div>
  </div>
</div>

{/* upcoming game section ends here */}

{/* Play best game section goes here */}
<section className="px-4 md:px-40 h-auto md:mt-20 mt-10">
  <div className="lg:flex  w-full  justify-center    md:justify-between items-center">
    <div className=" w-full  lg:w-1/2 min-[375px]:items-center min-[375px]:text-center sm:text-center flex flex-col md:items-start ">
      <h1 className=" font-bold md:text-[44px] md:font-bold text-[25px] text-heading">
        Play Your Best Game
      </h1>
      <h1 className="font-bold text-[25px]  md:text-[44px] md:font-bold lg:text-[44px] text-text">
       
        & Collect Epic Deal
      </h1>
      <p className="text-sm lg:text-xl mt-2">
        Discover limited-time discounts on top-selling <br /> games, gift cards,
        and bundles.
        <br />
        New deals added every day — don’t miss out!
      </p>
      <div className="md:mt-10 mt-4 flex gap-4 ">
        <a onClick={()=>navigate("/deals")}
          className="  lg:px-4 lg:py-2   border-heading border-3 rounded-2xl bg-heading"
        >
        
          Browse Deals
        </a>
        <a onClick={()=>navigate("/pc-games")}
          className="lg:px-4 lg:py-2  rounded-2xl border-3 border-heading "
        >
          Views Games
        </a>
      </div>
    </div>
    <div className=" hidden lg:block lg:w-1/2 h-100 relative">
      <img className="w-full object-cover h-100" src="/images/games/CTA.png" />
      <div className="absolute inset-0 bg-gradient-to-tl bg-gradient-to-br from-header via-transparent to-transparent"></div>
    </div>
  </div>
</section>
{/* {play best game section ends here} */}

{/* Customer Review section goes here */}
<section className="mt-10 px-5 lg:px-40 slider-wrapper ">
 <div className="flex justify-between items-center">
   <p className="font-semibold text-xl">Customer Reviews</p>
   <p className="text-heading cursor-pointer">View All <i className="fa fa-angle-right"></i></p>
 </div>
  <div className="mt-10 flex justify-between slider  overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide md:p-12">
    <div className=" relative w-70 shrink-0 h-80">
      <div className="absolute inset-0   mt-3  -ml-3                 ">
        <img src="/images/games/Vector 8.png" />
      </div>
      <div className="absolute inset-4                  flex flex-col items-center justify-center p-8 rotate-3 bg-[url('/images/games/Vector9.png')] bg-cover bg-center">
        <img
          className="w-20 h-20 object-cover rounded-full -mt-10 "
          src="/images/games/customer1.jpg"
        />
        <h2 className="mt-4 text-3xl font-bold text-white">Leo</h2>
        <div className="text-orange-500 text-xl">★★★★☆</div>
        <p className="mt-4 text-center text-gray-300">
          Step into a world where every click leads to a new adventure.
        </p>
      </div>
    </div>
    <div className=" relative w-80 shrink-0 h-90">
      <div className="absolute inset-0  mt-3                   ">
        <img className="object-cover" src="/images/games/Vector2-2.png" />
      </div>
      <div className="absolute inset-3 -ml-10                  flex flex-col items-center justify-center p-8 bg-[url('/images/games/Vector2-1.png')] bg-cover bg-center">
        <img
          className="w-20 h-20 object-cover rounded-full -mt-10 "
          src="/images/games/customer2.jpg"
        />
        <h2 className="mt-4 text-3xl font-bold text-white">Hannah Schmitt</h2>
        <div className="text-orange-500 text-xl">★★★★☆</div>
        <p className="mt-4 text-center text-gray-300">
          Get ready to level up your fun! This site delivers thrilling games,
          non-stop updates, and a smooth, blazing-fast experience that keeps you
          hooked for hours.
        </p>
      </div>
    </div>
    <div className=" relative w-70 shrink-0 h-80">
      <div className="absolute inset-0   mt-3  -mr-3                 ">
        <img src="/images/games/Vector3-1.png" />
      </div>
      <div className="absolute inset-4                  flex flex-col items-center justify-center p-8 rotate-3 bg-[url('/images/games/Vector3-2.png')] bg-cover bg-center">
        <img
          className="w-20 h-20 object-cover rounded-full -mt-10 "
          src="/images/games/customer3.jpg"
        />
        <h2 className="mt-4 text-3xl font-bold text-white">Alex</h2>
        <div className="text-orange-500 text-xl">★★★★☆</div>
        <p className="mt-4 text-center text-gray-300">
          Step into a world where every click leads to a new adventure.
        </p>
      </div>
    </div>
  </div>
 
</section>
{/* <CustomerReviews /> */}
{/* Customer review section ends here */}

{/* Blog Post section goes here */}
<div className=" items-center justify-around flex-nowrap ml-2 lg:mx-40 mt-20 ">
  <div className="flex justify-between gap-12 items-center px-4 text-xl">
    <p className="font-semibold "> Post Blog </p>
    <p className=" text-heading cursor-pointer"
    onClick={()=>navigate("/blog")}>
      View All <i className="fa fa-angle-right " />
    </p>
  </div>
  <div className="flex gap-3 w-full  justify-between mt-5 overflow-y-auto  md:overflow-y-hidden  scrollbar-hide mx-2">
    <div className="col-span-2 w-[80%]  lg:w-1/2 gap-5 shrink-0 flex           bg-[url('/images/games/post1.jpg')] bg-no-repeat bg-cover rounded  items-end  p-4 md:h-80 h-40 ">
      <p className="font-semibold">
        FC25 Prepares for October 2024 Release with Enhanced Realism
      </p>
    </div>
    <div className=" lg:hidden col-span-2 w-[80%]  lg:w-1/2 gap-5 shrink-0 flex           bg-[url('/images/games/post2.jpg')] bg-no-repeat bg-cover rounded  items-end  p-4 md:h-80 h-40 ">
      <p className="font-semibold">
        FC25 Prepares for October 2024 Release with Enhanced Realism
      </p>
    </div>
    <div className=" lg:hidden col-span-2 w-[80%]  lg:w-1/2 gap-5 shrink-0 flex           bg-[url('/images/games/post3.jpg')] bg-no-repeat bg-cover rounded  items-end  p-4 md:h-80 h-40 ">
      <p className="font-semibold">
        FC25 Prepares for October 2024 Release with Enhanced Realism
      </p>
    </div>
    <div className=" w-full hidden lg:grid grid-cols-2 lg:grid-cols-2 lg:w-1/2 gap-5 ">
      <div className=" shrink-0 bg-[url('/images/games/post2.jpg')] bg-no-repeat bg-cover rounded flex items-end  p-4">
        <p className="font-semibold">
          FC25 Prepares for October 2024 Release with Enhanced Realism
        </p>
      </div>
      <div className=" shrink-0 bg-[url('/images/games/post3.jpg')] bg-no-repeat bg-cover rounded flex items-end  p-4">
        <p className="font-semibold">
          The Witcher 4 Expected to Bring Back Fan-Favorite Characters
        </p>
      </div>
      <div className=" shrink-0 bg-[url('/images/games/post4.jpg')] bg-no-repeat bg-cover rounded flex items-end  p-4">
        <p className="font-semibold">
          Marvel’s Wolverine Set for an Epic 2025 Launch on PS5
        </p>
      </div>
      <div className=" shrink-0 bg-[url('/images/games/post5.jpg')] bg-no-repeat bg-cover rounded flex items-end  p-4">
        <p className="font-semibold">
          Star Wars Outlaws Combines Open-World Action and Storytelling
        </p>
      </div>
    </div>
  </div>
</div>
{/* Categories section ends here */}
</div>
  )
}

export default Home





import frame from "../assets/images/frame.png";
import man1 from "../assets/images/man1.png";
import man2 from "../assets/images/man2.png";

const BattleBanner = () => {
  return (
    <section className=" relative z-10 w-full bg-transparent px-3 py-5 sm:px-6 lg:px-20   ">
      <div className="relative mx-auto md:mt-20 w-full max-w-[1200px] aspect-[627/221] overflow-visible">
       {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.5))]"></div> */}

        {/* FRAME */}
        <img
          src={frame}
          alt=""
          className="absolute inset-0 z-5 sm:h-70 md:h-43 lg:h-43 xl:h-70 w-full object-fill pointer-events-none select-none"
        />

        {/* LEFT MAN */}
        <img
          src={man1}
          alt="Battle character"
         
          className="absolute z-[10] left-[-29%] md:left-[-25%] lg:left-[-29%] bottom-[11%] md:bottom-[38%] [@media(min-width:768px)_and_(max-width:900px)]:bottom-[25%] lg:bottom-[26%] sm:h-[94%] md:h-[74%] lg:h-[94%] xl:h-[94%] w-auto max-w-[63%]  object-contain object-bottom pointer-events-none select-none"
        />

        {/* RIGHT MAN */}
        <img
          src={man2}
          alt="Battle character"
          className="absolute z-[10] right-[-1%] 
          [@media(min-width:768px)_and_(max-width:900px)]:bottom-[23%]
          bottom-[8%] md:bottom-[36%] lg:bottom-[23%] sm:h-[94%] md:h-[74%] lg:h-[104%] w-auto max-w-[63%] scale-x-[-1] object-contain object-bottom pointer-events-none select-none"
        />

        {/* CENTER CONTENT */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center px-[29%] text-center lg:bottom-[15%] md:bottom-[25%] lg:bottom-[15%]">
          <div className="w-full max-w-[390px]">

                      {/* TITLE */}
            <h1 className="font-extrabold leading-none text-white text-[clamp(16px,3vw,36px)] max-sm:text-[12px]">
              Ready for{" "}
              <span className="text-[#ff681b]">Battle</span>
              <span className="text-white">?</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-[1.2%] max-w-[450px] text-[clamp(6px,0.9vw,14px)] font-medium leading-[1.45] text-white/80 max-sm:text-[5px]">
              Dive into thrilling esports tournaments, global gaming events,
              and epic community challenges. 
            </p>

            {/* BUTTON */}
            <button
              type="button"
              className=" mt-[3%] md:mt-[2%] rounded-md bg-[#ff681b] px-[clamp(12px,2vw,28px)] py-[clamp(5px,0.7vw,11px)] text-[clamp(6px,0.7vw,12px)] font-bold uppercase tracking-wide text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-[#ff7b36]  cursor-pointer max-sm:text-[5px] max-sm:px-2 max-sm:py-1"
            >
              Join Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};


