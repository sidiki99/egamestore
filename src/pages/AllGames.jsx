
import { useNavigate } from "react-router-dom"
import reviewIcon from "../assets/images/reviewIcon.png";
import games from "../data/games.json"
import useCart from "../hooks/useCart";
export default function TrendingGames() {
  const navigate = useNavigate();
  const {addToCartItem} = useCart();
  return (
    <div>
       <section className="h-auto md:mt-10 mt-0 px-2 lg:px-25">
  <div className="flex items-center justify-between gap-12 px-2 md:px-15 text-[12px]  md:text-[20px]">
    <p  className="font-semibold cursor-pointer ">All Games</p>
   
  </div>

  <div className=" relative mt-3 md:mt-10">

 
    {/* Slider Start here */}
  <div   className="overflow-hidden mx-2 md:mx-15 ">

    <div 
      className=" grid lg:grid-cols-5 md:grid-cols-2 grid-cols-2 overflow-hidden  gap-3 
      "
    >
      {/* .slice(0, 8) */}

      {games.map((game) => (        
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


 

</div>
 </section>
      
    </div>
  )
}
