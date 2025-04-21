import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SellSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    weight: "",
    condition: "",
    description: "",
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    // Handle file uploads
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you'd upload the data to your backend
      // For now, we'll simulate a successful upload

      // Create a new product object
      const newProduct = {
        id: Date.now(), // Generate a unique ID
        name: formData.name,
        category: formData.brand || "Other", // Use brand as category if present
        price: parseFloat(formData.price),
        discount: 0, // Default no discount for new products
        // Use a placeholder image or create a blob URL from the uploaded image
        img:
          formData.images.length > 0
            ? URL.createObjectURL(formData.images[0])
            : "/img/products/placeholder.jpg",
        rating: 0, // New products have no ratings
        description: formData.description,
        stock: parseInt(formData.stock),
        condition: formData.condition,
      };

      // In a real app, you would send this to your API
      console.log("New product created:", newProduct);

      // Simulate successful submission
      setTimeout(() => {
        setIsSubmitting(false);

        // Navigate to the product detail page
        navigate(`/products/${newProduct.id}`);

        // Or you could redirect to a success page
        // navigate("/sell/success");
      }, 1500);
    } catch (error) {
      console.error("Error creating product:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="sell" className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-2">
          Sell Your Products
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Start selling on our marketplace by completing the form below.
        </p>

        <form
          className="grid md:grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow"
          onSubmit={handleSubmit}
        >
          {/* Left column - Text fields */}
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium mb-1">
                Brand
              </label>
              <input
                id="brand"
                type="text"
                value={formData.brand}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                Price ($) *
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium mb-1">
                Stock *
              </label>
              <input
                id="stock"
                type="number"
                required
                value={formData.stock}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium mb-1"
              >
                Weight (g) *
              </label>
              <input
                id="weight"
                type="number"
                required
                value={formData.weight}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label
                htmlFor="condition"
                className="block text-sm font-medium mb-1"
              >
                Condition *
              </label>
              <select
                id="condition"
                required
                value={formData.condition}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="used-good">Used – Good</option>
                <option value="used-fair">Used – Fair</option>
              </select>
            </div>
          </div>

          {/* Right column - Description + Images */}
          <div className="space-y-6">
            <div className="flex flex-col h-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Product Description *
              </label>
              <textarea
                id="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 flex-1 resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="product-images"
                className="block text-sm font-medium mb-1"
              >
                Product Images *
              </label>
              <input
                id="product-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                Max 5 images, max 5 MB per file, recommended 800×800 px
              </p>
            </div>
          </div>

          {/* Submit button */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-block px-6 py-2 ${
                isSubmitting ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"
              } text-white font-semibold rounded shadow focus:outline-none focus:ring-2 focus:ring-pink-400 transition`}
            >
              {isSubmitting ? "Processing..." : "List Product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
