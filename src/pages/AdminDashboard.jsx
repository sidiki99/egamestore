import { useEffect, useState } from "react";
import {  FaAngleRight, FaCheck, FaDollarSign,  FaGamepad,  FaShoppingCart, FaUsers } from "react-icons/fa"
import { FaArrowsRotate } from "react-icons/fa6"
import games from "../data/games.json"
import { useNavigate } from "react-router-dom";
import OrdersChart from "../components/OrdersChart";


function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const navigate= useNavigate();

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
 const users = JSON.parse(localStorage.getItem("users")) || [];

const pending=orders.filter((item)=>item.status === "Pending");
const completed=orders.filter((item)=>item.status === "Completed");
const totalSpent = orders.reduce((sum, order) => {
  return sum + Number(order.billing.total);
}, 0);


// recent order
const recentOrders = [...orders]
  .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
  .slice(0, 2);

  return (
    <div className=" px-5 md:px-20">
      <section className="mt-10">
        {/* Top OF Order PAge */}
        <div className="md:flex justify-between">
          <div>
            <h1 className="font-semibold text-lg mb-4">Dashboard</h1>            
          </div>       
        </div>

        {/* Overall details of Myorders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
              {/* Total Users*/}
              <div className="border border-gray-700 rounded-lg p-4 bg-input flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#60A5FA]/20 flex items-center justify-center">
                  <FaUsers className="text-[#60A5FA]" />
                </div>
                <div>
                  <p className="text-white text-lg font-semibold">{users.length}</p>
                  <p className="text-gray-400 text-xs">Total Users</p>
                </div>
              </div>

              {/* GAmes*/}
              <div className="border border-gray-700 rounded-lg p-4 bg-input flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#FACC15]/20 flex items-center justify-center">
                  <FaGamepad className="text-[#FACC15]" />
                </div>
                <div>
                  <p className="text-white text-lg font-semibold">{games.length}</p>
                  <p className="text-gray-400 text-xs">Total Games</p>
                </div>
              </div>

             

              {/* Total Revenue*/}
              <div className="border border-gray-700 rounded-lg p-4 bg-input flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#4ADE80]/20 flex items-center justify-center">
                  <FaDollarSign  className="text-[#4ADE80]"/>
                </div>
                <div>
                  <p className="text-white text-lg font-semibold">${totalSpent}</p>
                  <p className="text-gray-400 text-xs">Total Revenue</p>
                </div>
              </div>

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
                  <p className="text-gray-400 text-xs">Completed Orders</p>
                </div>
              </div>

              {/* Total Products */}
              <div className="border border-gray-700 rounded-lg p-4 bg-input flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#986BC9]/20 flex items-center justify-center">
                  < FaArrowsRotate className="text-[#986BC9]" />
                </div>
                <div>
                  <p className="text-white text-lg font-semibold">{pending.length}</p>
                  <p className="text-gray-400 text-xs">Pending Orders</p>
                </div>
              </div>

             

        </div>
        {/* Recent Orders  */}
        <div className="md:flex justify-between mt-5 gap-5">
           {/* Chart   */}
          <div className="w-full md:w-2/3">
           <h1 className="font-semibold text-lg mb-4"> Orders Chart</h1> 
            <OrdersChart />
         
          </div>   
           <div className="w-full md:w-1/3">
            <h1 className="font-semibold text-lg mb-4">Recent Orders</h1>  
              {/* Orders */}
                    {recentOrders.map((order)=>{
                       const item = order.orderItems[0];
                       return(
                        <>
                         <div key={order.orderId}  className="border   mt-5 border-gray-700 bg-input p-5 rounded-lg">
                      <div className=" justify-between md:flex">
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
                        <h1 className="font-semibold text-sm text-heading">Username : {order.userEmail}</h1>
                        <h1 className="font-semibold text-sm">Total Order : ${order.billing.total}</h1>   
                         {/* View Details */}
                            <button className="text-heading flex items-center gap-1 text-xs whitespace-nowrap self-start sm:self-auto "
                             onClick={() => navigate(`/order/${order.orderId}`)} >
                              <span className=" border-b border-input hover:border-heading">View Details</span>
                              <FaAngleRight className="text-[15px]" />
                            </button>
                   
                      </div>
                      </div>
                      <div>
                     
                      </div>
            
                      </div>
                        </>
                       )
                    })}          
          </div>  
         
        </div>   
        {/* Top Games selling */}
        <div>
          <TopGamesOrderStatus />
        </div>
        
      </section>    

    </div>
  )
}

export default AdminDashboard



