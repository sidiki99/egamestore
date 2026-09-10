
import { useParams } from "react-router-dom"
import blogs from "../data/blogs.json"
export default function BlogDetails() {
  const {slug} = useParams();
  const blog = blogs.find((item)=> item.slug === slug)
  return (
    <div>
      <div className="min-h-screen bg-[#15171a] text-white px-4 sm:px-6 py-10">
  <article className="max-w-4xl mx-auto">

    <p className="text-orange-500 text-sm font-semibold text-center mb-3">
     {blog.category}
    </p>
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-center max-w-3xl mx-auto">
    {blog.title}
    </h1>

    {/* Meta */}
    <div className="flex flex-wrap justify-center items-center gap-2 mt-4 text-sm text-gray-400">
      <span>{blog.author}</span>
      <span>•</span>
    <span>{blog.date}</span>
      <span>•</span>
      <span>{blog.readTime}</span>
    </div>

    {/* Featured Image */}
    <div className="mt-8">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-[250px] sm:h-[350px] lg:h-[450px] object-cover rounded-xl"
      />
    </div>

    {/* Article Content */}
    <div className="mt-8">

      <p className="text-gray-300 text-base leading-7 mb-6">
      {blog.shortDescription}
      </p>

      <div className="text-gray-300 text-base leading-7 whitespace-pre-line">
      {blog.content}
      </div>

    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mt-8">
      {blog.tags.map((tag) => (
        <span
          key={tag}
          className="bg-[#24272b] text-gray-300 text-sm px-4 py-2 rounded-full"
        >
          #{tag}
        </span>
      ))}
    </div>

  </article>

</div>
    </div>
  )
}
