import BannerSlider from "./BannerSlider";
import CategoryScroll from "./CategoryScroll";
import ProductSection from "./ProductSection";
import Sidebar from "./Sidebar";
import { products } from "../data";

// Import additional pages you'll need
// For example:
// import ProductPage from "./ProductPage";
// import CartPage from "./CartPage";
// import CheckoutPage from "./CheckoutPage";

// Create a Home component for your main landing page
export default function Home() {
  return (
    <div className="grid gap-8 px-2 md:px-0 max-w-7xl mx-auto w-full grid-cols-1 md:grid-cols-4">
      <div className="md:col-span-4">
        <BannerSlider />
      </div>
      <div className="md:col-span-4">
        <CategoryScroll />
      </div>
      <aside className="md:col-span-1 w-full md:sticky md:top-24">
        <Sidebar />
      </aside>
      <main className="md:col-span-3 flex-1">
        <ProductSection title="New Arrivals" products={products} />
      </main>
    </div>
  );
}
