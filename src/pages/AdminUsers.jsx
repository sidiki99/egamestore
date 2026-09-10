
import { useState } from "react";

import toast from "react-hot-toast";
import Swal from "sweetalert2";
import usePagination from "../hooks/usePagination";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function AdminUsers() {

  
 const [userList, setUserList] = useState(() => {
  const savedUsers = localStorage.getItem("users");
  return savedUsers ? JSON.parse(savedUsers) : users;
});
const currentUser=JSON.parse(localStorage.getItem("currentUser"));
const totalOrders= JSON.parse(localStorage.getItem("orders"));

const deleteUser = (email) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete this user?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      const savedUsers =  JSON.parse(localStorage.getItem("users")) || userList;
        if(currentUser?.email === email){
           Swal.fire({
              title: "Can't Be Deleted!",
              text: "Current User Can Not Be Deleted",
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });
          return
        }


      const updatedUsers = savedUsers.filter(
        (user) => user.email !== email
      );     
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      
      setUserList(updatedUsers);

      Swal.fire({
        title: "Deleted!",
        text: "User has been deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
};

const{currentItems,currentPage,nextPage,prevPage,totalPages,goToPage,startIndex,endIndex}=usePagination(userList,3);

const profiles= JSON.parse(localStorage.getItem("Profile"))





  return (
    <section className="mt-10 px-2 md:px-23">
     <div>
       <div className="flex justify-between">
        <h1 className="text-md font-semibold" >Total Users : {userList.length}</h1>
         {/* Open Button */}
    
       
       </div>
        {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead>
            <tr className="border-b border-heading ">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
              Srl.
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
                Profile Image
              </th>

               <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
               Name
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
                Username
              </th>

               <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
                Email
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
                Release Date
              </th>
               <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
                Orders
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
               Action
              </th>
            </tr>
          </thead>

        <tbody>
          {currentItems.map((user,index) => {
          const currProfile = profiles?.find( (p) => p.email === user.email ); 
          const filteredOrders = totalOrders?.filter((p) => p.userEmail === user.email );

    return (
      <tr
        key={user.email}
        className="border-b border-heading transition hover:bg-gray-50/40"
      >
     
        <td className="px-5 py-4">
          <span className="text-sm font-semibold">
              {index + 1}
          </span>
        </td>

        {/* Image */}
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <img
          src={currProfile?.profileImg}
          alt={currProfile?.name}
          className="h-10 w-10 rounded-full object-cover"
        />
          </div>
        </td>

        {/* Customer */}
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="text-sm font-bold">
                {currProfile?.name || "No Name"}
            </div>
          </div>
        </td>

        
        <td className="px-5 py-4">
          <span className="text-sm">
             {currProfile?.username || "No Username"}
          </span>
        </td>

       
        <td className="px-5 py-4">
          <span className="text-sm font-bold">
             {user?.email || "No Email"}
          </span>
        </td>

    
        <td className="px-5 py-4">
          <span className="text-sm">
          {currProfile?.phone || "No Phone"}
          </span>
        </td>

         <td className="px-5 py-4">
          <span className="text-sm">
          {filteredOrders?.length || "NA"}
          </span>
        </td>

       

        {/* Actions */}
        <td className="px-5 py-4">
          <div className="flex gap-2">          

            <button
              className="text-sm font-semibold text-orange-500 transition hover:text-orange-600"
              onClick={() => deleteUser(user.email)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
        </table>
          {/* pagination section goes here */}
               <div className="flex justify-between mt-5">
                <p className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-gray-400 line-clamp-3">Showing {currentItems.length === 0 ? 0 : startIndex + 1}-{endIndex} of {userList.length}</p>
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

     </div>
    

      
    </section>
  )
}

export default AdminUsers





