import React from "react";
import { Link } from "react-router-dom";
import { Trash, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity } =
    useCart();

  // Color palette
  const bgBase = "bg-[#fff5eb]";
  const pink = "bg-[#ffc3c3] text-[#644632]";
  const olive = "bg-[#b8c8a0] text-[#644632]";
  const bluegreen = "bg-[#bedcdc] text-[#644632]";
  const brownText = "text-[#644632]";

  if (cart.length === 0) {
    return (
      <div className={`container mx-auto px-4 py-16 text-center ${bgBase}`}>
        <h1 className={`text-3xl font-bold mb-6 ${brownText}`}>Your Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is currently empty.</p>
        <Link
          to="/products"
          className={`inline-block px-6 py-3 rounded-full hover:bg-[#b8c8a0] transition ${pink}`}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 max-w-7xl `}>
      <h1 className={`text-3xl font-bold mb-8 ${brownText}`}>Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className={`hidden md:grid md:grid-cols-12 p-4  font-medium`}>
              <div className="md:col-span-6">Product</div>
              <div className="md:col-span-2 text-center">Price</div>
              <div className="md:col-span-2 text-center">Quantity</div>
              <div className="md:col-span-2 text-center">Total</div>
            </div>

            {cart.map((item) => {
              const discountedPrice = item.discount
                ? item.price - (item.price * item.discount) / 100
                : item.price;
              const itemTotal = discountedPrice * item.quantity;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 border-t p-4 gap-4"
                  style={{ background: "#fff5eb" }}
                >
                  {/* Product */}
                  <div className="md:col-span-6 flex items-center gap-4">
                    <Link to={`/product/${item.id}`} className="block"></Link>
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className={`font-medium hover:text-[#ffc3c3] ${brownText}`}
                      >
                        {item.name}
                      </Link>
                      {item.category && (
                        <p className="text-xs text-gray-500 mt-1">
                          Category: {item.category}
                        </p>
                      )}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 flex items-center gap-1 mt-2 hover:underline"
                      >
                        <Trash className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                    <span className="md:hidden">Price:</span>
                    <span className={`font-medium ${brownText}`}>
                      ${discountedPrice.toFixed(2)}
                      {item.discount > 0 && (
                        <span className="text-xs text-gray-500 ml-1 line-through">
                          ${item.price.toFixed(2)}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                    <span className="md:hidden">Quantity:</span>
                    <div className="flex items-center border rounded">
                      <button
                        className={`w-8 h-8 flex items-center justify-center border-r hover:${olive}`}
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        className={`w-8 h-8 flex items-center justify-center border-l hover:${olive}`}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                    <span className="md:hidden">Total:</span>
                    <span className={`font-medium ${brownText}`}>
                      ${itemTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className={`border rounded-lg p-6 sticky top-6 bg-white  `}>
            <h2 className={`text-xl font-semibold mb-4 ${brownText}`}>
              Order Summary
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className={`block w-full text-center py-3 rounded-lg hover:bg-[#b8c8a0] transition ${olive} font-semibold`}
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="block text-center mt-4 text-sm  hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
