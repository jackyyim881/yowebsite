import React, { useState, useEffect, useMemo, useCallback } from "react";
import { importAllImages } from "../utils/importAllImages";
import { FiHeart, FiShoppingCart, FiSearch } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

// --- Category and Image Imports ---
const allCategories = [
  {
    name: "Accessories",
    images: importAllImages(
      require.context("../img/Accessories", false, /\.(png|jpe?g|svg)$/)
    ),
  },
  {
    name: "Bags",
    images: importAllImages(
      require.context("../img/Bags", false, /\.(png|jpe?g|svg)$/)
    ),
  },
  {
    name: "Bottoms",
    images: importAllImages(
      require.context("../img/Bottoms", false, /\.(png|jpe?g|svg)$/)
    ),
  },
  {
    name: "Cropped Jackets",
    images: importAllImages(
      require.context(
        "../img/Outerwear/cropped_jackets",
        false,
        /\.(png|jpe?g|svg)$/
      )
    ),
  },
  {
    name: "Coat",
    images: importAllImages(
      require.context("../img/Outerwear/Coat", false, /\.(png|jpe?g|svg)$/)
    ),
  },
  {
    name: "Sets",
    images: importAllImages(
      require.context("../img/Sets", false, /\.(png|jpe?g|svg)$/)
    ),
  },
  {
    name: "Shoes",
    images: importAllImages(
      require.context("../img/Shoes", false, /\.(png|jpe?g|svg)$/)
    ),
  },
  {
    name: "Top",
    images: importAllImages(
      require.context("../img/top", false, /\.(png|jpe?g|svg)$/)
    ),
  },
];

// --- Dummy filter data ---
const colors = ["Red", "Blue", "Green", "Black"];
const sizes = ["S", "M", "L", "XL"];
const patterns = ["Solid", "Striped", "Checked"];
const textures = ["Cotton", "Wool", "Silk"];
const prices = ["$0-$50", "$51-$100", "$101-$200"];

// --- Pagination ---
const PAGE_SIZE = 20;

