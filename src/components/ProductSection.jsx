import React, { useState } from "react";

const categories = [
  "Top",
  "Dress",
  "shirt",
  "jacket",
  "bag",
  "shose",
  "jellew",
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

  // 假資料
  const products = Array(5).fill({});

  // Tag 樣式
  const tags = ["Dress", "jellew", "bag", "shose"];

  return (
    <section className="my-8">
      <div className="container mx-auto text-[#644632] px-4 max-w-7xl">
        {/* Tag 列 */}
        <div className="flex gap-6 mb-6 items-center">
          {tags.map((tag) => (
            <span key={tag} className="text-2xl italic font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Filter + 選項 */}
        <div className="flex gap-4 mb-8 items-center">
          {/* Filter 按鈕 */}
          <div className="relative">
            <button
              className="bg-[#c9d8b7] text-[#6c5b4c] px-6 py-2 rounded-full font-medium shadow border border-[#c9d8b7] hover:bg-[#b8c7a7] transition"
              onClick={() => setFilterOpen((v) => !v)}
            >
              Filter
            </button>
            {filterOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-[#e3efef] rounded-xl shadow-lg p-4 z-10 text-[#6c5b4c] space-y-3">
                <div>
                  <label className="block text-sm mb-1">Product category</label>
                  <select
                    className="w-full rounded px-2 py-1"
                    value={selected.category}
                    onChange={(e) =>
                      setSelected((s) => ({ ...s, category: e.target.value }))
                    }
                  >
                    <option value="">All</option>
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
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
          {/* 選中條件 tag */}
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

        {/* 產品卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {products.map((_, idx) => (
            <div
              key={idx}
              className="bg-[#a97b4c] rounded-lg flex items-center justify-center h-48"
            >
              <span className="text-white text-2xl italic font-medium">
                Photo
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
