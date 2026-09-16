import games from "../data/games.json"
import { useEffect, useState } from "react";
import { FaTruckFast,FaLock,FaPlus, FaCartShopping, FaEye } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import useCart from "../hooks/useCart";
import { FaChevronDown } from "react-icons/fa";
import faqs from "../data/faqs.json"

export default function OrderDetails() {
  const {id} = useParams();
   const game = games.find((item)=> item.id === Number(id));
  
  return (
    <div className=" px-5 md:px-40">
       <Order game={game} id={id} />
         {/* Icons and service section  */}
          <div className=" md:flex justify-between items-center mt-10 gap-5">

            <div className="w-full max-w-1/3] min-h-[90px] rounded-lg border border-[#3a3f45]  mt-2 md:mt-0
          bg-[#252a30] flex items-center gap-4 px-5 py-4">
        
        <div className="text-orange-500 text-3xl">
          <i className="fa fa-headphones" />
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm md:text-base">
            24H Support
          </h3>

          <p className="text-gray-300 text-xs md:text-sm mt-2">
            Always available when you need us
          </p>
        </div>
          </div>
          {/* second card */}
            <div className="w-full max-w-1/3] min-h-[90px] rounded-lg border border-[#3a3f45]  mt-2 md:mt-0
          bg-[#252a30] flex items-center gap-4 px-5 py-4">
        
        <div className="text-orange-500 text-3xl">
          <FaTruckFast />
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm md:text-base">
            Fast Delivery
          </h3>

          <p className="text-gray-300 text-xs md:text-sm mt-2">
            Instant delivery for digital products
          </p>
        </div>
          </div>
          {/* third card  */}
            <div className="w-full max-w-1/3] min-h-[90px] rounded-lg border border-[#3a3f45]  mt-2 md:mt-0
          bg-[#252a30] flex items-center gap-4 px-5 py-4">
        
        <div className="text-orange-500 text-3xl">
        <FaLock />
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm md:text-base">
              Secure Shopping
          </h3>

          <p className="text-gray-300 text-xs md:text-sm mt-2">
            Your information is completely secure
          </p>
        </div>
          </div>
          </div>
          <Description game={game} />

        <FAQs game={game} />
        <RelatedGames currGame={game} />
        <CustomerReviewCard game={game}  />
    </div>
  )
}
function Order({game,id}){
  const navigate = useNavigate();
   let [quantity,setQuantity]= useState(1);
   quantity = Number(quantity);
   const { addToCartItem } = useCart();
  
  console.log(game);
 console.log("URL ID:", id);
console.log("Selected Game:", game);
// If game doesn't exist
  if (!game) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <h2 className="text-white text-2xl">
          Game not found
        </h2>
      </div>
    );
  }
 
  function increment(){ 
     setQuantity((prev) => prev + 1);

  }
  function decrement (){
    
    setQuantity((prev) => {
      if (prev > 2) {
        return prev - 1;
      }

      return prev;
   
  })
  
}

function handleCheckout(){
  addToCartItem({
    ...game,
    selectedQty: quantity
  });
  navigate("/checkout");

}

  return(
    <div className=" md:flex   h-auto  mt-10">
     <div
        className="relative bg-cover  bg-no-repeat bg-center rounded-xl w-full md:w-1/3 h-64 md:h-110"
        style={{
          backgroundImage: `url(${game.image})`,
        }}
      >
        <span
          className="inline-block bg-heading px-2 md:px-3 py-1 rounded-xl m-2 text-[9px] md:text-[18px]"
        >
          {game.discount}%
        </span>
      </div>
      <div className=" md:px-20 flex-1">
        <p className=" text-normal md:text-xl font-semibold ">{game.title}</p>
        <div className="flex items-center gap-1 text-yellow-400 text-xl md:mt-5 ">
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
            <span key={star}>
              {star <= Math.round(game.rating) ? "★" : "☆"}
            </span>
          ))}
          </div>
          <span className="text-white text-sm">{game.rating} reviews</span>
        </div>  
       
        <div className="flex gap-3 items-center mt-3 md:mt-5 ">
          
           <span className=" mr-1 text-lg"> ${game.price}.00 </span>
            <span className="line-through text-gray-400 mr-1 text-sm">{game.oldPrice}.00$</span>
        </div>
          {/* <p className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-gray-400 line-clamp-3">
          {game.description}
        </p> */}
        <div className="md:flex items-center gap-5 mt-2 md:mt-5  ">
          <p className=" text-md md:text-xl">Quantity</p>
          <div className="flex items-center text-lg border md:w-[180px] border-white rounded mt-2 md:mt-0">
             <button  className=" w-1/3   rounded " onClick={decrement}>-</button>
             <button className=" w-2/3    border-l border-r border-white bg-heading">{quantity}</button>
            <button className=" w-1/3  rounded" onClick={increment}>+</button>
          </div>
        </div>
        <div className="text-[9px] md:text-[16px] font-semibold text-heading  mt-5">
          <p>In Stock</p>
        </div>
         <div className="flex justify-between gap-2  mt-3 text-[9px] md:text-[16px] w-full max-w-130">

              <p className="border border-white rounded-xl px-1 md:px-3 py-1 md:py-1 whitespace-nowrap flex-1 min-w-0 justify-between items-center flex"
             >
                <p>200$</p> <FaChevronDown />
              </p>

              <p className="border border-white rounded-xl px-1 md:px-3 py-1 md:py-1 whitespace-nowrap flex-1 min-w-0 justify-between items-center flex"
             >
                <p>200$</p> <FaChevronDown />
              </p>           
            </div>

              <div className="flex justify-between gap-2 mt-5 text-[9px] md:text-[16px] w-full max-w-130">
              <button className="border border-heading rounded-xl px-1 md:px-3 py-1 md:py-1 whitespace-nowrap flex-1 min-w-0"
              onClick={() => addToCartItem(game)}>
                Add  cart
              </button>

              <button className="border-2 border-heading bg-heading rounded-xl px-1 md:px-3 py-1 md:py-1 whitespace-nowrap flex-1 min-w-0"
              onClick={handleCheckout}>
                Checkout
              </button>             
            </div>

            {/* Dilivery Platforms */}

             <div className="border border-gray-400 rounded-lg p-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 mt-5 max-w-130">

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

              
      </div>

      
     
    </div>
  )
}


