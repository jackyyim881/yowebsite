import React, { useState } from "react";
import Switch from '@mui/material/Switch';
import { FormControlLabel } from "@mui/material";
const categories = [
  "Tops",
  "Bottoms",
  "Outerwear",
  "Shoes",
  "Accessories",
  "Bags",
  "Other",
];

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["White", "Black", "Blue", "Red", "Green", "Yellow", "Other"];
const textures = ["Soft", "Denim", "Cotton", "Wool", "Silk", "Other"];

const SellEdit = () => {
  const [images, setImages] = useState([null, null, null, null, null]);
  const [form, setForm] = useState({
    category: "",
    name: "",
    description: "",
    size: "",
    color: "",
    texture: "",
    price: "",
    condition: 3,
    deliveryInPerson: false,
    deliveryGoods: false,
    payment: "",
  });

  const label = { inputProps: { "Caveat": "Switch demo" } };

  const handleImageChange = (idx, e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImages((prev) => prev.map((img, i) => (i === idx ? url : img)));
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleConditionChange = (val) => {
    setForm((prev) => ({ ...prev, condition: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save logic
    alert("Submitted!");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Photo Upload */}
        <div>
          <label className="block text-lg font-medium mb-2">Photo</label>
          <div className="flex gap-4">
            {images.map((img, idx) => (
              <label
                key={idx}
                className="w-32 h-32 bg-[#a97b4c] rounded-lg flex items-center justify-center cursor-pointer relative"
              >
                {img ? (
                  <img
                    src={img}
                    alt={`product-${idx}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-white text-xl font-semibold">
                    {idx === 0 ? "Photo" : "+"}
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImageChange(idx, e)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-base mb-1 font-medium">
            Select Category<span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleFormChange}
            required
            className="w-60 rounded-full px-4 py-2 bg-[#e3efef] border-none"
          >
            <option value="">Product categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <hr />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-[Caveat]">
          <div>
            <label className="block font-medium mb-1">
              Product Name<span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleFormChange}
              required
              className="w-full rounded-full px-4 py-2 bg-[#e3efef] border-none font-[Caveat]"
              placeholder="Product Name"
            />

            <label className="block font-medium mt-4 mb-1">
              Describe Product
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              rows={5}
              className="w-full rounded-xl px-4 py-2 bg-[#e3efef] border-none font-[Caveat]"
              placeholder="Describe your product"
            />
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div>
                <label className="block font-medium mb-1">
                  Size<span className="text-red-500">*</span>
                </label>
                <select
                  name="size"
                  value={form.size}
                  onChange={handleFormChange}
                  required
                  className="rounded-full px-4 py-2 bg-[#e3efef] border-none font-[Caveat]"
                >
                  <option value="">Select</option>
                  {sizes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Color<span className="text-red-500">*</span>
                </label>
                <select
                  name="color"
                  value={form.color}
                  onChange={handleFormChange}
                  required
                  className="rounded-full px-4 py-2 bg-[#e3efef] border-none font-[Caveat]"
                >
                  <option value="">Select</option>
                  {colors.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Texture</label>
                <select
                  name="texture"
                  value={form.texture}
                  onChange={handleFormChange}
                  className="rounded-full px-4 py-2 bg-[#e3efef] border-none font-[Caveat]"
                >
                  <option value="">Select</option>
                  {textures.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-4 items-end">
              <div>
                <label className="block font-medium mb-1">
                  Price<span className="text-red-500">*</span>
                </label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleFormChange}
                  required
                  className="rounded-full px-4 py-2 bg-[#e3efef] border-none font-[Caveat]"
                  placeholder="HK$"
                  type="number"
                  min="0"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">New ----- Old</label>
                <div className="flex gap-1 mt-1">
                  {[
                    "bg-[#a8e6cf]", // 1 - green
                    "bg-[#dcedc1]", // 2 - light green
                    "bg-[#ffd3b6]", // 3 - orange
                    "bg-[#ffaaa5]", // 4 - pink
                    "bg-[#ff8b94]", // 5 - red
                  ].map((color, idx) => {
                    const v = idx + 1;
                    return (
                      <button
                        type="button"
                        key={v}
                        className={`w-6 h-6 rounded-full border-2 font-[Caveat] ${form.condition === v
                          ? `${color} border-[#a97b4c]`
                          : "border-gray-300 bg-[#e3efef]"
                          }`}
                        onClick={() => handleConditionChange(v)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Delivery Method</label>
              <div className="flex gap-4 flex-col bg-[#e3efef] rounded-lg">
                <FormControlLabel
                  control={
                    <Switch
                      name="deliveryInPerson"
                      checked={form.deliveryInPerson}
                      onChange={handleFormChange}
                      color="secondary"
                      sx={{ "& .MuiSwitch-thumb": { backgroundColor: "#a97b4c" } }}
                    />

                  }
                  label="Trade in person"
                  className=" px-3 py-2  rounded-lg cursor-pointer font-[Caveat]"
                />
                <FormControlLabel
                  control={
                    <Switch
                      name="deliveryGoods"
                      checked={form.deliveryGoods}
                      onChange={handleFormChange}
                      color="secondary"
                      className=""
                      sx={{
                        '& .MuiSwitch-thumb': { backgroundColor: "#a97b4c" },
                        fontFamily: "'Caveat', cursive"
                      }}
                    />
                  }
                  sx={{
                    fontFamily: "'Caveat', cursive",
                    bgcolor: "",
                    px: 1.5,
                    cursor: "pointer"
                  }}
                  label="Delivery goods"
                />

              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* Payment Function */}
        <div>
          <label className="block font-medium mb-2">Payment function</label>
          <div className="flex gap-6">
            {["Visa", "Master", "Alipay", "ApplePay"].map((pay, idx) => (
              <label
                key={pay}
                className={`w-16 h-16 rounded-lg flex items-center justify-center bg-[#e3efef] cursor-pointer border-2 ${form.payment === pay
                  ? "border-[#a97b4c]"
                  : "border-transparent"
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={pay}
                  checked={form.payment === pay}
                  onChange={handleFormChange}
                  className="hidden"
                />
                <span className="text-2xl">{/* 可放icon */}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 justify-end">
          <button
            type="button"
            className="bg-[#c9d8b7] text-[#6c5b4c] px-8 py-2 rounded-full font-semibold text-lg"
          >
            Save
          </button>
          <button
            type="submit"
            className="bg-[#e9dfc7] text-[#a97b4c] px-8 py-2 rounded-full font-semibold text-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellEdit;
