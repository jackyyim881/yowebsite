import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./components/Home";
import BlogSection from "./components/BlogSection";
import ShipSection from "./components/ShipSection";
import ProductSection from "./components/ProductSection";
import { products, blogPosts } from "./data"; // Assuming you have a products.js file in the data folder
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import NotFoundPage from "./components/NotFoundPage";
import CheckoutPage from "./components/CheckoutPage";
import BlogDetail from "./components/BlogDetail";
import { CartProvider } from "./context/CartContext"; // 导入CartProvider
import AccountPage from "./components/AccountPage";
import RegisterPage from "./components/RegisterPage";
import SellEdit from "./components/SellEdit";
import AboutSection from "./AboutSection";

export default function App() {
  return (
    <CartProvider>
      <div className="font-poppins min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogSection posts={blogPosts} />} />
            <Route
              path="/blog/:id"
              element={<BlogDetail blogs={blogPosts} />}
            />
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
            <Route path="/about" element={<AboutSection title="About Us" />} />
            <Route
              path="/products/:id"
              element={<ProductDetail products={products} />}
            />
            <Route path="/edit" element={<SellEdit products={products} />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
