
import reviewIcon from "../assets/images/reviewIcon.png";
import games from "../data/games.json"

import { useNavigate } from "react-router-dom";

import useCart from "../hooks/useCart";


 import { useState } from "react";


 import usePagination from "../hooks/usePagination";






export default function PlayStation(){
  return(
    <div className="md:px-20 px-1.5">
  
    <PlayStationGames />
   
    </div>
  )
}


 export  function PlayStationGames() {
   const [genreOpen, setGenreOpen] = useState(true);
   const [priceOpen, setPriceOpen] = useState(true);
   const [price, setPrice] = useState(50);
   const [selectedGenre,setSelectedGenre]=useState([]);
   const [allGenres, setAllGenres] = useState(true);
   const maxPrice = 100;
   const navigate = useNavigate();
 
 
  const genres = [
    {
    name: "All",
    count:games.filter((game)=>game.rating > 90 ).length,
  },
 
   { name: "Adventure", count: games.filter((game) => game.category === "Adventure" &&
        game.rating > 90).length },
   { name: "RPG", count: games.filter((game) => game.category === "RPG" &&
        game.rating > 90).length },
     { name: "Action", count: games.filter((game) => game.category === "Action" &&
        game.rating > 90).length },
      { name: "Tactical Shooter", count: games.filter((game) => game.category === "Tactical Shooter" &&
        game.rating > 90).length },
   
   
     { name: "Sports", count: games.filter((game) => game.category === "Sports" &&
        game.rating > 90).length },
   
  

  
   { name: "Shooting", count: games.filter((game) => game.category === "Shooting" &&
        game.rating > 90).length },
   { name: "MOBA", count: games.filter((game) => game.category === "MOBA" &&
        game.rating > 90).length },
   { name: "Battle Royale", count: games.filter((game) => game.category === "Battle Royale" &&
        game.rating > 90).length },
   { name: "FPS", count: games.filter((game) => game.category === "FPS" &&
        game.rating > 90).length },
   
 ];
  const handleGenreChange = (genre) => {
   if (genre === "All") {
      setAllGenres(true);
     setSelectedGenre([]);
     return;
   }  setAllGenres(false);
   setSelectedGenre((prev) =>
     prev.includes(genre)
       ? prev.filter((item) => item !== genre)
       : [...prev, genre]
   );
 };
//  const filteredGames = games.filter((game)=>{
//   const matchedGenre = selectedGenre.length === 0 || selectedGenre.includes(game.category);
//   const matchedPrice = game.price <= price
//   return(
//    matchedPrice  && matchedGenre
//   )
//  }
//  )

const allCategories = [
  "Adventure",
  "Shooting",
  "MOBA",
  "Battle Royale",
  "FPS",
  "Sports",
  "Adventure",
  "Action",
  "RPG"


];

const filteredGames = games.filter((game) => {
  const isPlayStationGame = allCategories.includes(game.category);

  const matchedRating = game.rating > 90;

  const matchedGenre =
    allGenres || selectedGenre.includes(game.category);

  const matchedPrice = game.price <= price;

  return isPlayStationGame && matchedRating && matchedPrice && matchedGenre;
});
 const{currentItems,currentPage,nextPage,prevPage,totalPages,goToPage}=usePagination(filteredGames,16);
 
 // create arry 
 //  let cart = useSelector((store)=>store.cartStore.cart)
 
 
 const { addToCartItem } = useCart();
   return (
   <>
     <section className="md:flex justify-center mt-8 gap-6 lg:gap-8">
     {/* filters for games */}
      <div className="w-full md:w-[216px] lg:w-[240px] xl:w-[260px] shrink-0 h-auto mx-auto">
 
       <div className=" flex items-center justify-between  text-[15px] md:text-[20px]  cursor-pointer">
         <p className=" ">Filters</p>
         <button className="border border-white rounded-2xl px-3 md:px-4 py-1 md:py-1 whitespace-nowrap text-sm"onClick={()=> setAllGenres(false)}>Clear All</button>
       </div>
 
       {/* Filter Card */}
       <aside className=" mt-2 bg-[#272B30] border border-[#FF6B00] rounded-md px-[11px] py-[10px] text-white">
 
       {/* Genre */}
       <div>
         <button onClick={() => setGenreOpen(!genreOpen)} className="w-full flex items-center justify-between text-[15px] md:text-[18px] font-medium mb-5">
           <span>Genre</span>
           <i className={`fa fa-angle-${genreOpen ? "up" : "down"} text-sm`} />
         </button>
 
         {genreOpen && (
           <div className="space-y-[10px]">
             {genres.map((genre) => (
               <label key={genre.name} className="flex items-center justify-between cursor-pointer text-[14px] text-[#E5E7EB]">
                 <div className="flex items-center gap-2">
                 <input type="checkbox" checked={genre.name === "All" ? allGenres : selectedGenre.includes(genre.name)}
                 onChange={() => handleGenreChange(genre.name)}
                  className="w-[11px] h-[11px] accent-[#FF6B00] cursor-pointer" />
                   <span>{genre.name}</span>
                 </div>
 
                 <span>({genre.count})</span>
               </label>
             ))}
           </div>
         )}
       </div>
 
       {/* Divider */}
       <div className="border-t border-[#A1A1A1] my-7" />
 
       {/* Price */}
       <div>
         <button onClick={() => setPriceOpen(!priceOpen)} className="w-full flex items-center justify-between text-[15px] font-medium mb-4">
           <span>Price</span>
           <i className={`fa fa-angle-${priceOpen ? "up" : "down"} text-sm`} />
         </button>
 
         {priceOpen && (
           <>
                           {/* Range */}
               <div className="relative h-4 flex items-center">
                 <div className="absolute w-full h-[4px] bg-[#E5E7EB] rounded-full" />
 
                 <div className="absolute left-0 h-[4px] bg-[#FF6B00] rounded-full" style={{ width: `${(price / maxPrice) * 100}%` }} />
 
                 <input type="range" min="0" max={maxPrice} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="absolute w-full h-[4px] appearance-none bg-transparent cursor-pointer accent-[#FF6B00] z-10" />
               </div>
 
               {/* Price inputs */}
               <div className="flex items-center justify-between mt-4">
                 <input type="text" value="$0" readOnly className="w-[54px] h-[29px] bg-transparent border border-[#A1A1A1] rounded-lg px-2 text-[11px] text-white outline-none" />
 
                 <input type="text" value={`$${price}`} readOnly className="w-[60px] h-[29px] bg-transparent border border-[#A1A1A1] rounded-lg px-2 text-[11px] text-white outline-none" />
               </div>
           </>
         )}
       </div>
 
       {/* Bottom Divider */}
       <div className="border-t border-[#A1A1A1] mt-4" />
 
     </aside>
     </div>
 
     {/* Product show section */}
     <div className="w-full md:flex-1 min-w-0 mt-2 md:mt-0 mx-auto">
       <div className="flex gap-2 items-center">
         <p>Home </p> 
         <i className="fa fa-angle-right" />
         <p> Deals </p> 
       </div>
        {/* product card */}
        <div className="grid grid-cols-2 [@media(min-width:480px)_and_(max-width:770px)]:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 md:mt-2 md:mt-5
         [@media(min-width:768px)_and_(max-width:950px)]:grid-cols-2 
          [@media(min-width:950px)_and_(max-width:1440px)]:grid-cols-3  ">
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 mt-5"> */}
          {currentItems.map((game) => (        
         <div
           key={game.id}
           className=" shrink-0 w-[140px] sm:w-[180px] md:w-[215px] lg:w-[240px]
             h-[220px]  sm:h-[270px] md:h-[330px] lg:h-[330px] border
             border-white rounded-xl p-2 "
           
           >
                       {/* Image */}
           <div
            onClick={() => navigate(`/game/${game.id}`)}
             className="
               relative h-[60%]  bg-cover  bg-center rounded-xl group cursor-pointer "
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
 
   </section>
   {/* pagination section goes here */}
  <div className="flex items-center justify-center gap-2 mt-8">
   <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-2 border border-[#A1A1A1] text-[#E5E7EB] rounded-md hover:border-[#FF6B00] hover:text-[#FF6B00] disabled:opacity-40 disabled:cursor-not-allowed transition">Previous</button>
 
   {Array.from({ length: totalPages }, (_, index) => (
     <button key={index} onClick={() => goToPage(index + 1)} className={`w-9 h-9 border rounded-md transition ${currentPage === index + 1 ? "bg-[#FF6B00] border-[#FF6B00] text-white" : "border-[#A1A1A1] text-[#E5E7EB] hover:border-[#FF6B00] hover:text-[#FF6B00]"}`}>
       {index + 1}
     </button>
   ))}
 
   <button onClick={nextPage} disabled={currentPage === totalPages} className="px-3 py-2 border border-[#A1A1A1] text-[#E5E7EB] rounded-md hover:border-[#FF6B00] hover:text-[#FF6B00] disabled:opacity-40 disabled:cursor-not-allowed transition">Next</button>
 </div>
   </>
   )
 }
 