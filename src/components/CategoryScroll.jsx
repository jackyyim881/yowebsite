import React from "react";

const categories = [
  {
    id: 1,
    name: "Dress & Frock",
    amount: 53,
    icon: "./img/icons/dress.svg",
  },
  {
    id: 2,
    name: "Winter wear",
    amount: 58,
    icon: "./img/icons/coat.svg",
  },
  {
    id: 3,
    name: "Glasses & Lens",
    amount: 68,
    icon: "./img/icons/glasses.svg",
  },
  {
    id: 4,
    name: "Shorts & Jeans",
    amount: 84,
    icon: "./img/icons/shorts.svg",
  },
  { id: 5, name: "T‑Shirts", amount: 35, icon: "./img/icons/tee.svg" },
  {
    id: 6,
    name: "Jacket",
    amount: 16,
    icon: "./img/icons/jacket.svg",
  },
  { id: 7, name: "Watch", amount: 27, icon: "./img/icons/watch.svg" },
  {
    id: 8,
    name: "Hat & Caps",
    amount: 39,
    icon: "./img/icons/hat.svg",
  },
];
const CategoryScroll = () => {
  return (
    <section className="my-8 px-4 container mx-auto max-w-6xl">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex-shrink-0 w-44 bg-white border rounded-md p-4 flex items-center gap-3"
          >
            <img src={c.icon} alt={c.name} className="w-8 h-8" />
            <div>
              <h3 className="text-sm font-semibold leading-none mb-1">
                {c.name}
              </h3>
              <p className="text-xs text-gray-500">({c.amount})</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryScroll;
