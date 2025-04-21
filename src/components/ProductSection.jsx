import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Filter, ChevronDown } from "lucide-react";

const ProductSection = ({ title, products = [] }) => {
  const [displayProducts, setDisplayProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Handle filtering and sorting
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    setFilteredProducts(result);

    // Apply sorting
    result = [...result];
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        // Assuming newer items have higher IDs
        result.sort((a, b) => b.id - a.id);
        break;
    }

    setDisplayProducts(result);
  }, [products, activeCategory, sortBy]);

  return (
    <section className="my-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold mb-4 md:mb-0">{title}</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Mobile filter toggle */}
            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-full"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-4 h-4" />
              Filter
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                className="appearance-none pl-4 pr-10 py-2 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter section */}
        <div
          className={`md:flex ${
            isFilterOpen ? "block" : "hidden md:block"
          } mb-6`}
        >
          <div className="flex overflow-x-auto py-2 gap-2 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors
                  ${
                    activeCategory === category
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayProducts.slice(0, visibleCount).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Load more */}
        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-2 border-2 border-pink-500 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-colors"
              onClick={() => setVisibleCount((prev) => prev + 8)}
            >
              Load More
            </button>
          </div>
        )}

        {/* No results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No products found matching your criteria.
            </p>
          </div>
        )}

        {/* Product count */}
        <div className="mt-6 text-sm text-gray-500">
          Showing {Math.min(visibleCount, filteredProducts.length)} of{" "}
          {filteredProducts.length} products
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
