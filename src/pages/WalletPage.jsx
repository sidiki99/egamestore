
import {  FaCheck, FaGamepad, FaGift, FaPercentage, FaShippingFast, FaUsers } from "react-icons/fa";


export default function Wallet() {
  return (
    <section className="px-2 md:px-20 mt-10">
        <div className="mt-3 rounded-lg  bg-[#17191D] p-3 md:p-5">
   
            <div>
              <h3 className="mb-1 text-xl md:text-2xl font-bold">
              My Point Wallets
              </h3>

              <p className="text-xs md:text-sm leading-5 text-[#9CA3AF] mt-5 ">
                        0.00  balance in your wallet

              </p>
            </div>
  

       </div> 
       {/* Ponits info  */}
       <div className=" md:flex w-full mt-10 gap-10">
         {/* left card */}
          <div className=" w-full md:w-1/2 flex-col flex rounded-2xl border border-gray-50/20 bg-[#17191D] p-5  ">
            <h1 className="text-xl font-semibold  ">How to Earn Points</h1>
            <div className="bg-background p-3 flex gap-3 rounded-xl mt-4">
              <div className=" px-3 py-3 bg-[#05B5D3]/20 rounded-xl">
               <FaGamepad className="text-2xl text-[#05B5D3]" />
              </div>
              <div>
                <h1 className="font-semibold">Complete Game</h1>
                <p className="text-xs md:text-sm leading-5 text-[#9CA3AF]">Earn 50 to 200 points per game</p>
              </div>
            </div>

             <div className="bg-background p-3 flex gap-3 rounded-xl mt-4">
              <div className=" px-3 py-3 bg-[#8b5cf6]/20 rounded-xl">
               <FaCheck className="text-2xl text-[#8b5cf6]" />
              </div>
              <div>
                <h1 className="font-semibold">Daily Login</h1>
                <p className="text-xs md:text-sm leading-5 text-[#9CA3AF]">Get 25 points  daily</p>
              </div>
            </div>


            <div className="bg-background p-3 flex gap-3 rounded-xl mt-4">
              <div className=" px-3 py-3 bg-[#EB4899]/20 rounded-xl">
               <FaUsers className="text-2xl text-[#EB4899]" />
              </div>
              <div>
                <h1 className="font-semibold">Refer Friends</h1>
                <p className="text-xs md:text-sm leading-5 text-[#9CA3AF]">Earn 500 points per referral</p>
              </div>
            </div>
          </div>

          {/* right Card */}
           <div className=" w-full md:w-1/2 flex-col flex rounded-2xl border border-gray-50/20 bg-[#17191D] p-5  ">
            <h1 className="text-xl font-semibold  ">How to Use Points</h1>
            <div className="bg-background p-3 flex gap-3 rounded-xl mt-4 items-center">
              <div className=" px-3 py-3 bg-[#EE4645]/20 rounded-xl w-13 h-13 ">
               <FaPercentage className="text-2xl text-[#EE4645]" />
              </div>
              <div className="flex justify-between w-full">
              <div>
                <h1 className="font-semibold">Discount Coupons</h1>
                <p className="text-xs md:text-sm leading-5 text-[#9CA3AF]">Starting  from 500 points </p>
                 </div>
                <p className="text-lg text-heading font-semibold cursor-pointer">Radeem</p>
              </div>
            </div>

             <div className="bg-background p-3 flex gap-3 rounded-xl mt-4 items-center ">
              <div className=" px-3 py-3 bg-[#3d8287]/20 rounded-xl  w-13 h-13">
               <FaShippingFast className="text-2xl text-[#3d8287]  " />
              </div>
              <div className="flex justify-between w-full">
                <div >
                <h1 className="font-semibold">Free Shipping</h1>
                <p className="text-xs md:text-sm leading-5 text-[#9CA3AF]"> 250 points  per order</p>
                </div>
                <p className="text-lg text-heading font-semibold cursor-pointer">Radeem</p>
              </div>
            </div>


            <div className="bg-background p-3 flex gap-3 rounded-xl mt-4 items-center">
              <div className=" px-3 py-3 bg-[#22c65f]/20 rounded-xl w-13 h-13 ">
               <FaGift className="text-2xl text-[#22c65f]" />
              </div>
               <div className="flex justify-between w-full">
              <div>
                <h1 className="font-semibold">Exclusive Products </h1>
                <p className="text-xs md:text-sm leading-5 text-[#9CA3AF]">Premium  items available</p>
                </div>

                <p className="text-lg text-heading font-semibold cursor-pointer">Browse</p>
                
              </div>
            </div>
          </div>
        </div>  

        {/* Transaction History   */}
        <TransactionHistory />
        
    </section>
  )
}




const TransactionHistory = () => {
  const orders= JSON.parse(localStorage.getItem("orders")); 
  const currentUser= JSON.parse(localStorage.getItem("currentUser"));  
  const transactions= orders.filter((item)=>item.userEmail === currentUser.email);


  return (
    <div className=" w-full  flex items-center justify-center  font-sans mt-20">
      <div className="w-full rounded-[14px] border border-gray-50/20 bg-[#17191D] px-8 pt-7 pb-3 max-md:px-5">
        <h2 className="mb-[22px] text-[25px] font-semibold text-[#e8e8ec]">
          Transaction History
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr>
                <th className=" border-b border-[#26262e] pb-3 text-left text-[13px] font-medium text-[#8b8b96]">
                 ID
                </th>
                <th className=" border-b border-[#26262e] pb-3 text-left text-[13px] font-medium text-[#8b8b96]">
                  Date
                </th>

                 <th className=" border-b border-[#26262e] pb-3 text-left text-[13px] font-medium text-[#8b8b96]">
                  No. Of Items
                </th>

                <th className=" border-b border-[#26262e] pb-3 text-left text-[13px] font-medium text-[#8b8b96]">
                  Status
                </th>


                <th className=" border-b border-[#26262e] pb-3 text-left text-[13px] font-medium text-[#8b8b96]">
                  Total
                </th>

                
               
              </tr>
            </thead>

            <tbody>
              {transactions.length > 0 ?
             
              (transactions.map((transaction, index) => (
                <tr key={index}>
                    <td className="border-b border-[#26262e] py-4  text-sm whitespace-nowrap text-[#8b8b96] last:border-b-0">
                    {transaction.orderId}
                  </td>
                  <td className="border-b border-[#26262e] py-4 text-sm whitespace-nowrap text-[#8b8b96] last:border-b-0">
                    {new Date(transaction.orderDate).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>

                   <td  className="border-b border-[#26262e] py-4 text-sm font-medium whitespace-nowrap text-[#e8e8ec]">
                      {transaction.orderItems?.length}                
                     </td>

                   <td
                    className={`border-b border-[#26262e] py-4 text-sm font-semibold whitespace-nowrap tabular-nums ${
                      transaction.status === "Complete"
                        && "text-[#3ecf7e]" ||
                        transaction.status === "Pending"
                        && "text-yellow-400" ||
                         transaction.status === "Canceled"
                        && "text-danger/20"
                        
                    }`}
                  >
                    {transaction.status}
                  </td>

            
                     <td  className="border-b border-[#26262e] py-4 text-sm font-medium whitespace-nowrap text-[#e8e8ec]">
                      {transaction.billing?.total}$                 
                     </td>
                </tr>
              )))
             
            :
            (
                  <tr>
                    <td colSpan="5" className="py-4 text-sm text-[#e8e8ec]">
                      No transaction yet
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


