import React, { useState } from "react";

const sidebarCategories = [
  {
    title: "Clothes",
    icon: "../img/icons/dress.svg",
    alt: "clothes",
    submenu: [
      { name: "Shirt", stock: 300 },
      { name: "shorts & jeans", stock: 60 },
      { name: "jacket", stock: 50 },
      { name: "dress & frock", stock: 87 },
    ],
  },
  {
    title: "Footwear",
    icon: "../img/icons/shoes.svg",
    alt: "footwear",
    submenu: [
      { name: "Sports", stock: 45 },
      { name: "Formal", stock: 75 },
      { name: "Casual", stock: 35 },
      { name: "Safety Shoes", stock: 26 },
    ],
  },
  {
    title: "Jewelry",
    icon: "../img/icons/jewelry.svg",
    alt: "clothes",
    submenu: [
      { name: "Earrings", stock: 46 },
      { name: "Couple Rings", stock: 73 },
      { name: "Necklace", stock: 61 },
    ],
  },
  {
    title: "Perfume",
    icon: "../img/icons/perfume.svg",
    alt: "perfume",
    submenu: [
      { name: "Clothes Perfume", stock: "12 pcs" },
      { name: "Deodorant", stock: "60 pcs" },
      { name: "jacket", stock: "50 pcs" },
      { name: "dress & frock", stock: "87 pcs" },
    ],
  },
  {
    title: "Cosmetics",
    icon: "../img/icons/cosmetics.svg",
    alt: "cosmetics",
    submenu: [
      { name: "Shampoo", stock: 68 },
      { name: "Sunscreen", stock: 46 },
      { name: "Body Wash", stock: 79 },
      { name: "Makeup Kit", stock: 23 },
    ],
  },
  {
    title: "Glasses",
    icon: "../img/icons/glasses.svg",
    alt: "glasses",
    submenu: [
      { name: "Sunglasses", stock: 50 },
      { name: "Lenses", stock: 48 },
    ],
  },
  {
    title: "Bags",
    icon: "../img/icons/bag.svg",
    alt: "bags",
    submenu: [
      { name: "Shopping Bag", stock: 62 },
      { name: "Gym Backpack", stock: 35 },
      { name: "Purse", stock: 80 },
      { name: "Wallet", stock: 75 },
    ],
  },
];

export default function Sidebar() {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="sidebar h-full overflow-hidden" data-mobile-menu>
      <div className="bg-white  rounded-lg p-4  h-full sm:w-64 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Category</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            data-mobile-menu-close-btn
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
        <ul className="space-y-2">
          {sidebarCategories.map((cat, idx) => (
            <li key={cat.title}>
              <button
                className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-gray-100 focus:outline-none"
                data-accordion-btn
                onClick={() => toggleAccordion(idx)}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={cat.icon}
                    alt={cat.alt}
                    width="20"
                    height="20"
                    className="object-contain"
                  />
                  <p className="text-gray-700 font-medium">{cat.title}</p>
                </div>
                <div>
                  <ion-icon
                    name="add-outline"
                    className="text-xl text-gray-400"
                    style={{
                      display: openIndexes.includes(idx) ? "none" : "inline",
                    }}
                  ></ion-icon>
                  <ion-icon
                    name="remove-outline"
                    className="text-xl text-gray-400"
                    style={{
                      display: openIndexes.includes(idx) ? "inline" : "none",
                    }}
                  ></ion-icon>
                </div>
              </button>
              <ul
                className={`pl-8 mt-1 space-y-1 transition-all duration-200 ${
                  openIndexes.includes(idx) ? "block" : "hidden"
                }`}
                data-accordion
              >
                {cat.submenu.map((item) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full text-left px-2 py-1 rounded hover:bg-gray-50 focus:outline-none"
                    >
                      <p className="text-gray-600">{item.name}</p>
                      <data
                        value={item.stock}
                        className="text-xs text-gray-400"
                        title="Available Stock"
                      >
                        {item.stock}
                      </data>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
