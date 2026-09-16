


import { useNavigate } from "react-router-dom";
import blogs from "../data/blogs.json"
import news from "../data/news.json"
import { useState } from "react";
import { toast } from "react-toastify";

const Blog = () => {
  const [activeTab, setActiveTab] = useState("Blogs");
  const[loadedData,setLoadedData]= useState(
    blogs.slice(0,4),
  );
  const[loadedNews,setLoadedNews]= useState(
    news.slice(0,4),
  );
  const tabs = ["Blogs", "News"];
  const navigate = useNavigate();
  const featuredBlog = blogs[0];
   const featuredNews = news[0];

   const loadMore=()=>{
     if(loadedData.length >= blogs.length){
      toast.warning("No More Articles Available")
      return
    }
    setLoadedData((prev) => blogs.slice(0, prev.length + 4));
     
   

   }
   const loadMoreNews=()=>{
     if(loadedNews.length >= news.length){
      toast.warning("No More Articles Available")
      return
    }
    setLoadedNews((prev) => news.slice(0, prev.length + 4));
     
   

   }


  return (
    <section className="px-5 py-8 md:px-20">
      <div className="flex  flex-wrap items-center  gap-5 mb-5 justify-center w-full">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-6 py-2  w-50 md:px-7  rounded-xl  border-2 cursor-pointer border-heading ${
          activeTab === tab
            ? "font-semibold  bg-heading "
            : "text-gray-200 hover:text-white"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
       
   
      {/* Featured Blog */}
       {activeTab === "Blogs" &&
      <div>
        <div className="relative min-h-[650px] rounded-3xl overflow-hidden">
        <img
          src={featuredBlog.image}
          alt={featuredBlog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/65"></div>
        <div className="relative z-10 flex items-center min-h-[650px] px-6 md:px-12 py-12">
        <div className="max-w-2xl">

          <p className="text-orange-500 font-semibold text-sm md:text-base mb-4">
          {featuredBlog.category}
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {featuredBlog.title}
          </h1>
          <p className="text-gray-200 text-base md:text-lg mt-5 leading-7 max-w-xl">
          {featuredBlog.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5 text-gray-300 text-sm">
            <span>{featuredBlog.author}</span>
            <span>•</span>
            <span>{featuredBlog.date}</span>
            <span>•</span>
            <span>{featuredBlog.readTime}</span>
          </div>

            <button
              onClick={() => navigate(`/blog/${featuredBlog.slug}`)}
              className="mt-7 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition"
            >
              Read More
            </button>

          </div>
        </div>
      </div>

      {/* AllBlogs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {loadedData.map((blog) => (
          <div
            key={blog.id}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

          <div className="absolute inset-0 bg-black/65"></div>
          <div className="relative z-10 h-full flex flex-col justify-end p-6">

            <p className="text-orange-500 font-semibold text-sm">
              {blog.category}
            </p>
            <h2 className="text-white text-2xl md:text-3xl font-bold mt-2">
              {blog.title}
            </h2>
            <p className="text-gray-300 mt-3">
              {blog.shortDescription}
            </p>

            <button
              onClick={() => navigate(`/blog/${blog.slug}`)}
              className="mt-5 w-fit bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full"
            >
              Read More
            </button>

          </div>
          </div>
        ))}
      </div>
     <div className=" items-center flex  justify-center">
       <button className="  px-6 py-2  w-50 md:px-7  rounded-xl  border-2 cursor-pointer border-heading mt-3 "
      onClick={loadMore}>
        Load More
      </button>
     </div>
      
      </div>}

      {activeTab === "News" && (
  <div>

    {/* Featured News */}
    <div className="relative min-h-[650px] rounded-3xl overflow-hidden">

      <img
        src={featuredNews.image}
        alt={featuredNews.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 flex items-center min-h-[650px] px-6 md:px-12 py-12">

        <div className="max-w-2xl">

          <p className="text-orange-500 font-semibold text-sm md:text-base mb-4">
            {featuredNews.category}
          </p>

          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {featuredNews.title}
          </h1>

          <p className="text-gray-200 text-base md:text-lg mt-5 leading-7 max-w-xl">
            {featuredNews.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5 text-gray-300 text-sm">
            <span>{featuredNews.author}</span>
            <span>•</span>
            <span>{featuredNews.date}</span>
            <span>•</span>
            <span>{featuredNews.readTime}</span>
          </div>

          <button
            onClick={() => navigate(`/blog/${featuredNews.slug}`)}
            className="mt-7 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition"
          >
            Read More
          </button>

        </div>

      </div>
    </div>

    {/* News Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

      {news.map((blog) => (
        <div
          key={blog.id}
          className="bg-[#15171B] rounded-2xl overflow-hidden border border-[#25282D] shadow-lg"
        >

          {/* Image */}
          <div className="relative h-[250px] overflow-hidden">

            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />

            {/* Category Badge */}
            <div className="absolute top-4 left-4 bg-[#536274] text-white px-4 py-2 rounded-xl text-sm font-medium">
              {blog.category}
            </div>

          </div>

          {/* Card Content */}
          <div className="p-6">

            <h2
              className="text-white text-2xl font-bold leading-[1.25] line-clamp-3 cursor-pointer hover:text-orange-500 transition"
              onClick={() => navigate(`/blog/${blog.slug}`)}
            >
              {blog.title}
            </h2>

            <p className="text-[#92959B] text-base leading-7 mt-4 line-clamp-3">
              {blog.shortDescription}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-7">

              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                <img
                  src={blog.authorImage || "/default-avatar.png"}
                  alt={blog.author}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="text-white text-base font-medium">
                  {blog.author}
                </p>

                <p className="text-[#92959B] text-sm mt-1">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

            </div>

          </div>

        </div>
      ))}

    </div>

    {/* Load More */}
    <div className="flex items-center justify-center mt-6">
      <button
        className="px-6 py-2 w-50 md:px-7 rounded-xl border-2 cursor-pointer border-heading hover:bg-heading hover:text-white transition"
        onClick={loadMoreNews}
      >
        Load More
      </button>
    </div>

  </div>
)}


    </section>
  );
};

export default Blog;
