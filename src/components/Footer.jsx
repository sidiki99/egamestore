
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.avif";
export default function Footer() {
  const navigate=useNavigate();
  return (
   <footer className="mt-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 bg-[#15141B] border-t-2 border-[#888888]">
  <div className="  text-[#888888] rounded-lg p-6 sm:p-8 md:p-10 lg:p-12">
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="w-full lg:w-2/5">
        <img
          alt="Logo"
          className="w-40 sm:w-48 md:w-52"
          src={logo}
        />
        <p className="mt-5 leading-7 text-sm md:text-base">
          Step into the future of gaming with eGame Store. Explore top-tier
          reviews, news, and in-depth analysis on the latest and greatest games.
          Join the gaming community now to get exclusive content and features.
        </p>
        <div className="flex gap-5 text-2xl mt-6">
          <i className="fa fa-facebook hover:text-white cursor-pointer" />
          <i className="fa fa-instagram hover:text-white cursor-pointer" />
          <i className="fa fa-linkedin hover:text-white cursor-pointer" />
          <i className="fa fa-youtube hover:text-white cursor-pointer" />
        </div>
      </div>
      <div className="w-full lg:w-3/5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-heading font-semibold text-xl mb-5">
              Quick Links
            </h2>
            <div className="flex flex-col gap-3">
              <a className="hover:text-white cursor-pointer" onClick={()=>navigate("/")}>
                Home
              </a>
              <a className="hover:text-white cursor-pointer" href="#">
                Gift Cards
              </a>
              <a className="hover:text-white cursor-pointer" onClick={()=>navigate("/deals")}>
                Deals
              </a>
              <a className="hover:text-white cursor-pointer" onClick={()=>navigate("/blog")}>
                Blog
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-heading font-semibold text-xl mb-5">
              Resources
            </h2>
            <div className="flex flex-col gap-3">
              <a className="hover:text-white cursor-pointer" onClick={()=>navigate("/")}>
                Trending Games
              </a>
              <a className="hover:text-white cursor-pointer" onClick={()=>navigate("/")}>
                Upcoming Games
              </a>
              <a className="hover:text-white cursor-pointer" onClick={()=>navigate("/")}>
                Reviews
              </a>
              <a className="hover:text-white cursor-pointer" href="#">
                FAQs
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-heading font-semibold text-xl mb-5">Explore</h2>
            <div className="flex flex-col gap-3">
              <a className="hover:text-white cursor-pointer" href="#">
                PC Games
              </a>
              <a className="hover:text-white cursor-pointer" href="#">
                PlayStation
              </a>
              <a className="hover:text-white cursor-pointer" href="#">
                Nintendo
              </a>
              <a className="hover:text-white cursor-pointer" href="#">
                Xbox
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-heading font-semibold text-xl mb-5">Contact</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <i className="fa fa-map-marker" />
                <a className="hover:text-white" href="#">
                  00-000000-0
                </a>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa fa-phone" />
                <a className="hover:text-white" href="#">
                  0-000000-0
                </a>
              </div>
              <div className="flex items-center gap-3">
                <i className="fa fa-envelope" />
                <a
                  className="hover:text-white break-all"
                  href="mailto:game@gmail.com">
                  game@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-10 pt-6">
      <p className="text-center text-sm md:text-base">
        © 2026 EGameStore.com — All Rights Reserved.
      </p>
    </div>
  </div>
</footer>
  )
}