// faqs 

const FAQs=({game})=>{
  const [faqsOpen, setFaqsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const currentFAQ = faqs.find((item)=>item.id === game.id)
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="bg-[#20252b] border border-heading rounded-md mt-10  py-8 px-4 md:px-8">
        <button onClick={() => setFaqsOpen(!faqsOpen)} className="w-full flex items-center justify-between text-[15px] md:text-[18px] font-medium mb-5 text-heading">
                    <span>Product FAQs</span>
                    <i className={`fa fa-angle-${faqsOpen ? "up" : "down"} text-sm`} />
      </button>
      {faqsOpen &&(
        <section className="bg-[#20252b] py-8 px-4 md:px-8">
      
      
      <div className="max-w-[900px] mx-auto text-center mb-10">
        <p className="text-[#ff6600] text-sm font-semibold uppercase tracking-wider mb-2">
          FAQ
        </p>
        <h2 className="text-white text-3xl md:text-4xl font-bold">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 mt-3 text-sm md:text-base">
          Find answers to the most common questions about our game store.
        </p>

      </div>

      {/* FAQ List */}
      <div className="max-w-[900px] mx-auto space-y-4">

        {currentFAQ.faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-[#353a40] rounded-xl overflow-hidden  bg-[#252a30] transition duration-300
                       hover:border-[#ff6600]"
          >

          
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between   text-left px-5 md:px-6 py-5
                         text-white font-medium cursor-pointer"
            >

              <span className="text-sm md:text-base">
                {faq.question}
              </span>
              <FaPlus
                className={`text-[#ff6600] text-sm shrink-0 ml-4
                  transition-transform duration-300
                  ${openIndex === index ? "rotate-45" : ""}`}
              />

            </button>
          
            <div
              className={`grid transition-all duration-300 ease-in-out
                ${ openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
            >

              <div className="overflow-hidden">
                <p className="px-5 md:px-6 pb-5 text-gray-400  text-sm leading-6">
                  {faq.answer}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
      )}
    </div>
  );

}
    
{/* related games section goes there */}

function RelatedGames({currGame}){
  const { addToCartItem } = useCart();  
  const currGameCategory = currGame.category;
  const navigate=useNavigate()
  return(

 <section className="h-auto md:mt-20 mt-0 ">
  <div className="flex items-center gap-12 px-2 md:px-15 text-[12px]  md:text-[20px]">
    <p  className="font-semibold cursor-pointer ">Related Games</p>
  </div>

  <div className=" relative mt-3 md:mt-10">

 
    {/* Slider Start here */}
  <div   className="overflow-hidden mx-2 md:mx-15 ">

    <div 
      className="  flex   overflow-hidden  gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth  scrollbar-hide
      "
    >
      {/* .slice(0, 8) */}

      {games.filter((game)=>(
         game.category === currGameCategory
      )).slice(0,4).map((game) => (    
            
        <div
          key={game.id}
          className=" shrink-0 w-[140px] sm:w-[180px] md:w-[240px] lg:w-[240px]
            h-[220px]  sm:h-[270px] md:h-[330px] lg:h-[330px] border 
            border-heading rounded-xl p-2 "
          >
                      {/* Image */}
          <div  onClick={() => navigate(`/game/${game.id}`)}
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

              <div className="flex items-center gap-1 text-white p-2 bg-heading/20 rounded-lg">
               

                <span className="text-heading">
                 <FaEye />
                </span>
                
              </div>
            </div>


                      {/* Buttons */}
            <div className=" gap-2 mt-2 text-[9px] md:text-[16px] w-full">
              <button className=" flex items-center gap-2 border border-heading  px-1 md:px-3 py-1 md:py-2 whitespace-nowrap   w-full bg-heading rounded-3xl justify-center "
              onClick={() => addToCartItem(game)}>
                <FaCartShopping /> <span>Add to Cart</span>
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
{/* related game section ends here */}

function Description({game}){

const [activeTab, setActiveTab] = useState("System Requirements");

const tabs = ["System Requirements", "Description", "Support"];
return(

<div className="w-full text-white mt-5">
  {/* Tabs */}
  <div className="flex items-center gap-8 border-b border-gray-500 px-1">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`pb-4 text-sm md:text-base transition ${
          activeTab === tab
            ? "font-semibold text-[#ff681b]"
            : "text-gray-200 hover:text-white"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Content */}
  <div className="mt-3 rounded-lg border border-gray-700 bg-[#24272d] p-3 md:p-4">
    {activeTab === "System Requirements" && (
      <div>
        <h3 className="mb-1 text-sm md:text-base font-medium">
          {game.title}
        </h3>

        <p className="text-xs md:text-sm leading-5 text-gray-200">
          This game requires a Windows 10 or Windows 11 64-bit operating system, an Intel Core i5 or AMD Ryzen 5 processor, and at least 8 GB of RAM. A GTX 1050 Ti or Radeon RX 570 graphics card is recommended, along with DirectX 12 and approximately 50 GB of available storage. For the best gaming experience, an Intel Core i7 or AMD Ryzen 7 processor, 16 GB of RAM, and an NVIDIA RTX 3060 or AMD Radeon RX 6600 graphics card are recommended.

        </p>
      </div>
    )}

    {activeTab === "Description" && (
      <div>
        <h3 className="mb-2 text-base font-semibold">Game Description</h3>
        <p className="text-sm leading-6 text-gray-200">
        {  game.description}
        </p>
      </div>
    )}

    {/* {activeTab === "Reviews (128)" && (
      <div>
        <h3 className="mb-2 text-base font-semibold">Customer Reviews</h3>
        <p className="text-sm text-gray-300">
          ⭐ 4.8/5 based on 128 reviews.
        </p>
      </div>
    )} */}

    {activeTab === "Support" && (
      <div>
        <h3 className="mb-2 text-base font-semibold">Support</h3>
        <p className="text-sm text-gray-300">
          Need help? Contact our support team for assistance with your game.
        </p>
      </div>
    )}
  </div>

</div>

  )}




import reviewsFile from "../data/reviews.json";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

function CustomerReviewCard({ game }) {
  const [reviews, setReviews] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const profiles = JSON.parse(localStorage.getItem("Profile"));
  const selectedProfile = profiles?.find((item)=>item.email === currentUser?.email)

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const[comment,setComment]=useState();
  const[rating,setRating]=useState();

  const hasPurchased = orders.some((order) => { 
    if (order.userEmail !== currentUser?.email) 
      { return false; }
    return order.orderItems?.some( (item) =>
       Number(item.id) === Number(game.id) ); 
  });
useEffect(() => {

  const savedReviews = JSON.parse(localStorage.getItem("gameReviews")) || [];
  const sampleGame = reviewsFile.find(
    (item) => Number(item.id) === Number(game.id)
  );

  const sampleReviews = sampleGame?.reviews || [];

  const userReviews = savedReviews.filter(
    (item) => Number(item.gameId) === Number(game.id)
  );


  setReviews([
     ...userReviews,
    ...sampleReviews.map((review) => ({
      ...review,
      isDefault: true,
      gameId: game.id,
    })),
   
  ]);
}, [game.id]);
  // const gameReview = reviews.find((item) => item.id === game.id);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if (!currentUser) 
      { alert("Please login first."); return; }
    if(!comment.trim()){
      toast.error("Please Write SomeThing")
      return
    }

    const newReview = { 
      id: Date.now(), 
      gameId: game.id, 
      gameTitle: game.title,
       reviewer: currentUser.username ||  currentUser.email,
        email: currentUser.email, 
        rating: 
        rating, date: new Date().toLocaleDateString("en-GB"), 
        comment: comment.trim() ,
        userImg:selectedProfile.profileImg
    }
   
    const existingReviews = JSON.parse(localStorage.getItem("gameReviews")) || []; 
    const updatedReviews = [...existingReviews, newReview]; 
    localStorage.setItem( "gameReviews", JSON.stringify(updatedReviews) );
    setReviews((prev) => [...prev, newReview]); 
   
    setComment("");

  }

  return (
    <div className="w-full p-8">
      <h2 className="text-white text-2xl font-bold mb-6">
        Customer Reviews
      </h2>
      {/* Write Your Review */}
    {hasPurchased && 
      <div className="bg-[#1E2126] rounded-lg p-5 mb-8 max-w-xl">
       <h3 className="text-white text-lg font-semibold mb-4"> Write a Review </h3>
       <div className="flex gap-1 mb-4"> 
        {Array.from({ length: 5 }).map((_, i) => (
           <Star key={i} size={24} onClick={() => setRating(i + 1)} 
           className={`cursor-pointer transition ${ i < rating ? "fill-orange-400 text-orange-400" : "text-neutral-600" }`} /> ))} </div>       
       {/* Comment */} 
       <textarea value={comment} onChange={(e) => setComment(e.target.value)} 
       placeholder="Write your review..." className="w-full min-h-[100px] rounded-md bg-[#24272D] border border-neutral-700 p-3 text-white outline-none focus:border-orange-400" />

      

       <button onClick={handleSubmit} className="mt-4 rounded-md bg-[#FF6916] px-5 py-2 text-white font-semibold hover:bg-[#ff6b00]" > Submit Review </button>

      </div>
      }

      {reviews.map((item, index) => (
        <div key={index} className="w-full max-w-xl mb-8">
          <div className="flex gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={22}
                className={
                  i < Math.floor(item.rating)
                    ? "fill-orange-400 text-orange-400"
                    : "fill-transparent text-neutral-600"
                }
              />
            ))}
          </div>

          <p className="text-white text-[15px] leading-relaxed mb-6">
            {item.comment}
          </p>

          <p className="text-neutral-400 text-sm mb-6">
            {item.date}
          </p>

          <div className="flex items-center gap-3">
             <img
            src={item.userImg || "../src/assets/images/game1.png"}
            alt="img"
            className="w-8 h-8 rounded-full object-cover ring-2"
          />
            <span className="text-white text-sm font-medium">
              {item.reviewer}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
