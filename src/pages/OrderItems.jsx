import { useEffect, useState } from "react";

import {  useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaLocationDot, FaCreditCard, FaRotate } from "react-icons/fa6";



function OrderItems() {
  const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
  
  useEffect(() => {
    const loadOrders = () => {
      const savedOrders =
        JSON.parse(localStorage.getItem("orders")) || [];
  
      setOrders(savedOrders);
    };  
    loadOrders();
    
    window.addEventListener("ordersUpdated", loadOrders); 
    return () => {
      window.removeEventListener("ordersUpdated", loadOrders);
    };
  }, []);
  const users=  JSON.parse(localStorage.getItem("users"))
   const currentUser=  JSON.parse(localStorage.getItem("currentUser"))


   
   const {id} = useParams();
   let order = orders.find((item)=> item.orderId === id);
   if (!order) {
  return <p>Order not found</p>;
}
   const curUser = users.find((user) => user.email === order.userEmail);
  return (
    <div className="px-5 md:px-20">
    {/* Order overview */}
    <div className="my-10">

     
      {currentUser.role === "admin"?
      <button
        onClick={() => navigate("/admin-orders")}
        className="flex items-center gap-2 text-orange-500 text-sm mb-7 hover:text-orange-400"
      >
        <FaArrowLeft />
        <span>Back to orders</span>
      </button>:
      <button
        onClick={() => navigate("/orders")}
        className="flex items-center gap-2 text-orange-500 text-sm mb-7 hover:text-orange-400"
      >
        <FaArrowLeft />
        <span>Back to my orders</span>
      </button>}

   
      <div className="bg-input rounded-lg p-5 sm:p-7 shadow-lg">

       
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-orange-500 text-sm sm:text-base">
            Order Summary
          </h2>

          <span className="bg-green-600 text-white text-[10px] sm:text-xs px-3 py-1 rounded-md">
            {order?.status || "Delivered"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div>
            <p className="text-gray-400 text-xs mb-1">
              User Details
            </p>

            <p className="text-orange-500 font-semibold text-sm">
             Name : {order?.personalDetails.firstName|| "ABC"} {  order?.personalDetails.secondName }
            </p>
             <p className="text-orange-500 font-semibold text-sm">
             Email : {curUser.email || "example@345"}
            </p>
             <p className="text-orange-500 font-semibold text-sm">
             Email : {order?.personalDetails.phone || "031234567889"}
            </p>
          </div>

           <div>
            <p className="text-gray-400 text-xs mb-1">
              Order ID
            </p>

            <p className="text-orange-500 font-semibold text-sm">
              #{order?.orderId || "ORD-2024-1247"}
            </p>

             <p className="  text-sm">
              Order Date : {new Date(order.orderDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
            </p>
          </div>

          

          {/* Delivery Location */}
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center">
              <FaLocationDot className="text-gray-600" />
            </div>

            <div>
              <p className="text-gray-400 text-xs">
                Delivery Location
              </p>

              <p className="text-white text-sm">
                {order?.personalDetails.streetAddress || "Gulberg III, Lahore"}
                   , { order?.personalDetails.country || ""}
              </p>
            </div>
          </div>

         
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center">
              <FaCreditCard className="text-gray-600" />
            </div>

            <div>
              <p className="text-gray-400 text-xs">
                Payment Method
              </p>

              <p className="text-white text-sm">
                {order?.paymentDetails.cardType || "Cash on Delivery"}
              </p>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 mt-5 pt-3">

          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
            {currentUser.role === "users" &&(
              <button className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1.5 rounded-md"
            onClick={() => navigate("/checkout")}>
              <FaRotate />
              Order again
            </button>         

            )}
           

          </div>

        </div>

      </div>
    </div>
    
          
      {/* order items */}
           <h2 className="text-orange-500 text-sm sm:text-base">
              Order Items
            </h2>  
           {order.orderItems.map((item)=>{
            return(
          <div key={order.orderId}>
                     
             <div key={item.key}  className="border   mt-5 border-gray-700 bg-input p-5 rounded-lg">
          <div className=" justify-between flex">
             <div className="flex   gap-3">
            <img className="w-30 h-30" src={item.image}></img>
            <div>
              <h1 className="font-semibold text-sm">{item.title}</h1>
              <div  className="text-sm sm:text-base  leading-6 sm:leading-7 text-gray-400 line-clamp-3">
                <p>{item.description}</p><span>{order.status}</span>
                <div>{new Date(order.orderDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}</div>
              </div>  
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-sm">${item.price}</h1>          
          </div>
          </div>
         

          </div>
         
          
          </div>
              )}
        )
       }
     </div>  
  )
}

export default OrderItems
