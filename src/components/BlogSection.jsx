import React from "react";
import { ArrowRight } from "lucide-react";

/**
 * Horizontal scrollable blog carousel.
 * Props:
 *   posts: [{
 *     id, img, category, title, author, date
 *   }]
 */
export default function BlogSection({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <section className="my-10 max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Latest Blog Posts</h2>
        <button className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600">
          View all <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {posts.map((p) => (
          <div
            key={p.id}
            className="min-w-[280px] bg-white rounded-md shadow hover:shadow-lg transition-shadow duration-200 snap-start shrink-0"
          >
            <a href="#" className="block">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
            </a>
            <div className="p-4 space-y-1">
              <a
                href="#"
                className="text-xs uppercase text-pink-500 font-medium"
              >
                {p.category}
              </a>
              <h3 className="text-sm font-semibold leading-snug line-clamp-2 min-h-[38px]">
                <a href="#" className="hover:text-pink-600">
                  {p.title}
                </a>
              </h3>
              <p className="text-xs text-gray-500">
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
