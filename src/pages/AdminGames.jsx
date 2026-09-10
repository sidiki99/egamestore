
import {  useEffect, useState } from "react";
import games from "../data/games.json"
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import usePagination from "../hooks/usePagination";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function AdminGames() {
   const [isOpen, setIsOpen] = useState(false);
     const [editingGame, setEditingGame] = useState(null);
  
  const [gameList, setGameList] = useState(() => {
  const savedGames = localStorage.getItem("games");

  return savedGames ? JSON.parse(savedGames) : games;
});
  const deleteGame = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete this game?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      const savedGames =
        JSON.parse(localStorage.getItem("games")) || gameList;

      const updatedGames = savedGames.filter(
        (game) => game.id !== id
      );

      localStorage.setItem(
        "games",
        JSON.stringify(updatedGames)
      );

      setGameList(updatedGames);

      Swal.fire({
        title: "Deleted!",
        text: "Game has been deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
};

const{currentItems,currentPage,nextPage,prevPage,totalPages,goToPage,startIndex,endIndex}=usePagination(gameList,8);

const handleAddClick = () => {
    setEditingGame(null);
    setIsOpen(true);
  };

   // EDIT
  const handleEditClick = (game) => {
    setEditingGame(game);
    setIsOpen(true);
  };

  return (
    <section className="mt-10 px-2 md:px-23">
     <div>
       <div className="flex justify-between">
        <h1 className="text-md font-semibold" >Total Games : {gameList.length}</h1>
         {/* Open Button */}
      <button
        type="button"
        className="rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        onClick={handleAddClick}
      >
        Add Game
      </button>
       
       </div>
        {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead>
            <tr className="border-b border-heading ">
              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
                Game ID
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
                Image
              </th>

               <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
               Title
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
                Category
              </th>

               <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
                Price
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
                Release Date
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide ">
               Action
              </th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((game) => (
              <tr
                key={game.id}
                className="border-b border-heading transition hover:bg-gray-50/40"
              >
                {/* Order ID */}
                <td className="px-5 py-4">
                  <span className="text-sm font-semibold ">
                    {game.id}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img className="flex h-9 w-9 items-center justify-center rounded bg-orange-100 text-sm font-bold text-orange-600"
                      src={game.image}
                      >
                    </img>

                  
                  </div>
                </td>

                {/* Customer */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex  items-center justify-center  text-sm font-bold ">
                      {game.title}
                    </div>

                   
                  </div>
                </td>

                {/* Game */}
                <td className="px-5 py-4">
                  <span className="text-sm ">
                    {game.category}
                  </span>
                </td>

                
                <td className="px-5 py-4">
                  <span className="text-sm font-bold ">
                    {game.price}$
                  </span>
                </td>

                {/* Date */}
                <td className="px-5 py-4">
                  <span className="text-sm ">
                    {game.releaseDate}
                  </span>
                </td>

               

               
                {/* Action */}
                <td className="px-5 py-4 flex gap-2">
                  <button className="text-sm font-semibold text-orange-500 transition hover:text-orange-600"
                   onClick={() => handleEditClick(game)}>
                    Edit
                  </button>
                  <button className="text-sm font-semibold text-orange-500 transition hover:text-orange-600"
                  onClick={() => deleteGame(game.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          {/* pagination section goes here */}
               <div className="flex justify-between mt-5">
                <p className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-gray-400 line-clamp-3">Showing {currentItems.length === 0 ? 0 : startIndex + 1}-{endIndex} of {gameList.length}</p>
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
     <AddGamePopup   
        gameList={gameList}
        setGameList={setGameList}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editingGame={editingGame} />

      
    </section>
  )
}

export default AdminGames





const AddGamePopup = ({  
  gameList,
  setGameList,
  isOpen,
  setIsOpen,
  editingGame, }) => {
 

  const [formData, setFormData] = useState({
    id:"",
    title: "",
    price: "",
    image:"",
    category: "",
    description: "",
    releaseDate: "",
  });
  useEffect(() => {
  if (editingGame) {
    setFormData({
      id: editingGame.id,
      title: editingGame.title || "",
      price: editingGame.price || "",
      image: editingGame.image || "",
      category: editingGame.category || "",
      description: editingGame.description || "",
      releaseDate: editingGame.releaseDate || "",
    });
  } else {
    setFormData({
      id: "",
      title: "",
      price: "",
      image: "",
      category: "",
      description: "",
      releaseDate: "",
    });
  }
}, [editingGame]);
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  };

   const handleChange = async (e) => {
    const { name, value, files } = e.target;

    // PImage
    if (name === "image") {
      const file = files?.[0];

      if (!file) return;

    
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image");
        return;
      }

      const base64 = await convertToBase64(file);

      setFormData((prev) => ({
        ...prev,
        image: base64,
      }));

      return;
    }

  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 const handleAddGameSubmit = (e) => {
  e.preventDefault();

  if (
    !formData.title ||
    !formData.price ||
    !formData.category ||
    !formData.releaseDate ||
    !formData.description
  ) {
    toast.error("Please Fill All Fields");
    return;
  }

  // EDIT / UPDATE
  if (editingGame) {
    const updatedGames = gameList.map((game) =>
      game.id === editingGame.id ? {
            ...formData,
            id: editingGame.id,
          }
        : game
    );

    setGameList(updatedGames);
    localStorage.setItem("games", JSON.stringify(updatedGames));
    toast.success("Game Updated Successfully");
    setIsOpen(false);
    return;
  }

  // ADD NEW GAME
  const newGame = {
    ...formData,
    id: Date.now(),
    price: Number(formData.price),
  };

  const updatedGames = [...gameList, newGame];

  setGameList(updatedGames);
  localStorage.setItem("games", JSON.stringify(updatedGames));

  toast.success("Game Added Successfully");

  setIsOpen(false);
};

  return (
    <>
     

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          {/* Form */}
          <form
            onSubmit={handleAddGameSubmit}
            className="relative w-full max-w-lg rounded-xl bg-input p-6 shadow-xl"
          >
            
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-3 text-2xl text-heading"
            >
              ×
            </button>

            <h2 className="mb-6 text-2xl font-bold text-heading">
              Add New Game
            </h2>

            <div className="space-y-4">
            <div className="md:flex justify-between ">
                {/* Game Name */}
              <div>
                <label className="mb-1 block font-medium">
                  Game Name
                </label>

                <input
                  type="text"
                  placeholder="Enter game name"
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-orange-500"
                />
              </div>

              {/* Price */}
              <div>
                <label className="mb-1 block font-medium">
                  Price
                </label>

                <input
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  onChange={handleChange}
                  value={formData.price}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-orange-500"
                />
              </div>

            </div>
               <div className="  justify-between">
                 {/* Image */}
              <div>
                <label className="mb-1 block font-medium">
                  Image
                </label>

                <input
                   type="file" name="image"
                   accept="image/*" onChange={handleChange}
              
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-orange-500"
                />
              </div>

                  {/* Release Date */}
              <div>
                <label className="mb-1 block font-medium">
                  Release Date
                </label>

                <input
                  type="date"
                  name="releaseDate"
                  onChange={handleChange}
                  value={formData.releaseDate}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-orange-500"
                />
              </div>


               </div>
              {/* Category */}
              <div>
                <label className="mb-1 block font-medium">
                  Category
                </label>

                <select
                  name="category"
                  onChange={handleChange}
                  value={formData.category}
                  className="w-full rounded-lg border border-gray-300 bg-input px-4 py-2.5 outline-none focus:border-orange-500"
                >
                  <option value="">Select category</option>
                  <option value="PC">PC</option>
                  <option value="PlayStation">PlayStation</option>
                  <option value="Xbox">Xbox</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="mb-1 block font-medium">
                  Description
                </label>

                <textarea
                  rows="3"
                  placeholder="Enter description"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-orange-500"
                />
              </div>

          

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
                >
                  {editingGame ? "Update Game" : "Add Game"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

