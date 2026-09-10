import games from "../data/games.json"
import { useState } from "react";
import { FaTruckFast,FaLock,FaPlus, FaCartShopping, FaEye } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import useCart from "../hooks/useCart";


const faqs = [
  {
    question: "How can I purchase a game?",
    answer:
      "Browse our game collection, select the game you want, and click the Add to Cart button. You can then proceed to checkout and complete your purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We support multiple secure payment methods. You can select your preferred payment option during checkout.",
  },
  {
    question: "How will I receive my game?",
    answer:
      "After completing your purchase, your game will be delivered to you digitally through the method specified on the game details page.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Orders can only be cancelled before the game has been delivered or activated. Please contact our support team as soon as possible.",
  },
  {
    question: "Do you offer discounts on games?",
    answer:
      "Yes. We regularly offer discounts and special deals on selected games. Check our Deals section for the latest offers.",
  },
  {
    question: "Are the games compatible with my platform?",
    answer:
      "Each game has its supported platform listed on its product page, such as PC, PlayStation, Xbox, or other supported platforms.",
  },
];

export default function OrderDetails() {
  const {id} = useParams();
   const game = games.find((item)=> item.id === Number(id));
  
  return (
    <div className=" px-5 md:px-20">
       <Order game={game} id={id} />
         {/* Icons and service section  */}
          <div className=" md:flex justify-between items-center mt-10 gap-5">

            <div className="w-full max-w-[310px] min-h-[90px] rounded-lg border border-[#3a3f45] 
          bg-[#252a30] flex items-center gap-4 px-5 py-4 mt-2 md:mt-0">
        
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
            <div className="w-full max-w-[310px] min-h-[90px] rounded-lg border border-[#3a3f45]  mt-2 md:mt-0
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
            <div className="w-full max-w-[310px] min-h-[90px] rounded-lg border border-[#3a3f45] mt-2 md:mt-0
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

        <FAQs />
        <RelatedGames currGame={game} />
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
      <div  className="
              relative h-[300px]  bg-cover  bg-center rounded-xl w-full md:w-1/3  "
            style={{
              backgroundImage: `url(${game.image})`,
            }}   
             >
            
              <span
              className=" inline-block bg-heading  px-2    md:px-3  py-1  rounded-xl m-2
                text-[9px]  md:text-[18px]  "
            >
              {game.discount}%
            </span>
              
      </div>
      <div className=" md:px-10 w-full md:w-2/3">
        <p className=" text-normal md:text-xl font-semibold ">{game.title}</p>
        <div className="flex items-center gap-1 text-yellow-400 text-xl ">
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
            <span key={star}>
              {star <= Math.round(game.rating) ? "★" : "☆"}
            </span>
          ))}
          </div>
          <span className="text-white text-sm">{game.rating} reviews</span>
        </div>  
       
        <div className="flex gap-3 items-center mt-3">
          
           <span className=" mr-1 text-lg"> ${game.price} </span>
            <span className="line-through text-gray-400 mr-1 text-sm">{game.oldPrice}$</span>
        </div>
          <p className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-gray-400 line-clamp-3">
          {game.description}
        </p>
        <div className="md:flex items-center gap-5 mt-2 ">
          <p className=" text-md md:text-xl">Quantity</p>
          <div className="flex items-center text-lg border md:w-[180px] border-white rounded mt-2 md:mt-0">
             <button  className=" w-1/3 py-1  rounded " onClick={decrement}>-</button>
             <button className=" w-2/3 py-1   border-l border-r border-white bg-heading">{quantity}</button>
            <button className=" w-1/3 py-1  rounded" onClick={increment}>+</button>
          </div>
        </div>
         <div className="flex justify-between gap-2 mt-2 text-[9px] md:text-[16px] w-full">
              <button className="border border-heading rounded-md px-1 md:px-3 py-1 md:py-2 whitespace-nowrap flex-1 min-w-0"
              onClick={() => addToCartItem(game)}>
                Add  cart
              </button>

              <button className="border-2 border-heading bg-heading rounded-md px-1 md:px-3 py-1 md:py-2 whitespace-nowrap flex-1 min-w-0"
              onClick={handleCheckout}>
                Checkout
              </button>             
            </div>
            {/* Dilivery Platforms */}

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

              
      </div>

      
     
    </div>
  )
}


// faqs 

const FAQs=()=>{
  const [faqsOpen, setFaqsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="bg-[#20252b] mt-10  py-16 px-4 md:px-8">
        <button onClick={() => setFaqsOpen(!faqsOpen)} className="w-full flex items-center justify-between text-[15px] md:text-[18px] font-medium mb-5 text-heading">
                    <span>Product FAQs</span>
                    <i className={`fa fa-angle-${faqsOpen ? "up" : "down"} text-sm`} />
      </button>
      {faqsOpen &&(
        <section className="bg-[#20252b] py-16 px-4 md:px-8">
      
      
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

        {faqs.map((faq, index) => (
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