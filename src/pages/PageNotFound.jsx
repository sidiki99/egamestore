import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-[#101722] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('../src/assets/images/pageNotFound.png')",
      }}
    >
      
      <div className="absolute inset-0 bg-[#101722]/75"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="flex max-w-xl flex-col items-center text-center">
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