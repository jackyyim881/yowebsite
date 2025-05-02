import React from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product) {
    console.error("Missing product data");
    return null;
  }

  const {
    id,
    name = "",
    price = 0,
    img = "",
    discount = 0,
    rating = 0,
    category = "",
  } = product;

  // Make sure ID is treated as a string in the URL
  const productId = id?.toString();

  if (!productId) {
    console.error("Product missing ID:", product);
    return null;
  }

  const numericPrice = Number(price) || 0;
  const numericDiscount = Number(discount) || 0;
  const numericRating = Number(rating) || 0;
  const discountedPrice = numericPrice - (numericPrice * numericDiscount) / 100;

  return (
    <div className="group relative rounded-lg overflow-hidden border border-gray-200 hover:border-pink-500 transition-all bg-white">
      {/* Discount badge */}
      {numericDiscount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          -{numericDiscount}%
        </div>
      )}

      {/* Wishlist button */}
      <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm opacity-80 hover:opacity-100">
        <Heart className="w-4 h-4 text-gray-500 hover:text-pink-500" />
      </button>

      {/* Product image with link */}
      <Link to={`/products/${productId}`} className="block">
        <div className="aspect-square bg-gray-50 overflow-hidden">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex items-center px-2 py-1">
          <Star className="w-3 h-3 fill-current text-yellow-400" />
          <span className="text-xs ml-1 text-gray-500">{numericRating}</span>
        </div>
      </Link>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{category}</div>
        <Link
          to={`/products/${productId}`}
          className="block hover:text-pink-500"
        >
          <h3 className="font-medium text-sm mb-1 line-clamp-1">{name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              $
              {numericDiscount > 0
                ? discountedPrice.toFixed(2)
                : numericPrice.toFixed(2)}
            </span>
            {numericDiscount > 0 && (
              <span className="text-xs text-gray-500 line-through">
                ${numericPrice.toFixed(2)}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Quick add button - only appears on hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
        <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm rounded-full px-4 py-1.5 transform transition-transform">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
