import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiHeart,
  FiShoppingCart,
  FiShare,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useCart } from "../context/CartContext"; // 1. Import useCart

const ImageDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart(); // 2. Use the hook

  // Product details (mock data - replace with actual data)
  const [product, setProduct] = useState({
    name: "Premium Fashion Item",
    price: "$129.99",
    originalPrice: "$159.99",
    discount: "19% off",
    description:
      "High quality premium fashion item made with sustainable materials. Perfect for any occasion.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Beige"],
    material: "80% Cotton, 20% Polyester",
    care: "Machine wash cold, tumble dry low",
    features: [
      "Premium quality material",
      "Sustainable production",
      "Comfortable fit",
      "Versatile styling options",
    ],
  });

  // Simulated API call to fetch image details
  useEffect(() => {
    const fetchImageDetails = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch data from an API
        // For now, we'll just decode the URL and use it as the image source
        const decodedImageUrl = decodeURIComponent(id);
        setCurrentImage(decodedImageUrl);

        // Simulate fetching related products
        // In real app, you would get this from an API based on product category/tags
        setRelatedProducts([
          {
            id: "product1",
            image: decodedImageUrl,
            name: "Similar Item 1",
            price: "$119.99",
          },
          {
            id: "product2",
            image: decodedImageUrl,
            name: "Similar Item 2",
            price: "$99.99",
          },
          {
            id: "product3",
            image: decodedImageUrl,
            name: "Similar Item 3",
            price: "$139.99",
          },
          {
            id: "product4",
            image: decodedImageUrl,
            name: "Similar Item 4",
            price: "$112.99",
          },
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching image details:", error);
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [id]);
  const handleAddToCart = () => {
    if (!selectedSize) return;
    // 3. Prepare product data for cart
    addToCart(
      {
        id: `${id}_${selectedSize}`, // unique id for product+size
        name: product.name,
        price: parseFloat(product.price.replace("$", "")), // convert to number
        size: selectedSize,
        image: currentImage,
      },
      quantity
    );
  };
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#644632]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 px-4 md:py-12">
      <div className="container mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#644632]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/product" className="hover:text-[#644632]">
            Product
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#644632]">{product.name}</span>
        </div>

        {/* Product Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden h-[500px] relative group">
              <LazyLoadImage
                src={currentImage}
                alt={product.name}
                effect="blur"
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full"
                threshold={100}
              />

              {/* Zoom hover effect */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <FiShare className="text-white text-2xl cursor-pointer mx-2" />
                <FiHeart className="text-white text-2xl cursor-pointer mx-2" />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {/* In a real app, you would have multiple images */}
              <button className="h-24 w-24 border-2 border-[#644632] rounded-md overflow-hidden">
                <img
                  src={currentImage}
                  alt="Thumbnail 1"
                  className="h-full w-full object-cover"
                />
              </button>
              <button className="h-24 w-24 border border-gray-200 rounded-md overflow-hidden opacity-50 hover:opacity-100">
                <img
                  src={currentImage}
                  alt="Thumbnail 2"
                  className="h-full w-full object-cover"
                />
              </button>
              <button className="h-24 w-24 border border-gray-200 rounded-md overflow-hidden opacity-50 hover:opacity-100">
                <img
                  src={currentImage}
                  alt="Thumbnail 3"
                  className="h-full w-full object-cover"
                />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#644632]">
              {product.name}
            </h1>

            <div className="flex items-end gap-2">
              <span className="text-2xl font-semibold text-[#644632]">
                {product.price}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {product.originalPrice}
              </span>
              <span className="text-sm bg-[#c9d8b7] text-[#644632] px-2 py-1 rounded-full">
                {product.discount}
              </span>
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`
                                            h-10 w-10 rounded-full flex items-center justify-center border
                                            ${
                                              selectedSize === size
                                                ? "bg-[#644632] text-white border-[#644632]"
                                                : "border-gray-300 hover:border-[#644632]"
                                            }
                                        `}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-medium mb-2">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded w-32">
                <button
                  className="px-3 py-1 text-lg"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full text-center focus:outline-none py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  className="px-3 py-1 text-lg"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            {/* Add to Cart Button */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-[#644632] text-white py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-[#523a28] transition"
                disabled={!selectedSize}
              >
                <FiShoppingCart />
                Add to Cart
              </button>

              <button className="border border-[#644632] text-[#644632] p-3 rounded-full hover:bg-[#f8f5f1] transition">
                <FiHeart className="text-xl" />
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="font-medium mb-2">Product Details</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Material: {product.material}</li>
                <li>Care: {product.care}</li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-medium mb-2">Features</h3>
              <ul className="space-y-1 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#c9d8b7] mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#644632] mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="group">
                <div className="bg-gray-100 rounded-lg overflow-hidden h-60 mb-2 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiHeart className="text-[#644632]" />
                  </button>
                </div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-[#644632]">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
