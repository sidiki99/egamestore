
import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import games from "../data/games.json";

import logo from "../assets/images/logo.avif";
import menuIcon from "../assets/images/menu icon.png";

import Swal from "sweetalert2";
import {
  FaAngleDown,
  FaLockOpen,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import { FaLocationDot, FaNoteSticky } from "react-icons/fa6";
import { useSelector } from "react-redux";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const [showSettings, setShowSettings] = useState(false);

  const desktopSettingsRef = useRef(null);
  const settingsRef = useRef(null);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [profilePic, setProfilePic] = useState();

  const [country, setCountry] = useState("");

  const cart = useSelector((store) => store.cartStore.cart);
  const cartTotal = cart.reduce((total, item) => total + item.qty, 0);

  // =========================
  // SEARCH
  // =========================
  useEffect(() => {
    const searchGames = () => {
      if (!search.trim()) {
        setResults([]);
        setShowResults(false);
        return;
      }

      try {
        const storedGames = JSON.parse(
          localStorage.getItem("games") || "[]"
        );

        const jsonGames = games;

        const allGames = [...storedGames, ...jsonGames];

        const uniqueGames = Array.from(
          new Map(allGames.map((game) => [game.id, game])).values()
        );

        const searchText = search.toLowerCase().trim();

        const filteredGames = uniqueGames
          .filter((game) => {
            const title = (game.title || "").toLowerCase();
            const category = (game.category || "").toLowerCase();

            return (
              title.includes(searchText) ||
              category.includes(searchText)
            );
          })
          .slice(0, 8);

        setResults(filteredGames);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
        setShowResults(false);
      }
    };

    searchGames();
  }, [search]);

  // =========================
  // CLICK SEARCH RESULT
  // =========================
  const handleGameClick = (game) => {
    setSearch("");
    setResults([]);
    setShowResults(false);
    setOpenMenu(false);

    navigate(`/game/${game.id}`);
  };

  // =========================
  // CLOSE SETTINGS
  // =========================
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedDesktop =
        desktopSettingsRef.current?.contains(event.target);

      const clickedMobile =
        settingsRef.current?.contains(event.target);

      if (!clickedDesktop && !clickedMobile) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================
  // PROFILE
  // =========================
  useEffect(() => {
    const loadProfile = () => {
      const profiles = JSON.parse(
        localStorage.getItem("Profile") || "[]"
      );

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

  // =========================
  // COUNTRY
  // =========================
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

  // =========================
  // NAV ITEMS
  // =========================
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

  // =========================
  // LOGOUT
  // =========================
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
        setOpenMenu(false);
        setShowSettings(false);
        navigate("/login");
      }
    });
  };

  // =========================
  // SEARCH RESULTS
  // =========================
  const SearchResults = () => {
    if (!showResults || !search.trim()) {
      return null;
    }

    return (
      <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[100] overflow-hidden rounded-xl border border-[#303747] bg-[#151A27] shadow-2xl">
        {results.length > 0 ? (
          <div className="max-h-[400px] overflow-y-auto">
            {results.map((game) => (
              <div
                key={game.id}
                onClick={() => handleGameClick(game)}
                className="flex cursor-pointer items-center gap-3 border-b border-[#252B3A] px-3 py-3 transition hover:bg-[#202636]"
              >
                <img
                  src={game.image}
                  alt={game.title}
                  className="h-10 w-10 shrink-0 rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {game.title}
                  </p>

                  {game.category && (
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {game.category}
                    </p>
                  )}
                </div>

                <span className="shrink-0 text-gray-500">
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
    );
  };

  // =========================
  // SEARCH BOX
  // =========================
  const SearchBox = ({ mobile = false }) => {
    return (
      <div
        className={
          mobile
            ? "relative w-full"
            : "relative w-full max-w-xl"
        }
      >
        <FaSearch
          className={
            mobile
              ? "absolute left-3 top-1/2 -translate-y-1/2 text-heading"
              : "absolute left-4 top-1/2 -translate-y-1/2 text-heading"
          }
          size={mobile ? 14 : 15}
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
          className={
            mobile
              ? "w-full rounded-xl border border-[#303747] py-2.5 pl-9 pr-9 text-sm text-white outline-none placeholder:text-gray-500 focus:border-heading"
              : "w-full rounded-xl border border-[#303747] py-3 pl-11 pr-10 text-sm text-white outline-none placeholder:text-gray-500 focus:border-heading"
          }
        />

        {search && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setResults([]);
              setShowResults(false);
            }}
            className={
              mobile
                ? "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                : "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            }
          >
            <FaTimes size={mobile ? 13 : 14} />
          </button>
        )}

        <SearchResults />
      </div>
    );
  };

  return (
    <nav className="mt-8 w-full overflow-x-clip bg-header">
      <div className="mx-auto w-full max-w-[1400px] px-3 sm:px-4">

        {/* =========================
            MAIN NAVBAR ROW
        ========================= */}
        <div className="flex min-h-[64px] w-full items-center justify-between gap-2">

          {/* LOGO */}
          <div className="shrink-0">
            <Link to="/">
              <img
                src={logo}
                alt="Gaming Store"
                className="h-9 w-auto sm:h-10 lg:h-12"
              />
            </Link>
          </div>

          {/* =========================
              DESKTOP MENU
          ========================= */}
          <div className="hidden min-w-0 flex-1 justify-center md:flex">
            <ul className="flex items-center gap-4 lg:gap-6 xl:gap-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `whitespace-nowrap border-b-2 py-2 transition-all duration-300 ${
                        isActive
                          ? "border-heading text-heading"
                          : "border-transparent hover:border-heading hover:text-heading"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================
              DESKTOP RIGHT SECTION
          ========================= */}
          <div className="hidden shrink-0 items-center gap-4 md:flex lg:gap-5">

            {/* DESKTOP SEARCH */}
            {currentUser?.role !== "admin" && (
              <div className="w-[180px] lg:w-[220px] xl:w-[280px] 2xl:w-[320px]">
                <SearchBox />
              </div>
            )}

            {/* LOCATION */}
            <div className="flex shrink-0 cursor-pointer items-center gap-1">
              <FaLocationDot className="text-2xl" />

              <span className="flex h-5 min-w-5 items-center justify-center px-1 text-xs text-white">
                {country}
              </span>
            </div>

            {/* LANGUAGE */}
            <div className="group relative w-15 shrink-0">
              <button className="flex w-full items-center gap-1 px-3 py-2 text-left text-white hover:text-heading">
                EN <FaAngleDown />
              </button>

              <div className="absolute left-0 top-full z-50 hidden w-full bg-input text-white group-hover:block">
                <div className="cursor-pointer px-3 py-2 hover:bg-heading">
                  UR
                </div>

                <div className="cursor-pointer px-3 py-2 hover:bg-heading">
                  AR
                </div>

                <div className="cursor-pointer px-3 py-2 hover:bg-heading">
                  ZN
                </div>
              </div>
            </div>

            {/* CART */}
            <div
              className="relative shrink-0 cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart className="text-2xl" />

              {cartTotal > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-heading px-1 text-xs font-bold text-white">
                  {cartTotal > 99 ? "99+" : cartTotal}
                </span>
              )}
            </div>

            {/* DESKTOP PROFILE / LOGIN */}
            {currentUser ? (
              <div
                className="relative shrink-0"
                ref={desktopSettingsRef}
              >
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-300 transition-all hover:bg-[#262930] hover:text-orange-500"
                >
                  <img
                    src={
                      profilePic ||
                      "/images/games/customer2 (2).jpg"
                    }
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
                </button>

                {showSettings && (
                  <div className="absolute right-0 top-full z-[200] mt-2 w-32 rounded-xl border border-heading bg-[#262930] p-1 text-white shadow-xl">

                    <Link
                      to="/profile"
                      onClick={() => setShowSettings(false)}
                      className="flex items-center gap-2 rounded-lg p-2 text-sm font-semibold hover:text-heading"
                    >
                      <FaUser className="text-xs" />
                      Profile
                    </Link>

                    {currentUser.role === "user" && (
                      <Link
                        to="/orders"
                        onClick={() => setShowSettings(false)}
                        className="flex items-center gap-2 rounded-lg p-2 text-sm font-semibold hover:text-heading"
                      >
                        <FaNoteSticky className="text-xs" />
                        Orders
                      </Link>
                    )}

                    <Link
                      to="/wallet"
                      onClick={() => setShowSettings(false)}
                      className="flex items-center gap-2 rounded-lg p-2 text-sm font-semibold hover:text-heading"
                    >
                      <FaWallet className="text-xs" />
                      Wallet
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg p-2 text-sm font-semibold hover:text-heading"
                    >
                      <FaLockOpen className="text-xs" />
                      Logout
                    </button>

                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="shrink-0 rounded-lg bg-heading px-4 py-3 transition hover:bg-orange-600"
              >
                Login
              </Link>
            )}
          </div>

          {/* =========================
              MOBILE RIGHT SECTION
          ========================= */}
          <div className="ml-auto flex shrink-0 items-center gap-3 md:hidden">

            {/* MOBILE CART */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart className="text-xl sm:text-2xl" />

              {cartTotal > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-heading px-1 text-[10px] font-bold text-white">
                  {cartTotal > 99 ? "99+" : cartTotal}
                </span>
              )}
            </div>

            {/* MOBILE PROFILE */}
            {currentUser && (
              <div
                className="relative"
                ref={settingsRef}
              >
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                >
                  <img
                    src={
                      profilePic ||
                      "/images/games/customer2 (2).jpg"
                    }
                    alt="Profile"
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                </button>

                {showSettings && (
                  <div className="absolute right-0 top-full z-[200] mt-2 w-32 rounded-xl border border-heading bg-[#262930] p-1 text-white shadow-xl">

                    <Link
                      to="/profile"
                      onClick={() => setShowSettings(false)}
                      className="flex items-center gap-2 rounded-lg p-2 text-sm font-semibold hover:text-heading"
                    >
                      <FaUser className="text-xs" />
                      Profile
                    </Link>

                    {currentUser.role === "user" && (
                      <Link
                        to="/orders"
                        onClick={() => setShowSettings(false)}
                        className="flex items-center gap-2 rounded-lg p-2 text-sm font-semibold hover:text-heading"
                      >
                        <FaNoteSticky className="text-xs" />
                        Orders
                      </Link>
                    )}

                    <Link
                      to="/wallet"
                      onClick={() => setShowSettings(false)}
                      className="flex items-center gap-2 rounded-lg p-2 text-sm font-semibold hover:text-heading"
                    >
                      <FaWallet className="text-xs" />
                      Wallet
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg p-2 text-sm font-semibold hover:text-heading"
                    >
                      <FaLockOpen className="text-xs" />
                      Logout
                    </button>

                  </div>
                )}
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => {
                setOpenMenu(!openMenu);
                setShowSettings(false);
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center"
            >
              {openMenu ? (
                <FaTimes className="text-xl" />
              ) : (
                <img
                  src={menuIcon}
                  alt="Menu"
                  className="h-8 w-8 object-contain"
                />
              )}
            </button>

            {/* MOBILE LOGIN */}
            {!currentUser && (
              <Link
                to="/login"
                className="rounded-lg bg-heading px-3 py-2 text-sm transition hover:bg-orange-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* =========================
            MOBILE SEARCH
        ========================= */}
        {currentUser?.role === "user" && (
          <div className="relative mt-2 w-full pb-3 md:hidden">
            <SearchBox mobile={true} />
          </div>
        )}

        {/* =========================
            MOBILE MENU
        ========================= */}
        {openMenu && (
          <div className="w-full border-t border-white/5 bg-black/20 py-3 md:hidden">

            <ul className="flex w-full flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.name} className="w-full">
                  <NavLink
                    to={item.path}
                    onClick={() => setOpenMenu(false)}
                    className={({ isActive }) =>
                      `block w-full rounded-lg px-4 py-2.5 text-sm transition ${
                        isActive
                          ? "bg-heading text-white"
                          : "hover:bg-heading/20 hover:text-heading"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

