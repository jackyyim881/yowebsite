import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";

const BlogDetail = ({ blogs }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const foundBlog = blogs.find((b) => b.id.toString() === id);
    if (foundBlog) {
      setBlog(foundBlog);
      setLoading(false);
    } else {
      setError("Blog not found");
      setLoading(false);
    }
  }, [id, blogs]);

  const handleShare = () => {
    const url = window.location.href;
    const text = `Check out this blog: ${blog.title}\n${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  const toggleLike = () => {
    setIsLiked((l) => !l);
  };

  if (loading) return <div className="text-center py-20">Loading blog...</div>;
  if (error)
    return (
      <div className="text-center py-20">
        <p>Error: {error}</p>
        <Link to="/blogs" className="text-pink-500 hover:underline">
          Back to blogs
        </Link>
      </div>
    );
  if (!blog)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Blog Not Found</h2>
        <Link to="/blogs" className="text-pink-500 hover:underline">
          Browse all blogs
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {blog.img && (
        <div className="mb-6">
          <img
            src={blog.img}
            alt={blog.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
      <h1 className="text-3xl font-semibold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-600 mb-6">
        By {blog.author} on {new Date(blog.publishedAt).toLocaleDateString()}
      </p>
      <div className="prose prose-lg mb-8">{blog.content}</div>

      <div className="flex gap-4">
        <button
          onClick={toggleLike}
          className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-100 transition"
        >
          <Heart
            className={`w-5 h-5 ${
              isLiked ? "text-red-500 fill-current" : "text-gray-500"
            }`}
          />
          {isLiked ? "Liked" : "Like"}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-100 transition"
        >
          <Share2 className="w-5 h-5 text-gray-500" />
          Share
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;