const TopGamesOrderStatus = () => {
  const [topGames, setTopGames] = useState([]);
  const [orderStatus, setOrderStatus] = useState({
    completed: 0,
    pending: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const statusCount = {
      completed: 0,
      pending: 0,
      cancelled: 0,
    };

    orders.forEach((order) => {
      const status = order.status?.toLowerCase();

      if (status === "completed") {
        statusCount.completed++;
      } else if (status === "pending") {
        statusCount.pending++;
      } else if (status === "cancelled" || status === "canceled") {
        statusCount.cancelled++;
      }
    });

    setOrderStatus(statusCount);

    const games = {};

    orders.forEach((order) => {
      order.orderItems?.forEach((item) => {
        const id = item.id;

        if (!games[id]) {
          games[id] = {
            id: item.id,
            title: item.title,
            image: item.image,
            quantity: 0,
            revenue: 0,
          };
        }

        games[id].quantity += Number(item.qty) || 0;
        games[id].revenue +=
          (Number(item.price) || 0) * (Number(item.qty) || 0);
      });
    });

    const sortedGames = Object.values(games)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    setTopGames(sortedGames);
  }, []);

  const totalOrders =orderStatus.completed + orderStatus.pending +  orderStatus.cancelled;

  const getPercentage = (value) => {
    if (totalOrders === 0) return 0;
    return Math.round((value / totalOrders) * 100);
  };

  const maxSold = topGames[0]?.quantity || 1;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

      {/* TOP GAMES */}
      <div className=" border border-gray-200 rounded-2xl p-5 shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold ">
              Top Games
            </h2>
            <p className="text-sm  mt-1">
              Best selling games
            </p>
          </div>
          <button className="text-sm font-medium text-orange-500 hover:text-orange-600">
            View All
          </button>
        </div>

        {/* Games */}
        <div className="space-y-5">
          {topGames.length > 0 ? (
            topGames.map((game, index) => {
              const progress = (game.quantity / maxSold) * 100;
              return (
                <div
                  key={game.id}
                  className="flex items-center gap-4"
                >

                  {/* Rank */}
                  <div className="w-7 text-center">
                    <span className="text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>

                  {/* Image */}
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-12 h-14 rounded-lg object-cover"
                  />

                  {/* Game Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold truncate">
                        {game.title}
                      </h3>

                      <span className="text-xs font-semibold  whitespace-nowrap">
                        {game.quantity} sold
                      </span>

                    </div>

                    {/* Progress */}
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    {/* Revenue */}
                    <p className="text-xs text-gray-400 mt-1">
                      ${game.revenue.toLocaleString()} revenue
                    </p>

                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-10 text-center text-gray-400">
              No sales data available
            </div>
          )}

        </div>
      </div>
 
      <div className=" border border-gray-200 rounded-2xl p-5 shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-lg font-bold ">
              Order Status
            </h2>

            <p className="text-sm mt-1">
              Current order overview
            </p>
          </div>
          <button className="text-sm font-medium text-orange-500 hover:text-orange-600">
            View All
          </button>

        </div>


        {/* Total Orders */}
        <div className="flex items-center justify-center mb-7">

          <div className="w-32 h-32 rounded-full border-[12px] border-orange-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-2xl font-bold ">
                {totalOrders}
              </p>

              <p className="text-xs ">
                Orders
              </p>
            </div>
          </div>
        </div>


        {/* Status List */}
        <div className="space-y-5">

         
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-sm font-medium ">
                  Completed
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {orderStatus.completed}
                </span>

                <span className="text-xs ">
                  {getPercentage(orderStatus.completed)}%
                </span>
              </div>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2">

              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${getPercentage(
                    orderStatus.completed
                  )}%`,
                }}
              />

            </div>

          </div>


          {/* Pending */}
          <div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="text-sm font-medium ">
                  Pending
                </span>
              </div>

              <div className="flex items-center gap-2">

                <span className="text-sm font-semibold ">
                  {orderStatus.pending}
                </span>

                <span className="text-xs ">
                  {getPercentage(orderStatus.pending)}%
                </span>

              </div>

            </div>

            <div className="w-full bg-gray-100 rounded-full h-2">

              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{
                  width: `${getPercentage(
                    orderStatus.pending
                  )}%`,
                }}
              />

            </div>

          </div>


          {/* Cancelled */}
          <div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-sm font-medium">
                  Cancelled
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold ">
                  {orderStatus.cancelled}
                </span>
                <span className="text-xs">
                  {getPercentage(orderStatus.cancelled)}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">

              <div
                className="bg-red-500 h-2 rounded-full"
                style={{
                  width: `${getPercentage(
                    orderStatus.cancelled
                  )}%`,
                }}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

