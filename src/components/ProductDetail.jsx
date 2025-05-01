import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, HomeIcon, Share2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = products.find((p) => p.id.toString() === id);
    setProduct(foundProduct);
    setLoading(false);
  }, [id, products]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/products" className="text-pink-500 hover:underline">
          Browse all products
        </Link>
      </div>
    );

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl text-[#7a5522]">
      {/* Breadcrumbs */}
      <div className="italic mb-4 text-[#7a5522] text-base">
        Dress &gt; T-shirt &gt; Price
      </div>
      {/* Product Icon Link */}
      <Link to="/products" className="inline-flex items-center gap-2 mb-6 text-[#7a5522] hover:underline">
        <HomeIcon className="w-5 h-5" />
        <span className="text-lg font-medium">All Products</span>
      </Link>
      {/* Main Grid Layout */}
      <div className="mb-8">
        {/* Images & Actions */}
        <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-4">
          {/* Main Image with Actions */}
          <div className="bg-[#a97b4c] rounded-lg h-56 flex items-start justify-start p-4 relative">
            <div className="flex gap-4">
              <button className="flex items-center text-white hover:opacity-80">
                <Heart className="w-6 h-6" />
                <span className="ml-2 text-base italic">Favorite</span>
              </button>
              <button className="flex items-center text-white hover:opacity-80">
                <Share2 className="w-6 h-6" />
                <span className="ml-2 text-base italic">Share</span>
              </button>
            </div>
          </div>
          {/* Thumbnails & Next */}
          <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
            <div className="bg-[#a97b4c] rounded-lg h-56"></div>
            {/* Arrow for next thumbnail */}
            <button className="ml-2 p-2 rounded-full relative right-20 bg-[#7a5522] text-white hover:bg-[#a97b4c] transition">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between h-full">
          {/* Product Title & Price */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
            <div className="flex items-end gap-3">
              {product.discount ? (
                <>
                  <span className="text-lg text-gray-400 line-through">HK${product.price}</span>
                  <span className="text-2xl font-bold text-[#7a5522]">HK${discountedPrice}</span>
                  <span className="ml-2 px-2 py-0.5 bg-pink-100 text-pink-600 rounded text-xs font-semibold">
                    -{product.discount}%
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-[#7a5522]">HK${product.price}</span>
              )}
            </div>
          </div>

          {/* Product Meta Info */}
          <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className=" text-xl text-gray-500">Size</div>
              <div className="font-medium">{product.size || "XL"}</div>
            </div>
            <div>
              <div className="text-xl text-gray-500">Category</div>
              <div className="font-medium">{product.category || "Shoes"}</div>
            </div>
            <div>
              <div className=" text-xl text-gray-500">Trading</div>
              <div className="font-medium">Meet in person</div>
            </div>
            <div>
              <div className="text-xl text-gray-500">Posted</div>
              <div className="font-medium">{product.postingTime || "Today"}</div>
            </div>
          </div>

          {/* Product Description */}
          {product.description && (
            <div className="mb-8">
              <div className="text-base font-semibold mb-1">Description</div>
              <div className="text-gray-700">{product.description}</div>
            </div>
          )}
          <div className="flex justify-start mt-4">
            <button
              className="bg-[#7a5522] text-white px-12 py-2 text-lg italic transition hover:bg-[#a97b4c]"
              onClick={handleAddToCart}
            >
              {isAdded ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Similar Product */}
      <div className="mt-8 italic text-lg border-t border-[#c9d8b7] pt-4">
        Similar Product
      </div>
    </div>
  );
};

export default ProductDetail;