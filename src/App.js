import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import NewsletterModal from "./NewsletterModal";
import NotificationToast from "./NotificationToast";
// Remove this import: import { Route } from "lucide-react";
import Home from "./components/Home";
import BlogSection from "./components/BlogSection";
import ShipSection from "./components/ShipSection";
import ProductSection from "./components/ProductSection";
import { products } from "./data"; // Assuming you have a products.js file in the data folder
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import { CartProvider } from "./context/CartContext"; // 导入CartProvider
import NotFoundPage from "./components/NotFoundPage";
import CheckoutPage from "./components/CheckoutPage";

const blogPosts = [
  {
    id: 1,
    img: "/img/blog-1.jpg",
    category: "Fashion",
    title: "Clothes Retail KPIs 2024 Guide for Clothes Executives.",
    author: "Mr Admin",
    date: "Apr 06, 2024",
  },
  {
    id: 2,
    img: "/img/blog-2.jpg",
    category: "Clothes",
    title: "Curbside Fashion Trends: How to Win the Pickup Battle.",
    author: "Mr Robin",
    date: "Jan 18, 2024",
  },
  {
    id: 3,
    img: "/img/blog-3.jpg",
    category: "Shoes",
    title: "EBT Vendors: Claim Your Share of SNAP Online Revenue.",
    author: "Mr Selsa",
    date: "Feb 10, 2024",
  },
  {
    id: 4,
    img: "/img/blog-4.jpg",
    category: "Electronics",
    title: "Fashion Tech: Blending Style and Innovation in 2024.",
    author: "Mr Pawar",
    date: "Mar 15, 2024",
  },
];

export default function App() {
  return (
    <CartProvider>
      <div className="max-h-min">
        <div className="font-poppins min-h-screen flex flex-col">
          <Header />
          <section className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogSection posts={blogPosts} />} />
              <Route
                path="/sell"
                element={<ProductSection title="Sell" products={products} />}
              />
              <Route path="/ship" element={<ShipSection />} />
              <Route
                path="/products"
                element={
                  <ProductSection title="All Products" products={products} />
                }
              />
              <Route
                path="/products/:id"
                element={<ProductDetail products={products} />}
              />{" "}
              <Route path="/cart" element={<CartPage />} />
              {/* Add more routes as needed, for example: */}
              {/* <Route path="/products/:id" element={<ProductPage />} /> */}
              {/* <Route path="/cart" element={<CartPage />} /> */}
              <Route path="/checkout" element={<CheckoutPage />} />
              {/* <Route path="/category/:category" element={<CategoryPage />} /> */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </section>
          <Footer />
          {/* <NewsletterModal />
        <NotificationToast /> */}
        </div>
      </div>
    </CartProvider>
  );
}