const ImageCard = () => {
  const [selected, setSelected] = useState({
    category: allCategories[0].name,
    color: "",
    size: "",
    pattern: "",
    texture: "",
    price: "",
  });
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [favourites, setFavourites] = useState({});
  const [cart, setCart] = useState({});
  const [cartAnimation, setCartAnimation] = useState({});
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // --- Memoized current category ---
  const currentCategory = useMemo(
    () =>
      allCategories.find((cat) => cat.name === selected.category) ||
      allCategories[0],
    [selected.category]
  );

  // --- Memoized filtered images ---
  const filteredImages = useMemo(() => {
    let imgs = currentCategory.images;
    if (search) {
      imgs = imgs.filter((img) =>
        img.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Add more filter logic here if you have metadata
    return imgs;
  }, [currentCategory, search]);

  // --- Only render visible images for performance ---
  const imagesToRender = useMemo(
    () => filteredImages.slice(0, visibleCount),
    [filteredImages, visibleCount]
  );

  // --- Prefetch first few images for perceived performance ---
  useEffect(() => {
    imagesToRender.slice(0, 8).forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [imagesToRender]);

  // --- Add to cart animation ---
  const handleAddToCart = useCallback((catName, idx) => {
    setCart((prev) => ({
      ...prev,
      [`${catName}-${idx}`]: !prev[`${catName}-${idx}`],
    }));
    setCartAnimation((prev) => ({ ...prev, [`${catName}-${idx}`]: true }));
    setTimeout(() => {
      setCartAnimation((prev) => ({ ...prev, [`${catName}-${idx}`]: false }));
    }, 1000);
  }, []);

  // --- UI ---
  return (
    <section className="my-8">
      <div className="container mx-auto text-[#644632] px-4 max-w-7xl">
        {/* Search and Filter */}
        <div className="flex gap-4 mb-8 items-center flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Product"
              className="w-full md:w-80 pl-4 pr-10 py-2 border rounded-full text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <div className="flex gap-4 items-center justify-center">
              <button
                className="bg-[#c9d8b7] text-[#6c5b4c] px-6 py-2 rounded-full font-normal shadow border border-[#c9d8b7] hover:bg-[#b8c7a7] transition"
                onClick={() => setFilterOpen((v) => !v)}
              >
                Filter
              </button>
              <div className="flex items-center gap-2 justify-center">
                {selected.category && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#644632]">
                      {selected.category}
                    </h2>
                  </div>
                )}
              </div>
            </div>
            {filterOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-[#e3efef] rounded-xl shadow-lg p-4 z-10 text-[#6c5b4c] space-y-3">
                {/* Category Dropdown */}
                <div className="relative">
                  <label className="block text-sm mb-1">Product category</label>
                  <div className="relative">
                    <button
                      className="w-full rounded px-2 py-1 text-left border bg-white flex justify-between items-center"
                      onClick={() =>
                        setOpenCategory(openCategory === null ? 0 : null)
                      }
                      type="button"
                    >
                      <span
                        className={
                          selected.category
                            ? "font-medium text-[#644632]"
                            : "text-gray-500"
                        }
                      >
                        {selected.category || "All"}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openCategory !== null && (
                      <div className="absolute left-0 top-full w-full bg-white rounded shadow z-20 max-h-48 overflow-y-auto">
                        <div
                          className="px-4 py-2 hover:bg-[#c9d8b7] cursor-pointer font-medium border-b"
                          onClick={() => {
                            setSelected((s) => ({ ...s, category: "" }));
                            setOpenCategory(null);
                          }}
                        >
                          All
                        </div>
                        {allCategories.map((cat) => (
                          <div
                            key={cat.name}
                            className={`px-4 py-2 hover:bg-[#c9d8b7] cursor-pointer ${
                              selected.category === cat.name
                                ? "bg-[#e3efef] font-medium"
                                : ""
                            }`}
                            onClick={() => {
                              setSelected((s) => ({
                                ...s,
                                category: cat.name,
                              }));
                              setOpenCategory(null);
                            }}
                          >
                            {cat.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Color filter */}
                <div>
                  <label className="block text-sm mb-1">Color</label>
                  <select
                    className="w-full rounded px-2 py-1"
                    value={selected.color}
                    onChange={(e) =>
                      setSelected((s) => ({ ...s, color: e.target.value }))
                    }
                  >
                    <option value="">All</option>
                    {colors.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                {/* Size filter */}
                <div>
                  <label className="block text-sm mb-1">Size</label>
                  <select
                    className="w-full rounded px-2 py-1"
                    value={selected.size}
                    onChange={(e) =>
                      setSelected((s) => ({ ...s, size: e.target.value }))
                    }
                  >
                    <option value="">All</option>
                    {sizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                {/* Pattern filter */}
                <div>
                  <label className="block text-sm mb-1">Pattern</label>
                  <select
                    className="w-full rounded px-2 py-1"
                    value={selected.pattern}
                    onChange={(e) =>
                      setSelected((s) => ({ ...s, pattern: e.target.value }))
                    }
                  >
                    <option value="">All</option>
                    {patterns.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                {/* Texture filter */}
                <div>
                  <label className="block text-sm mb-1">Texture</label>
                  <select
                    className="w-full rounded px-2 py-1"
                    value={selected.texture}
                    onChange={(e) =>
                      setSelected((s) => ({ ...s, texture: e.target.value }))
                    }
                  >
                    <option value="">All</option>
                    {textures.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                {/* Price filter */}
                <div>
                  <label className="block text-sm mb-1">Price</label>
                  <select
                    className="w-full rounded px-2 py-1"
                    value={selected.price}
                    onChange={(e) =>
                      setSelected((s) => ({ ...s, price: e.target.value }))
                    }
                  >
                    <option value="">All</option>
                    {prices.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                {/* Apply/Reset buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    className="bg-[#644632] text-white px-4 py-1 rounded-full text-sm hover:bg-[#523a28] transition flex-1"
                    onClick={() => setFilterOpen(false)}
                  >
                    Apply
                  </button>
                  <button
                    className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm hover:bg-gray-300 transition"
                    onClick={() => {
                      setSelected({
                        category: "",
                        color: "",
                        size: "",
                        pattern: "",
                        texture: "",
                        price: "",
                      });
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {imagesToRender.map((imgSrc, idx) => (
            <div key={idx} className="relative">
              <div className="bg-[#a97b4c] rounded-lg relative overflow-hidden h-48 mb-2">
                <Link
                  to={`/product/${encodeURIComponent(imgSrc)}`}
                  className="block w-full h-full"
                >
                  <LazyLoadImage
                    src={imgSrc}
                    alt={`Product ${idx + 1}`}
                    effect="blur"
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    wrapperClassName="w-full h-full"
                    threshold={100}
                    placeholderSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <button
                  className="absolute top-2 right-2 text-white z-10"
                  onClick={() =>
                    setFavourites((f) => ({
                      ...f,
                      [`${currentCategory.name}-${idx}`]:
                        !f[`${currentCategory.name}-${idx}`],
                    }))
                  }
                >
                  <FiHeart
                    className={`text-2xl ${
                      favourites[`${currentCategory.name}-${idx}`]
                        ? "text-red-500"
                        : ""
                    }`}
                  />
                </button>
                <button
                  className="absolute bottom-2 left-2 bg-white/80 text-[#644632] p-2 rounded-full text-xl font-medium shadow hover:bg-white transition flex items-center justify-center z-5"
                  onClick={() => handleAddToCart(currentCategory.name, idx)}
                  aria-label="Add to cart"
                >
                  <FiShoppingCart
                    className={
                      cart[`${currentCategory.name}-${idx}`]
                        ? "text-green-600"
                        : ""
                    }
                  />
                </button>
                {/* Cart animation overlay */}
                {cartAnimation[`${currentCategory.name}-${idx}`] && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg animate-pulse z-20">
                    <div className="bg-white p-3 rounded-full shadow-lg animate-bounce">
                      <FiShoppingCart className="text-3xl text-green-600" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredImages.length && (
          <div className="flex justify-center">
            <button
              className="bg-[#c9d8b7] text-[#644632] px-6 py-2 rounded-full font-normal shadow border hover:bg-[#b8c7a7] transition"
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
            >
              Load More
            </button>
          </div>
        )}

        {/* Pagination dots (static for demo) */}
        <div className="flex justify-center mt-8 gap-2">
          <div className="h-3 w-3 rounded-full bg-[#c9d8b7]"></div>
          <div className="h-3 w-3 rounded-full bg-gray-200"></div>
          <div className="h-3 w-3 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </section>
  );
};

export default ImageCard;
