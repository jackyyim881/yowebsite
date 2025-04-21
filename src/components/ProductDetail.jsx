import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingBag, Heart, Share2, Star, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // 使用购物车上下文
  const { addToCart } = useCart();

  useEffect(() => {
    // 找到匹配ID的产品
    const foundProduct = products.find((p) => p.id.toString() === id);
    setProduct(foundProduct);
    setLoading(false);
  }, [id, products]);

  // 添加到购物车函数
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setIsAdded(true);

      // 3秒后重置添加状态
      setTimeout(() => {
        setIsAdded(false);
      }, 3000);
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

  // WhatsApp share handler
  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const text = `Check out this product: ${
      product.name
    } - $${discountedPrice.toFixed(2)}\n${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} rating
            </span>
          </div>

          <div className="mb-6">
            <span className="text-2xl font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="ml-3 text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-2 text-red-500">-{product.discount}%</span>
              </>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-medium mb-2">Description</h2>
            <p className="text-gray-600">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-medium mb-2">Quantity</h2>
            <div className="flex items-center">
              <button
                className="w-10 h-10 border rounded-l flex items-center justify-center"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 h-10 border-t border-b text-center"
              />
              <button
                className="w-10 h-10 border rounded-r flex items-center justify-center"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              className={`flex-1 py-3 px-6 ${
                isAdded
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-pink-500 hover:bg-pink-600"
              } text-white rounded-full flex items-center justify-center gap-2 transition-colors`}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>
            <button className="py-3 px-6 border border-gray-300 hover:border-gray-400 rounded-full">
              <Heart className="w-5 h-5" />
            </button>
            <button
              className="py-3 px-6 border border-gray-300 hover:border-gray-400 rounded-full"
              onClick={handleShareWhatsApp}
              title="Share on WhatsApp"
            >
              <Share2 className="w-5 h-5" />
              <span className="sr-only">Share on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
