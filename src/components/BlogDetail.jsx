import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Share2, Calendar, User, Clock, ChevronLeft, Bookmark, MessageSquare } from "lucide-react";

const BlogDetail = ({ blogs }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const foundBlog = blogs.find((b) => b.id.toString() === id);
    if (foundBlog) {
      setBlog(foundBlog);
      // Find related posts based on categories or tags
      const related = blogs
        .filter(b => b.id !== foundBlog.id &&
          (b.category === foundBlog.category ||
            (b.tags && foundBlog.tags && b.tags.some(tag => foundBlog.tags.includes(tag)))))
        .slice(0, 3);
      setRelatedPosts(related);
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

  const toggleBookmark = () => {
    setIsBookmarked((b) => !b);
  };

  const formatReadTime = (content) => {
    // Estimate reading time based on content length
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-3xl flex justify-center">
        <div className="animate-pulse w-full">
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-3xl text-center">
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">{error || "Blog Not Found"}</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for may have been removed or is temporarily unavailable.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
            <ChevronLeft className="w-4 h-4" />
            Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-gray-700">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium truncate">{blog.title}</span>
        </nav>

        {/* Blog Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          {blog.img && (
            <div className="relative h-96">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="inline-block px-3 py-1 bg-pink-500 text-white text-xs font-medium rounded-full mb-3">
                  {blog.category || "General"}
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatReadTime(blog.content)}</span>
              </div>
            </div>

            {blog.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Blog Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="prose prose-lg max-w-none">
            {blog.content}
          </div>
        </div>

        {/* Blog Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={toggleLike}
                className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50 transition"
              >
                <Heart
                  className={`w-5 h-5 ${isLiked ? "text-red-500 fill-current" : "text-gray-500"
                    }`}
                />
                <span>{isLiked ? "Liked" : "Like"}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50 transition"
              >
                <Share2 className="w-5 h-5 text-gray-500" />
                <span>Share</span>
              </button>
              <button
                onClick={toggleBookmark}
                className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50 transition"
              >
                <Bookmark
                  className={`w-5 h-5 ${isBookmarked ? "text-blue-500 fill-current" : "text-gray-500"
                    }`}
                />
                <span>{isBookmarked ? "Saved" : "Save"}</span>
              </button>
            </div>

            <Link to="/blog" className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600">
              <ChevronLeft className="w-4 h-4" />
              <span>All posts</span>
            </Link>
          </div>
        </div>

        {/* Author Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
              {blog.authorImg ? (
                <img src={blog.authorImg} alt={blog.author} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-pink-100 text-pink-500 text-xl font-bold">
                  {blog.author?.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold">{blog.author}</h3>
              {blog.authorBio && <p className="text-gray-600 mt-1">{blog.authorBio}</p>}
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group">
                  <div className="h-40 rounded-lg overflow-hidden mb-3 bg-gray-200">
                    {post.img && (
                      <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    )}
                  </div>
                  <h4 className="font-medium text-gray-900 group-hover:text-pink-500 transition line-clamp-2">{post.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comment Section Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5" />
            <h3 className="text-xl font-bold">Comments</h3>
          </div>

          <div className="border-t pt-6">
            <p className="text-gray-500 text-center py-8">Comments are coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;