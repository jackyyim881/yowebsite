import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogSection({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <section className="my-10 text-[#644632] max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl  font-semibold">Latest Blog Posts</h2>
        <Link
          to="/blog"
          className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {posts.map((p) => (
          <div
            key={p.id}
            className="min-w-[280px] text-center bg-white rounded-md shadow hover:shadow-lg transition-shadow duration-200 snap-start shrink-0"
          >
            <Link to={`/blog/${p.id}`} className="block">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
            </Link>
            <div className="p-4 space-y-1">
              <Link
                to={`/blog/category/${p.category}`}
                className="text-xs uppercase text-[#644632] font-medium"
              >
                {p.category}
              </Link>
              <h3 className="text-sm font-semibold leading-snug line-clamp-2 min-h-[38px]">
                <Link to={`/blogs/${p.id}`} className="hover:text-pink-600">
                  {p.title}
                </Link>
              </h3>
              <p className="text-xs text-[#644632]">
                By <cite className="not-italic font-medium">{p.author}</cite> •{" "}
                {p.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
