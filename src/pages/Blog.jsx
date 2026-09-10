
import { useNavigate } from "react-router-dom";
import blogs from "../data/blogs.json"

const Blog = () => {
  const navigate = useNavigate();
  const featuredBlog = blogs[0];

  return (
    <section className="px-5 py-8 md:px-20">
       
     <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-heading text-center leading-tight">
      Blogs
    </h1>
      {/* Featured Blog */}
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

        {blogs.map((blog) => (
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

    </section>
  );
};

export default Blog;
