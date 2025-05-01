import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Lock,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Shipping information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",

    // Payment information
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",

    // Options
    saveInfo: false,
    sameAsShipping: true,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Navigate between steps
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Submit payment and complete order
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // In a real app, you'd integrate with a payment processor API here
      // Example with Stripe: await stripe.confirmCardPayment(clientSecret, { payment_method: { card: elements.getElement('card') } });

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mark order as complete
      setOrderComplete(true);

      // Clear cart
      clearCart();

      // In a real app, you'd save the order to your database
    } catch (error) {
      console.error("Payment error:", error);
      // Handle error state
    } finally {
      setIsProcessing(false);
    }
  };

  // If cart is empty and not in order complete state, redirect to cart
  if (cart.length === 0 && !orderComplete) {
    navigate("/cart");
    return null;
  }

  // Order success screen
  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 rounded-full p-3">
            <Check className="w-10 h-10 text-green-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Your Order is Confirmed!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We've sent a confirmation email with your
          order details.
        </p>
        <div className="border  border-gray-200 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <div className="border-b pb-2 mb-2">
            <div className="flex justify-between mb-2">
              <span>Items ({totalItems}):</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${(totalPrice * 0.07).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${(totalPrice + totalPrice * 0.07).toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 bg-[#F98D79] hover:bg-pink-600 text-white rounded-full transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="max-w-4xl mx-auto">
        {/* Checkout Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div
              className={`flex flex-col items-center ${currentStep >= 1 ? "text-pink-500" : "text-gray-400"
                }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? "bg-[#F98D79] text-white" : "bg-gray-200"
                  }`}
              >
                <ShoppingBag className="w-5 h-5 " />
              </div>
              <span className="text-xs font-medium">Cart</span>
            </div>

            <div
              className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? "bg-[#F98D79]" : "bg-gray-200"
                }`}
            />

            <div
              className={`flex flex-col items-center ${currentStep >= 2 ? "text-pink-500" : "text-gray-400"
                }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? "bg-[#F98D79] text-white" : "bg-gray-200"
                  }`}
              >
                {currentStep > 2 ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>2</span>
                )}
              </div>
              <span className="text-xs font-medium">Shipping</span>
            </div>

            <div
              className={`flex-1 h-1 mx-4 ${currentStep >= 3 ? "bg-[#F98D79]" : "bg-gray-200"
                }`}
            />

            <div
              className={`flex flex-col items-center ${currentStep >= 3 ? "text-pink-500" : "text-gray-400"
                }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? "bg-[#F98D79] text-white" : "bg-gray-200"
                  }`}
              >
                {currentStep > 3 ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>3</span>
                )}
              </div>
              <span className="text-xs  font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Main checkout form */}
          <div className="md:col-span-3">
            {currentStep === 1 && (
              <div className="bg-[#fff5eb] border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Review Your Order
                </h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => {
                    const discountedPrice = item.discount
                      ? item.price - (item.price * item.discount) / 100
                      : item.price;

                    return (
                      <div key={item.id} className="flex items-center">
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} × ${discountedPrice.toFixed(2)}
                          </p>
                        </div>
                        <div className="font-medium">
                          ${(discountedPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-[#F98D79] hover:bg-pink-600 text-white rounded-full transition"
                  >
                    Continue to Shipping
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <form className="bg-[#fff5eb] border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Shipping Information
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-1"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium mb-1"
                    >
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium mb-1"
                    >
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium mb-1"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>

                  <div className="col-span-2 mt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleChange}
                        className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
                      />
                      <span className="ml-2 text-sm">
                        Save this information for next time
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center px-6 py-3 border border-gray-300 hover:border-gray-400 rounded-full transition"
                  >
                    <ChevronLeft className="mr-1 w-4 h-4" />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-[#F98D79] hover:bg-pink-600 text-white rounded-full transition"
                  >
                    Continue to Payment
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {currentStep === 3 && (
              <form
                onSubmit={handleSubmit}
                className="bg-[#fff5eb] border rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <div className="border border-pink-500 bg-pink-50 rounded-lg p-3 flex items-center cursor-pointer">
                      <div className="w-4 h-4 rounded-full bg-[#F98D79] border-4 border-white shadow-sm mr-3" />
                      <div className="flex-1">Credit Card</div>
                      <div className="flex gap-1">
                        <span className="w-8 h-5 bg-blue-800 rounded"></span>
                        <span className="w-8 h-5 bg-red-500 rounded"></span>
                        <span className="w-8 h-5 bg-gray-700 rounded"></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="border border-gray-200 rounded-lg p-3 flex items-center cursor-pointer opacity-60">
                      <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-400 mr-3" />
                      <div className="flex-1">PayPal</div>
                      <span className="w-8 h-5 bg-blue-600 rounded"></span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardName"
                      className="block text-sm font-medium mb-1"
                    >
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium mb-1"
                    >
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 pl-10"
                        required
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="expMonth"
                        className="block text-sm font-medium mb-1"
                      >
                        Exp. Month
                      </label>
                      <select
                        id="expMonth"
                        name="expMonth"
                        value={formData.expMonth}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      >
                        <option value="">MM</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (month) => (
                            <option
                              key={month}
                              value={month.toString().padStart(2, "0")}
                            >
                              {month.toString().padStart(2, "0")}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="expYear"
                        className="block text-sm font-medium mb-1"
                      >
                        Exp. Year
                      </label>
                      <select
                        id="expYear"
                        name="expYear"
                        value={formData.expYear}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                      >
                        <option value="">YY</option>
                        {Array.from(
                          { length: 10 },
                          (_, i) => new Date().getFullYear() + i
                        ).map((year) => (
                          <option key={year} value={year.toString().slice(-2)}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium mb-1"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                        maxLength="4"
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="sameAsShipping"
                        checked={formData.sameAsShipping}
                        onChange={handleChange}
                        className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
                      />
                      <span className="ml-2 text-sm">
                        Billing address is the same as shipping address
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center px-6 py-3 border border-gray-300 hover:border-gray-400 rounded-full transition"
                  >
                    <ChevronLeft className="mr-1 w-4 h-4" />
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`flex items-center px-8 py-3 ${isProcessing
                      ? "bg-gray-400"
                      : "bg-[#F98D79] hover:bg-pink-600"
                      } text-white rounded-full transition min-w-[160px] justify-center`}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>Pay ${(totalPrice + totalPrice * 0.07).toFixed(2)}</>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-8 text-gray-500 text-xs">
                  <Lock className="w-3 h-3" />
                  <span>Secure payment processed by Stripe</span>
                </div>
              </form>
            )}
          </div>

          {/* Order summary */}
          <div className="md:col-span-2">
            <div className="bg-[#fff5eb] border rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-2 pb-4 border-b">
                {cart.slice(0, 3).map((item) => {
                  const discountedPrice = item.discount
                    ? item.price - (item.price * item.discount) / 100
                    : item.price;

                  return (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        ${(discountedPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}

                {cart.length > 3 && (
                  <div className="text-sm text-gray-500">
                    +{cart.length - 3} more items
                  </div>
                )}
              </div>

              <div className="space-y-2 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Tax (7%)</span>
                  <span>${(totalPrice * 0.07).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total</span>
                  <span>${(totalPrice + totalPrice * 0.07).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="bg-gray-50 p-3 rounded border text-sm">
                  <h3 className="font-medium mb-1">Estimated Delivery</h3>
                  <p className="text-gray-500">
                    {new Date(
                      Date.now() + 7 * 24 * 60 * 60 * 1000
                    ).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
