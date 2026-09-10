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
  next: tournamentNext,
  prev: tournamentPrev,
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
  <main className="bg-[url('../src/assets/images/mb-hero-bg.png')] md:bg-[url('../src/assets/images/hero-bg.png')] bg-cover bg-center bg-no-repeat mt-10  md:min-h-[450px]   min-h-[300px]       flex md:pt-7 md:pb-30 pt-5 px-5 ">
    <div className="max-w-7xl mx-auto w-full flex items-start  md:items-center justify-between">
      <div className="w-full  min-[375px]:items-center min-[375px]:text-center sm:text-center flex flex-col md:items-start md:w-1/2">
        <h1 className="font-bold text-3xl   sm:text-4xl        md:text-4xl                text-heading">
          Your Next Game is
        </h1>
        <h1 className="font-bold text-3xl   sm:text-4xl md:text-4xl  text-text">
          Just one Click away
        </h1>
        <p className="mt-4   text-sm sm:text-base  md:text-lg lg:text-xl  text-gray-300">
          Get instant CD keys for less – play in seconds.
        </p>
        <div className="mt-8  flex flex-wrap  gap-4">
          <a
            className="px-3 py-2  md:px-7  rounded-xl bg-heading  border-2 border-heading"
            href="#">
            Browse Deals
          </a>
          <a
            className="px-3 py-2  md:px-7 rounded-xl border-2   border-heading"
            href="#">
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
              src="../src/assets/images/heroimg1.png"
            />
          </div>
          <div className="w-24 lg:w-38 xl:w-38 h-28 md:43 lg:h-52 min-[800px]:h-33         min-[860px]:h-35           min-[990px]:h-38">
            <img
              className="w-full h-full rounded object-cover transition-transform duration-300 hover:translate-y-5 hover:scale-111"
              src="../src/assets/images/heroimg2.jpg"
            />
          </div>
          <div className="w-24 lg:w-38 xl:w-38">
            <img
              className="w-full rounded object-cover transition-transform duration-300 hover:translate-y-5 hover:scale-111"
              src="../src/assets/images/heroimg3.png"
            />
          </div>
          <div className="w-24 lg:w-38 xl:w-38">
            <img
              className="w-full rounded object-cover transition-transform duration-300 hover:translate-y-5 hover:scale-111"
              src="../src/assets/images/heroimg4.png"
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

<section className="hidden md:block mx-2 md:mx-10 lg:mx-15 xl:mx-20 mt-20">
  <div className="grid grid-cols-12 gap-3">
    <div className="col-span-6 h-40 lg:h-52 xl:h-64 overflow-hidden rounded-2xl">
      <img
        src="../src/assets/images/ca1.png"
        alt="Sports & Racing"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

    <div className="col-span-3 h-40 lg:h-52 xl:h-64 overflow-hidden rounded-2xl">
      <img
        src="../src/assets/images/ca2.png"
        alt="RPG"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

    <div className="col-span-3 h-40 lg:h-52 xl:h-64 overflow-hidden rounded-2xl">
      <img
        src="../src/assets/images/ca3.png"
        alt="Adventure"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

    <div className="col-span-3 h-40 lg:h-52 xl:h-64 overflow-hidden rounded-2xl">
      <img
        src="../src/assets/images/ca4.png"
        alt="Strategy"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

  
    <div className="col-span-3 h-40 lg:h-52 xl:h-64 overflow-hidden rounded-2xl">
      <img
        src="../src/assets/images/ca5.png"
        alt="Survival"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

  
    <div className="col-span-6 h-40 lg:h-52 xl:h-64 overflow-hidden rounded-2xl">
      <img
        src="../src/assets/images/ca6.png"
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
        src="../src/assets/images/cat1 (1).jpg"
        alt="Category"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

    <div className="h-56 overflow-hidden rounded-2xl">
      <img
        src="../src/assets/images/cat1 (2).jpg"
        alt="Category"
        className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
      />
    </div>

  </div>
</section>


