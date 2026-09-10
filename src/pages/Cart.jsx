
import {  useDispatch,useSelector } from "react-redux";
import usePagination from "../hooks/usePagination";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
function Cart() {
   const cart = useSelector((store) => store.cartStore.cart);
   const{currentItems,currentPage,nextPage,prevPage,totalPages,goToPage}=usePagination(cart,3);
   const total = cart.reduce(
  (acc, item) => acc + item.qty * item.price,
  0
);
  
  return (
    <div className="px-20 mt-10 gap-5">
       <div className=" lg:flex gap-5">
        {/* mobile view */}
        
         <div className="w-full  flex-1 space-y-6">
              {currentItems.length >= 1 ? (
                currentItems.map((cartObj) => (
                  <CartItem
                    key={cartObj.id}
                    cartObj={cartObj}
                    
                  />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No Item Found
                </p>
              )}
      </div>
      <OrderSummary total={total}   />
    </div>
      <Pagination
                    currentPage={currentPage}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    totalPages={totalPages}
                    goToPage={goToPage}
       />

    </div>
  )
}


export default Cart

import { FaTruckFast, FaGamepad } from "react-icons/fa6";
import { changeQty, deleteCart } from "../assets/redux/cartSlice";
import { useNavigate } from "react-router-dom";


function CartItem({cartObj,}) {
 
   const { id, qty } = cartObj;
    
  const dispatch = useDispatch();

  const ChangeQuantity = (type) => {
    let finalQty = qty;

    if (type === "+") {
      finalQty = qty + 1;
    } else if (type === "-" && qty > 1) {
      finalQty = qty - 1;
    }

    dispatch(changeQty({ id, finalQty }));
  };
   let removeCart = (()=>{
  Swal.fire({
  title: "Are you sure to remove item?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
     dispatch(deleteCart(id))
    Swal.fire({
  
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
}
});


  

 })
  return (
    <>
    <div className="w-full border border-gray-600 rounded-lg p-2 md:p-3 md:flex gap-3 md:gap-4 bg-[#23272b] lg:h-[240px]">

      {/* Game Image */}
      <div className="w-full h-[145px] md:w-[158px] md:h-[220px] shrink-0">
        <img
          src={cartObj.image}
          alt={cartObj.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 min-w-0 py-1">
        
        <div className="flex justify-between">
          <h3 className="text-white text-[13px] md:text-[14px] font-medium truncate">
          {cartObj.title}
        </h3> 
        <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500" onClick={removeCart}
            >
              ✕ Remove
            </button>  
        </div>      
        <p className="text-white font-semibold text-sm md:text-base mt-2">
          {cartObj.category}
        </p> 
        <p className="text-white font-semibold text-sm  mt-2">
           {cartObj.price}$
        </p>   
          
        <div className="flex items-center w-fit mt-3 border border-gray-600 rounded-lg overflow-hidden">

          <button className="w-9 h-7 md:w-10 md:h-8 text-gray-300 hover:text-white hover:bg-gray-700"
             onClick={() => ChangeQuantity("-")}>
            −
          </button>
          <span className="w-8 text-center text-[#f97316] text-xs">
            {qty}
          </span>
          <button className="w-9 h-7 md:w-10 md:h-8 text-gray-300 hover:text-white hover:bg-gray-700"
             onClick={() => ChangeQuantity("+")}>
            +
          </button>
        </div>

        {/* Shipping */}
        <div className="flex items-center gap-1 mt-3">
          <FaTruckFast className="text-gray-300 text-xs" />

          <span className="text-[8px] md:text-[9px] text-orange-500 uppercase">
            Free Shipping
          </span>
        </div>

       
        <div className="flex items-center gap-1 mt-2">
          <FaGamepad className="text-gray-300 text-xs" />

          <span className="text-yellow-400 text-[10px]">
            {cartObj.rating}
          </span>

          <span className="text-gray-500 text-[10px]">
            /100
          </span>
        </div>

       
        <p className="text-green-500 text-[9px] md:text-[10px] mt-2">
          In stock
        </p>

      </div>
    </div>
    

    </>
  );
};


const OrderSummary = ({total}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-[290px] border border-orange-500 rounded-lg bg-[#23272b] px-5 py-6 md:h-[300px] mt-3 lg:mt-0">

      {/* Heading */}
      <h2 className="text-white text-sm font-semibold mb-6">
        Order Summary
      </h2>

      {/* Sub Total */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-400">
        <span className="text-gray-200 text-[11px]">
          Sub Total:
        </span>

        <span className="text-white text-[11px] font-semibold">
          ${Math.round(total,3)}
        </span>
      </div>

      {/* Shipping */}
      <div className="flex items-center justify-between py-4 border-b border-gray-400">
        <span className="text-gray-200 text-[11px]">
          Shipping estimate:
        </span>

        <span className="text-white text-[11px] font-semibold">
          9.5$
        </span>
      </div>

      {/* Tax */}
      <div className="flex items-center justify-between py-4 border-b border-gray-400">
        <span className="text-gray-200 text-[11px]">
          Tax estimate:
        </span>

        <span className="text-white text-[11px] font-semibold">
          4$
        </span>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-white text-[11px] font-bold">
          ORDER TOTAL:
        </span>

        <span className="text-white text-[11px] font-bold">
          {Math.round(total,3) + 13.5} 
        </span>
      </div>

      {/* Checkout Button */}
    
      <div className="flex justify-center mt-6">
        <button
          className={`w-[142px] py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-[11px] transition duration-200 cursor-pointer ${
          Number(total.toFixed(3)) <= 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
           onClick={() => {
            if (Number(total.toFixed(3)) <= 0) return;
            navigate("/checkout");
          }}
        >
          checkout
        </button>
      </div>
     

    </div>
  );
};

function Pagination({goToPage,nextPage,prevPage,totalPages,currentPage}){
  return(
     <div className="flex items-center justify-center gap-2 mt-8">
  <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-2 border border-[#A1A1A1] text-[#E5E7EB] rounded-md hover:border-[#FF6B00] hover:text-[#FF6B00] disabled:opacity-40 disabled:cursor-not-allowed transition">Previous</button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button key={index} onClick={() => goToPage(index + 1)} className={`w-9 h-9 border rounded-md transition ${currentPage === index + 1 ? "bg-[#FF6B00] border-[#FF6B00] text-white" : "border-[#A1A1A1] text-[#E5E7EB] hover:border-[#FF6B00] hover:text-[#FF6B00]"}`}>
      {index + 1}
    </button>
  ))}

  <button onClick={nextPage} disabled={currentPage === totalPages} className="px-3 py-2 border border-[#A1A1A1] text-[#E5E7EB] rounded-md hover:border-[#FF6B00] hover:text-[#FF6B00] disabled:opacity-40 disabled:cursor-not-allowed transition">Next</button>
</div>
  )
}