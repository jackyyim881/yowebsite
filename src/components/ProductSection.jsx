import React, { useState } from "react";
import { FiHeart, FiSearch, FiShoppingCart } from "react-icons/fi";

const categories = [
  {
    name: "Top",
    sub: ["T-shirt", "polo-shirt", "short", "jacket"],
  },
  { name: "Dress" },
  { name: "shirt" },
  { name: "jacket" },
  { name: "bag" },
  { name: "shose" },
  { name: "jellew" },
];
const colors = ["Blue", "Red", "Green", "Yellow", "White", "Black"];
const sizes = ["XS", "S", "M", "L", "XL"];
const patterns = ["Plain", "Stripe", "Dot", "Print"];
const textures = ["Cotton", "Denim", "Wool", "Silk"];
const prices = ["$0-$100", "$100-$300", "$300-$500", "$500+"];

const ProductSection = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState({
    category: "",
    color: "",
    size: "",
    pattern: "",
    texture: "",
    price: "",
  });
  const [cartPopup, setCartPopup] = useState(Array(8).fill(false));
  const [openCategory, setOpenCategory] = useState(null);

  // Sample product data to match the image
  const products = [
    { id: 1, name: "White Shoes", price: "HK$ 200", isFavorite: false },
    { id: 2, name: "White Shoes", price: "HK$ 200", isFavorite: false },
    { id: 3, name: "White Shoes", price: "HK$ 200", isFavorite: false },
    { id: 4, name: "", price: "", isFavorite: false },
    { id: 5, name: "", price: "", isFavorite: false },
    { id: 6, name: "White Shoes", price: "", isFavorite: false },
    { id: 7, name: "White Shoes", price: "", isFavorite: false },
    { id: 8, name: "White Shoes", price: "", isFavorite: false },
  ];

  const handleAddToCart = (idx) => {
    const newPopup = [...cartPopup];
    newPopup[idx] = true;
    setCartPopup(newPopup);
    setTimeout(() => {
      newPopup[idx] = false;
      setCartPopup([...newPopup]);
    }, 1200);
  };

  // Tag collection
  const tags = ["Dress", "jellew", "bag", "shose"];

  return (
    <section className="my-8">
      <div className="container mx-auto text-[#644632] px-4 max-w-7xl">
        {/* Tag list */}
        <div className="flex gap-6 mb-6 items-center">
          <div className="flex gap-6 mb-6 items-center">
            {tags.map((tag) => (
              <span key={tag} className="text-2xl italic font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Product"
                className="w-full md:w-80 pl-4 pr-10 py-2 border rounded-full text-sm"
              />
              <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filter section */}
        <div className="flex gap-4 mb-8 items-center flex-wrap">
          {/* Filter button */}
          <div className="relative">
            <button
              className="bg-[#c9d8b7] text-[#6c5b4c] px-6 py-2 rounded-full font-normal shadow border border-[#c9d8b7] hover:bg-[#b8c7a7] transition"
              onClick={() => setFilterOpen((v) => !v)}
            >
              Filter
            </button>
            {filterOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-[#e3efef] rounded-xl shadow-lg p-4 z-10 text-[#6c5b4c] space-y-3">
                {/* Product category multi-level dropdown */}
                <div className="relative">
                  <label className="block text-sm mb-1">Product category</label>
                  <div className="relative">
                    <button
                      className="w-full rounded px-2 py-1 text-left border bg-white"
                      onClick={() => setOpenCategory(openCategory === null ? 0 : null)}
                      type="button"
                    >
                      {selected.category || "All"}
                    </button>
                    {openCategory !== null && (
                      <div className="absolute left-0 top-full w-full bg-white rounded shadow z-20">
                        {categories.map((cat, idx) => (
                          <div key={cat.name} className="relative">
                            <div
                              className="px-4 py-2 hover:bg-[#c9d8b7] cursor-pointer flex justify-between items-center"
                              onClick={() => {
                                if (cat.sub) {
                                  setOpenCategory(openCategory === idx ? null : idx);
                                } else {
                                  setSelected((s) => ({
                                    ...s,
                                    category: cat.name,
                                  }));
                                  setOpenCategory(null);
                                  setFilterOpen(false);
                                }
                              }}
                            >
                              {cat.name}
                              {cat.sub && (
                                <span className="ml-2">&#8250;</span>
                              )}
                            </div>
                            {/* Subcategory dropdown */}
                            {cat.sub && openCategory === idx && (
                              <div className="absolute left-full top-0 w-40 bg-white rounded shadow z-30">
                                {cat.sub.map((sub) => (
                                  <div
                                    key={sub}
                                    className="px-4 py-2 hover:bg-[#c9d8b7] cursor-pointer"
                                    onClick={() => {
                                      setSelected((s) => ({
                                        ...s,
                                        category: sub,
                                      }));
                                      setOpenCategory(null);
                                      setFilterOpen(false);
                                    }}
                                  >
                                    {sub}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Other filters */}
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
              </div>
            )}
          </div>

          {/* Selected filters */}
          <div className="flex gap-2 flex-wrap">
            {Object.entries(selected)
              .filter(([k, v]) => v)
              .map(([k, v]) => (
                <span
                  key={k}
                  className="bg-[#e3efef] text-[#6c5b4c] px-4 py-1 rounded-full text-sm border"
                >
                  {v}
                </span>
              ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {products.slice(0, 4).map((product, idx) => (
            <div key={idx} className="relative">
              <div className="bg-[#a97b4c] rounded-lg flex items-center justify-center h-48 mb-2 relative overflow-hidden">
                <span className="text-white text-2xl italic font-medium">
                  Photo
                </span>
                <button className="absolute top-2 right-2 text-white">
                  <FiHeart className="text-2xl" />
                </button>
                {/* Cart icon button */}
                {product.name && product.price && (
                  <button
                    className="absolute bottom-[150px] left-[25px] -translate-x-1/2 bg-white/80 text-[#644632] p-2 rounded-full text-xl font-medium shadow hover:bg-white transition flex items-center justify-center"
                    onClick={() => handleAddToCart(idx)}
                    aria-label="Add to cart"
                  >
                    <FiShoppingCart />
                  </button>
                )}
                {/* Popup animation */}
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-white text-[#644632] text-lg font-semibold rounded-lg transition-all duration-500 ${cartPopup[idx]
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90 pointer-events-none"
                    }`}
                  style={{ zIndex: 20 }}
                >
                  Added to cart!
                </div>
              </div>
              {product.name && (
                <div className="text-center">
                  <p className="text-[#644632] font-medium">{product.name}</p>
                  {product.price && <p className="text-sm">{product.price}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Product grid - second row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(4).map((product, idx) => (
            <div key={idx} className="relative">
              <div className="bg-[#a97b4c] rounded-lg flex items-center justify-center h-48 mb-2 relative">
                <span className="text-white text-2xl italic font-medium">
                  Photo
                </span>
                <button className="absolute top-2 right-2 text-white">
                  <FiHeart className="text-2xl" />
                </button>
              </div>
              {product.name && (
                <div className="text-center">
                  <p className="text-[#644632] font-medium">{product.name}</p>
                  {product.price && <p className="text-sm">{product.price}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 gap-2">
          <div className="h-3 w-3 rounded-full bg-[#c9d8b7]"></div>
          <div className="h-3 w-3 rounded-full bg-gray-200"></div>
          <div className="h-3 w-3 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;