{/* categoies ends there  */}

 {/* trending games section goes there */}
 <section className="h-auto md:mt-20 mt-0 px-2 lg:px-25">
  <div className="flex items-center gap-12 px-2 md:px-15 text-[12px]  md:text-[20px]">
    <p  className="font-semibold cursor-pointer ">Trending Games</p>
    <p className="text-heading cursor-pointer">View All <i className="fa fa-angle-right"></i>
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
  <section className=" px-2 lg:px-30  relative w-auto ">
   
    <button className="prev hidden lg:block absolute left-0 top-2/7 -translate-y-1/2  ml-25        text-[#A1A1AA] text-3xl transition duration-300 hover:bg-heading cursor-pointer bg-black/30 p-2 px-3"
    onClick={tournamentPrev}>
      <i className="fa fa-angle-left" />
    </button>

    <div className="h-auto  bg-[linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.5)),url('../src/assets/images/tournament-bg.jpg')] bg-cover bg-center bg-no-repeat md:mt-20 mt-4 bg-header py-6  md:mx-10 ">

      <p className=" font-bold text-lg md:text-4xl mt-5 md:mt-15 text-heading text-center ">
        Join <span className="text-white">The Big Tournaments</span>
      </p>

      {/* scrollbar */}

      <div ref={tournamentSliderRef} className=" flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth  mt-5 scrollbar-hide">
       
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

      <button className="next hidden lg:block absolute right-0 top-2/7 -translate-y-1/2 mr-25            text-[#A1A1AA] text-3xl transition duration-300 hover:bg-heading cursor-pointer bg-black/30 p-2 px-3"
      onClick={tournamentNext}>
        <i className="fa fa-angle-right cursor-pointer" />
      </button>
      {/* // LOwer section */}

      <div className="pagination flex justify-center gap-3 mt-8" />
      <div className=" hidden lg:block overflow-y-auto">
        <div className=" min-w-225 mx-30 my-20 shrink-0">
          <img className="w-full relative " src="../src/assets/images/frame.png" />
          <img className="h-90 -mt-93 -ml-80" src="../src/assets/images/man1.png" />
          <div className="-mt-68 ml-100 absolute center-0 w-[200px]  grid place-content-center justify-center flex-nowrap">
            <h1 className="text-2xl font-bold">
              Ready For <span className="text-heading">Battle</span>?
            </h1>
            <p className="text-center">
              Dive into thrilling esports tournaments, global gaming events, and
              epic community challenges. Victory awaits.
            </p>
            <button className="px-2 py-1 bg-heading rounded w-25 ml-10 mt-2">
              Join Now
            </button>
          </div>
          <img
            className="h-98 -mt-95.5  mr-65 -scale-x-100 absolute right-0"
            src="../src/assets/images/man2.png"
          />
        </div>
      </div>
      <div className=" w-full lg:hidden items-center">
        <img className="w-auto" src="../src/assets/images/mb-war.png" />
      </div>
    </div>
  </section>
</div>
{/* Tournament section ends here */}

{/* best games section goes there */}
 <section className="h-auto md:mt-20 mt-0 px-2 lg:px-25">
  <div className="flex items-center gap-12 px-2 md:px-15 text-[12px]  md:text-[20px]">
    <p  className="font-semibold cursor-pointer ">Best Games</p>
    <p className="text-heading cursor-pointer">View All <i className="fa fa-angle-right"></i>
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
  <div className="flex items-center gap-12 md:px-15 px-3 text-[12px] md:text-[20px]">
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
                  src="../src/assets/images/dateicon.png"
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
        {" "}
        & Collect Epic Deal
      </h1>
      <p className="text-sm lg:text-xl mt-2">
        Discover limited-time discounts on top-selling <br /> games, gift cards,
        and bundles.
        <br />
        New deals added every day — don’t miss out!
      </p>
      <div className="md:mt-10 mt-4 flex gap-4 text-[12px] md:text-[20px]">
        <a
          className=" p-2 lg:px-6 lg:py-3   border-heading border-3 rounded-2xl bg-heading"
          href="#">
          {" "}
          Browse Deals
        </a>
        <a
          className="lg:px-6 lg:py-3 p-2 rounded-2xl border-3 border-heading "
          href="#">
          Views Games
        </a>
      </div>
    </div>
    <div className=" hidden lg:block lg:w-1/2 h-100 relative">
      <img className="w-full object-cover h-100" src="../src/assets/images/CTA.png" />
      <div className="absolute inset-0 bg-gradient-to-tl bg-gradient-to-br from-header via-transparent to-transparent"></div>
    </div>
  </div>
</section>
{/* {play best game section ends here} */}

