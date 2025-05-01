import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, User, Search } from "lucide-react";
import { useCart } from "./context/CartContext";
import picture from "./img/images.png";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { totalItems } = useCart();

  return (
    <header className="bg-[#fff5eb] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-pink-500"></Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8 ">
            <Link to="/" className="text-[#644632] hover:text-pink-500">
              Home
            </Link>
            <Link to="/about" className="text-[#644632] hover:text-pink-500">
              {" "}
              About{" "}
            </Link>
            <Link to="/product" className="text-[#644632] hover:text-pink-500">
              Products
            </Link>
            <Link to="/" className="text-xl font-bold text-pink-500">
              <img src={picture} alt="Logo" className="w-[80px] h-auto" />
            </Link>

            <Link to="/blog" className="text-[#644632] hover:text-pink-500">
              Blog
            </Link>
            <Link to="/ship" className="text-[#644632] hover:text-pink-500">
              Ship
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-pink-500">
              <Search size={20} />
            </button>
            <Link to="/account" className="text-gray-700 hover:text-pink-500">
              <User size={20} />
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-pink-500 relative"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-pink-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-pink-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-pink-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/sell"
                className="text-gray-700 hover:text-pink-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell
              </Link>
              <Link
                to="/ship"
                className="text-gray-700 hover:text-pink-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Ship
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
