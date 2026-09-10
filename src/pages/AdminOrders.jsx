import { useEffect, useState } from "react";
import { FaAngleRight, FaCheck, FaDollarSign,  FaShoppingCart } from "react-icons/fa"
import { FaAngleLeft, FaArrowsRotate } from "react-icons/fa6"
import { useNavigate } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import toast from "react-hot-toast";


function AdminOrders() {
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


const pending=orders.filter((item)=>item.status === "Pending");
const completed=orders.filter((item)=>item.status === "Completed");
const totalSpent = orders.reduce((sum, order) => {
  return sum + Number(order.billing.total);
}, 0);

console.log(totalSpent);
console.log(completed.length)

const currentUser = JSON.parse(localStorage.getItem("currentUser")
);
const handleStatusChange = (orderId, newStatus) => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const updatedOrders = orders.map((order) =>
    order.orderId === orderId
      ? {
          ...order,
          status: newStatus,
        }
      : order
  );

  localStorage.setItem("orders", JSON.stringify(updatedOrders) );

  setOrders(updatedOrders);

  window.dispatchEvent(new Event("ordersUpdated"));

  toast.success(`Order status changed to ${newStatus}`);
};
const{currentItems,currentPage,nextPage,prevPage,totalPages,goToPage,startIndex,endIndex}=usePagination(orders,3);
  return (
    <div className=" px-5 md:px-20">
      <section className="mt-10">
        {/* Top OF Order PAge */}
        <div className="md:flex justify-between">
          <div>
            <h1 className="font-semibold text-lg mb-4">Total Orders</h1>
            <p  className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-gray-400 line-clamp-3">
              View and Manges your digital game purchases
            </p>
          </div>
          <div className="my-2 md:my-0">
            <input type="text" placeholder="search" className=" bg-input outline-none px-2 py-1
              rounded-md"></input>
             <select>
               <option>All Orders</option>
             </select>
          </div>
        </div>
        {/* Overall details of Myorders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

              {/* Total Orders */}
              <div className="border border-gray-700 rounded-lg p-4 bg-input flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#60A5FA]/20 flex items-center justify-center">
                  <FaShoppingCart className="text-[#60A5FA]" />
                </div>
                <div>
                  <p className="text-white text-lg font-semibold">{orders.length}</p>
                  <p className="text-gray-400 text-xs">Total Orders</p>
                </div>
              </div>

              {/* Complete*/}
              <div className="border border-gray-700 rounded-lg p-4 bg-input flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#FACC15]/20 flex items-center justify-center">
                  <FaCheck className="text-[#FACC15]" />
                </div>
                <div>
                  <p className="text-white text-lg font-semibold">{completed.length}</p>
                  <p className="text-gray-400 text-xs">Completed</p>
                </div>
              </div>

              {/* Total Products */}
              <div className="border border-gray-700 rounded-lg p-4 bg-input flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#986BC9]/20 flex items-center justify-center">
                  < FaArrowsRotate className="text-[#986BC9]" />
                </div>
                <div>
                  <p className="text-white text-lg font-semibold">{pending.length}</p>
                  <p className="text-gray-400 text-xs">Pending</p>
                </div>
              </div>

              {/* Total Purchses*/}
              <div className="border border-gray-700 rounded-lg p-4 bg-input flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#4ADE80]/20 flex items-center justify-center">
                  <FaDollarSign  className="text-[#4ADE80]"/>
                </div>
                <div>
                  <p className="text-white text-lg font-semibold">${totalSpent}</p>
                  <p className="text-gray-400 text-xs">Total Spent</p>
                </div>
              </div>

        </div>

        {/* Orders */}
        {currentItems.map((order)=>{
           const item = order.orderItems[0];
           return(
            <>
             <div key={order.orderId}  className="border   mt-5 border-gray-700 bg-input p-5 rounded-lg">
          <div className="border-b p-2 justify-between border-gray-700 flex">
             <div className="flex   gap-3">
            <img className="w-30 h-30" src={item.image}></img>
            <div>
              <h1 className="font-semibold text-sm">{item.title}</h1>
              <div  className="text-sm sm:text-base  leading-6 sm:leading-7 text-gray-400 line-clamp-3">
                {/* <p>{item.description}</p><span>{order.status}</span> */}
                <p>{item.description}</p>

                  {currentUser?.role === "admin" ? (
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      className="bg-input border border-gray-600 rounded-md px-3 py-2 outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : order.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  )}
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
            <h1 className="font-semibold text-sm text-heading">Username : {order.userEmail}</h1>
            <h1 className="font-semibold text-sm">Total Order : ${order.billing.total}</h1>          
          </div>
          </div>
          <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3">

                {/* Details */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-gray-400">

                  <div className="flex items-center gap-1">
                    <span>Platform:</span>
                    <span className="text-white">{item.category}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span>Region:</span>
                    <span className="text-white">Global</span>
                  </div>

                </div>

                {/* View Details */}
                <button className="text-heading flex items-center gap-1 text-xs whitespace-nowrap self-start sm:self-auto "
                 onClick={() => navigate(`/order/${order.orderId}`)} >
                  <span className=" border-b border-input hover:border-heading">View Details</span>
                  <FaAngleRight className="text-[15px]" />
                </button>

              </div>
          </div>

          </div>
            </>
           )
        })}
        
      </section>
       {/* pagination section goes here */}
       <div className="flex justify-between mt-5">
        <p className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-gray-400 line-clamp-3">Showing {orders.length === 0 ? 0 : startIndex + 1}-{endIndex} of {orders.length}</p>
         <div className="flex items-center justify-center gap-2 ">
            <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-2 border border-[#A1A1A1] text-[#E5E7EB] rounded-md hover:border-[#FF6B00] hover:text-[#FF6B00] disabled:opacity-40 disabled:cursor-not-allowed transition">
              <FaAngleLeft />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} onClick={() => goToPage(index + 1)} className={`w-9 h-9 border rounded-md transition ${currentPage === index + 1 ? "bg-[#FF6B00] border-[#FF6B00] text-white" : "border-[#A1A1A1] text-[#E5E7EB] hover:border-[#FF6B00] hover:text-[#FF6B00]"}`}>
                {index + 1}
              </button>
            ))}

            <button onClick={nextPage} disabled={currentPage === totalPages} className="px-3 py-2 border border-[#A1A1A1] text-[#E5E7EB] rounded-md hover:border-[#FF6B00] hover:text-[#FF6B00] disabled:opacity-40 disabled:cursor-not-allowed transition">
              <FaAngleRight />
            </button>
          </div>
       </div>


    </div>
  )
}

export default AdminOrders