{/* Customer Review section goes here */}
<section className="mt-10 px-5 lg:px-40 slider-wrapper ">
  <p className="font-semibold text-xl">Customer Reviews</p>
  <div className="mt-10 flex justify-between slider  overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide md:p-12">
    <div className=" relative w-70 shrink-0 h-80">
      <div className="absolute inset-0   mt-3  -ml-3                 ">
        <img src="../src/assets/images/Vector 8.png" />
      </div>
      <div className="absolute inset-4                  flex flex-col items-center justify-center p-8 rotate-3 bg-[url('../src/assets/images/Vector9.png')] bg-cover bg-center">
        <img
          className="w-20 h-20 object-cover rounded-full -mt-10 "
          src="../src/assets/images/customer2 (1).jpg"
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
        <img className="object-cover" src="../src/assets/images/Vector2(2).png" />
      </div>
      <div className="absolute inset-3 -ml-10                  flex flex-col items-center justify-center p-8 bg-[url('../src/assets/images/Vector2(1).png')] bg-cover bg-center">
        <img
          className="w-20 h-20 object-cover rounded-full -mt-10 "
          src="../src/assets/images/customer2 (2).jpg"
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
        <img src="../src/assets/images/Vector3(1).png" />
      </div>
      <div className="absolute inset-4                  flex flex-col items-center justify-center p-8 rotate-3 bg-[url('../src/assets/images/Vector3(2).png')] bg-cover bg-center">
        <img
          className="w-20 h-20 object-cover rounded-full -mt-10 "
          src="../src/assets/images/customer2 (3).jpg"
        />
        <h2 className="mt-4 text-3xl font-bold text-white">Alex</h2>
        <div className="text-orange-500 text-xl">★★★★☆</div>
        <p className="mt-4 text-center text-gray-300">
          Step into a world where every click leads to a new adventure.
        </p>
      </div>
    </div>
  </div>
  {/* <p className="justify-center justify-self-center">
    <img className="mt-5" src="../src/assets/images/dot.png" />
  </p> */}
</section>
{/* Customer review section ends here */}

{/* Blog Post section goes here */}
<div className=" items-center justify-around flex-nowrap ml-2 lg:mx-40 mt-20 ">
  <div className="flex gap-12 items-center px-4 text-xl">
    <p className="font-semibold "> Post Blog </p>
    <p className=" text-heading">
      View All <i className="fa fa-angle-right" />{" "}
    </p>
  </div>
  <div className="flex gap-3 w-full  justify-between mt-5 overflow-y-auto  md:overflow-y-hidden  scrollbar-hide mx-2">
    <div className="col-span-2 w-[80%]  lg:w-1/2 gap-5 shrink-0 flex           bg-[url('../src/assets/images/post1.jpg')] bg-no-repeat bg-cover rounded  items-end  p-4 md:h-80 h-40 ">
      <p className="font-semibold">
        FC25 Prepares for October 2024 Release with Enhanced Realism
      </p>
    </div>
    <div className=" lg:hidden col-span-2 w-[80%]  lg:w-1/2 gap-5 shrink-0 flex           bg-[url('../src/assets/images/post2.jpg')] bg-no-repeat bg-cover rounded  items-end  p-4 md:h-80 h-40 ">
      <p className="font-semibold">
        FC25 Prepares for October 2024 Release with Enhanced Realism
      </p>
    </div>
    <div className=" lg:hidden col-span-2 w-[80%]  lg:w-1/2 gap-5 shrink-0 flex           bg-[url('../src/assets/images/post3.jpg')] bg-no-repeat bg-cover rounded  items-end  p-4 md:h-80 h-40 ">
      <p className="font-semibold">
        FC25 Prepares for October 2024 Release with Enhanced Realism
      </p>
    </div>
    <div className=" w-full hidden lg:grid grid-cols-2 lg:grid-cols-2 lg:w-1/2 gap-5 ">
      <div className=" shrink-0 bg-[url('../src/assets/images/post2.jpg')] bg-no-repeat bg-cover rounded flex items-end  p-4">
        <p className="font-semibold">
          FC25 Prepares for October 2024 Release with Enhanced Realism
        </p>
      </div>
      <div className=" shrink-0 bg-[url('../src/assets/images/post3.jpg')] bg-no-repeat bg-cover rounded flex items-end  p-4">
        <p className="font-semibold">
          The Witcher 4 Expected to Bring Back Fan-Favorite Characters
        </p>
      </div>
      <div className=" shrink-0 bg-[url('../src/assets/images/post4.jpg')] bg-no-repeat bg-cover rounded flex items-end  p-4">
        <p className="font-semibold">
          Marvel’s Wolverine Set for an Epic 2025 Launch on PS5
        </p>
      </div>
      <div className=" shrink-0 bg-[url('../src/assets/images/post5.jpg')] bg-no-repeat bg-cover rounded flex items-end  p-4">
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
