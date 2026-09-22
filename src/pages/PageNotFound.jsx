import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/games/404bg.jfif")',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#101722]/40"></div>

      {/* Content */}
      <div className="relative z-10 flex  flex-col items-center justify-center px-4 pt-0">

        {/* Character */}
        <img
          src="/images/games/404man.png"
          alt="404 Character"
          className="w-64 object-contain sm:w-72 md:w-100 lg:w-380 -mt-80"
        />

        {/* Text */}
        <div className="-mt-150 flex max-w-xl flex-col items-center text-center mb-40">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Page Not Found
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-gray-300 sm:text-base">
            The page you're looking for doesn't exist. It might have
            been moved, deleted. Let's redeploy you to a safe zone.
          </p>

          <Link
            to="/"
            className="mt-5 rounded-full bg-orange-500 px-10 py-3 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;