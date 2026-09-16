import { useEffect, useRef, useState } from "react"
import { NavLink    ,Link, useNavigate,  } from "react-router-dom";
import games from "../data/games.json"

import logo from "../assets/images/logo.avif";

import menuIcon from "../assets/images/menu icon.png";

import Swal from "sweetalert2";
import { FaAngleDown, FaLockOpen, FaSearch, FaShoppingCart, FaTimes, FaUser, FaWallet } from "react-icons/fa";
import {   FaLocationDot, FaNoteSticky } from "react-icons/fa6";
import { useSelector } from "react-redux";

;



function Navbar() {
  const [openMenu,setOpenMenu]= useState(false);
 
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [profilePic,setProfilePic]=useState();

  const cart = useSelector((store) => store.cartStore.cart);
  const cartTotal = cart.reduce((total, item) => total + item.qty, 0);
useEffect(() => {
  const searchGames = async () => {
    if (!search.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      // Get games from localStorage
      const storedGames = JSON.parse( localStorage.getItem("games") || "[]" );
  
      const jsonGames = games   
      const allGames = [...storedGames, ...jsonGames];

    
      const uniqueGames = Array.from(
        new Map(
          allGames.map((game) => [game.id, game])
        ).values()
      );

      // Search by title
      const searchText = search.toLowerCase().trim();

      const filteredGames = uniqueGames
        .filter((game) => {
          const title = (
            game.title ||
            game.category||
            ""
          ).toLowerCase();

          return title.includes(searchText);
        })
        .slice(0, 8);

      setResults(filteredGames);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }
  };

  searchGames();
}, [search]);

const handleGameClick = (game) => {
  setSearch("");
  setResults([]);
  setShowResults(false);

  navigate(`/game/${game.id}`);
};

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      settingsRef.current &&
      !settingsRef.current.contains(event.target)
    ) {
      setShowSettings(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

// for updated profile pic
// useEffect(()=>{
//   const profiles = JSON.parse( localStorage.getItem("Profile") || "[]" );
// const selectedProfile=profiles?.find((item)=>item.email === currentUser?.email)


// if (selectedProfile) {
//     setProfilePic(selectedProfile.profileImg);
//   }
// },[profilePic])

useEffect(() => {
  const loadProfile = () => {
    const profiles = JSON.parse(localStorage.getItem("Profile") || "[]");

    const selectedProfile = profiles.find(
      (item) => item.email === currentUser?.email
    );

    if (selectedProfile) {
      setProfilePic(selectedProfile.profileImg);
    }
  };

  loadProfile();

  window.addEventListener("profileUpdated", loadProfile);

  return () => {
    window.removeEventListener("profileUpdated", loadProfile);
  };
}, [currentUser?.email]);
  

 const publicNavItems = [
  { name: "Home", path: "/" },
  { name: "PC Games", path: "/pc-games" },
  { name: "Play Station", path: "/play-station" },
  { name: "Deals", path: "/deals" },
  { name: "Blog", path: "/blog" },
];

const userNavItems = [
  { name: "Home", path: "/" },
  { name: "PC Games", path: "/pc-games" },
  { name: "Play Station", path: "/play-station" },
  { name: "Deals", path: "/deals" },
  { name: "Blog", path: "/blog" },
];

const adminNavItems = [
  { name: "Home", path: "/admin" },
  { name: "All Orders", path: "/admin-orders" },
  { name: "All Games", path: "/admin-games" },
  { name: "Users", path: "/admin-users" },
];
let navItems;

if (!currentUser) {
 
  navItems = publicNavItems;
} else if (currentUser.role === "admin") {
 
  navItems = adminNavItems;
} else {

  navItems = userNavItems;
}
 
const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
     localStorage.removeItem("currentUser");
      setOpenMenu(false)
      navigate("/login");

    }
  });
};
const [country, setCountry] = useState("");
 useEffect(() => {
  fetch("https://ipwho.is/")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setCountry(data.country);
      }
    })
    .catch((error) => {
      console.log("Location error:", error);
    });
}, []);
console.log(country || "Loading...")
  return (
  <nav className="bg-header w-full mt-8">
  <div className="max-w-[1400px] mx-auto px-4">

   
    <div className="flex items-center justify-between ">

      {/* Logo */}
      <div className="shrink-0">
        <Link to="/">
          <img
            src={logo}
            alt="Gaming Store"
            className="h-10 lg:h-12 w-auto "
          />
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex items-center gap-4 lg:gap-6 xl:gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink to={item.path}
                // className="whitespace-nowrap py-2 border-b-2 border-transparent hover:text-heading hover:border-heading transition-all duration-300"

                className={({ isActive }) => `whitespace-nowrap py-2 border-b-2 transition-all duration-300 ${isActive ? "text-heading border-heading" : "border-transparent hover:text-heading hover:border-heading"}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Right section */}
      <div className="hidden md:flex items-center gap-5">
        {/* <div className="flex items-center rounded-lg px-3 py-2">
          <img  src={searchIcon}  alt="Search" className="w-4 h-4"  />

          <input type="text" placeholder="Search"
            className="ml-2 w-28 lg:w-40 bg-transparent focus:outline-none"
          />
        </div> */}

       {currentUser?.role === "user" &&
        <div className="relative w-full max-w-xl">

                <FaSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-heading"
                  size={15}
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => {
                    if (search.trim()) {
                      setShowResults(true);
                    }
                  }}
                  placeholder="Search games..."
                  className="w-full rounded-xl border border-[#303747]  py-3 pl-11 pr-10 text-sm text-white outline-none placeholder:text-gray-500 focus:border-heading"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setResults([]);
                      setShowResults(false);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <FaTimes  size={14} />
                  </button>
                )}

                {/* Search Results */}
                {showResults && search.trim() && (
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-[#303747] bg-[#151A27] shadow-2xl">

                    {results.length > 0 ? (
                      <div className="max-h-[400px] overflow-y-auto">

                        {results.map((game) => (
                          <div
                            key={game.id}
                            onClick={() => handleGameClick(game)}
                            className="flex cursor-pointer items-center gap-3 border-b border-[#252B3A] px-4 py-3 transition hover:bg-[#202636]"
                          >
                            <img
                              src={
                                game.image     }
                              alt={game.title }
                              className="h-12 w-12 rounded-lg object-cover"
                            />

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-white">
                                {game.title }
                              </p>

                              {game.category && (
                                <p className="mt-1 text-xs text-gray-500">
                                  {game.category}
                                </p>
                              )}
                            </div>

                            <span className="text-gray-500">
                              →
                            </span>
                          </div>
                        ))}

                      </div>
                    ) : (
                      <div className="px-5 py-6 text-center">
                        <p className="text-sm text-gray-400">
                          No games found
                        </p>
                      </div>
                    )}

                  </div>
                )}

              </div>
              }

        <div
        className=" cursor-pointer flex gap-1" > 
        <FaLocationDot className="text-2xl" />
          <span className=" min-w-5 h-5 px-1 flex items-center justify-center  text-white text-xs ">
            {country}
          </span>
        
        </div>

{/* 
        <select className=" bg-transparent text-white  rounded-md px-2 py-1 outline-none cursor-pointer hover:text-heading transition">
        <option className="bg-input hover:bg-heading text-white">Eng</option>
        <option className="bg-input hover:bg-heading text-white">Urdu</option>
      </select> */}

  <div className="relative group w-15">
  <button className="w-full  text-white px-3 py-2 text-left flex items-center gap-1 hover:text-heading">
    EN <FaAngleDown/>
  </button>

  <div className="absolute left-0 top-full w-full hidden group-hover:block bg-input text-white">
    <div className="px-3 py-2 hover:bg-heading cursor-pointer">UR</div>
    <div className="px-3 py-2 hover:bg-heading cursor-pointer">AR</div>
    <div className="px-3 py-2 hover:bg-heading cursor-pointer">ZN</div>
  </div>
</div>
        <div
        className="relative cursor-pointer"
        onClick={() => navigate("/cart")}
      >
        <FaShoppingCart className="text-2xl" />

        {cartTotal > 0 && (
          <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-heading text-white text-xs font-bold">
            {cartTotal > 99 ? "99+" : cartTotal}
          </span>
        )}
        </div>

        {currentUser?
      <div className=" flex gap-4 items-center">
         
          {/*  Option */}
          <div className="relative" ref={settingsRef}>

          {/* Profile Button */}
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-300 hover:text-orange-500 hover:bg-[#262930] transition-all cursor-pointer"
          >
            <img src={profilePic || "../src/assets/images/customer2 (2).jpg"} className="w-10 h-10 object-cover border-3 border-white rounded-full" />
          </button>

          {/* Dropdown */}
          {showSettings && (
            <div className="absolute -right-5 top-full mt-2 w- bg-[#262930] border border-heading rounded-xl shadow-xl p-1 z-50 text-white">
               <Link to={"/profile"}
               className=" hover:text-heading   p-2 rounded-lg transition flex gap-1 items-center font-semibold">
                <FaUser  className="text-xs" /> Profile
              </Link>

              {currentUser.role==="user" &&(
                 <Link to={"/orders"}
               className=" hover:text-heading   p-2 rounded-lg transition flex gap-1 items-center font-semibold">
                <FaNoteSticky  className="text-xs" /> Orders
              </Link>
              )}

               <Link to={"/wallet"}
               className=" hover:text-heading   p-2 rounded-lg transition flex gap-1 items-center font-semibold">
              <FaWallet  className="text-xs" /> Wallet
              </Link>

               <Link onClick={handleLogout}
               className=" hover:text-heading   p-2 rounded-lg transition flex gap-1 items-center font-semibold">
                <FaLockOpen  className="text-xs" /> Logout
              </Link>
              

              

              
            </div>
          )}

        </div>
       
         </div>
        :
     
        <Link to="/login"
          className="bg-heading hover:bg-orange-600 px-4 py-3 rounded-lg transition"
        >
          Login
        </Link>}
      </div>

      {/* Mobile Button */}
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="md:hidden"
      >
        <img src={menuIcon}  alt="Menu" className="w-8"
        />
      </button>

    </div>

    {/* Mobile Menu */}
    {openMenu && (
      <div className="md:hidden pb-5">
        <ul className="flex flex-col gap-4">

          {navItems.map((item) => (
            <li key={item.name}>
              <Link   to={item.path}  onClick={() => setOpenMenu(false)}
                className="block py-2 hover:text-heading transition"
              >
                {item.name}
              </Link>
            </li>
          ))}

         {
          currentUser? <li>
            <Link   onClick={handleLogout}
              className="inline-block bg-heading px-6 py-3 rounded-lg"
              
              
            >
              Logout
            </Link>
          </li>
          :
          <li>
            <Link  to="/login"  onClick={() => setOpenMenu(false)}
              className="inline-block bg-heading px-6 py-3 rounded-lg"
              
            >
             Login
            </Link>
          </li>
         }
        </ul>
      </div>
    )}

  </div>
</nav>
  )
}

export default Navbar
