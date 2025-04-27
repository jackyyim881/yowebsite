import BannerSlider from "./BannerSlider";
import CategoryScroll from "./CategoryScroll";
import ProductSection from "./ProductSection";
import Sidebar from "./Sidebar";
import { products } from "../data";
import img1 from "../img2/img1.png";
import img2 from "../img2/img2.png";
import img3 from "../img2/img3.png";
import img4 from "../img2/cloth.png";
import img5 from "../img2/cloth2.png";
import img6 from "../img2/cloth3.png";
// Create a Home component for your main landing page
export default function Home() {
  const topProducts = products.slice(0, 4);

  return (
    <div className="gap-8 px-2 md:px-0 text-[#6c5b4c] max-w-7xl mx-auto w-full">
      <div className="md:col-span-4">
        <BannerSlider />
      </div>

      {/* 👇加了 md:col-span-4，讓這個區塊橫跨四欄！ */}
      <div className="grid grid-cols-2 w-full md:col-span-4">
        <div className="bg-beige p-4 ">
          <img
            src={img2}
            alt="What's your fashion personality?"
            className="w-[100%] h-[100%] object-fill shadow-sm"
          />
        </div>

        <div className="grid grid-rows-2 gap-4">
          <div className="bg-light-green p-4">
            <img
              src={img1}
              alt="Pass your style forward"
              className="w-[100%] h-[100%] object-cover shadow-sm"
            />
          </div>

          <div className="bg-light-blue p-4">
            <img
              src={img3}
              alt="Discover unique style"
              className="w-[100%] h-[100%] object-cover shadow-sm"
            />
          </div>
        </div>
      </div>

      <section className="relative bg-[#d8e9e9] overflow-hidden py-20">
        {/* 上面的Wave */}
        <div className="absolute top-0 left-0 w-full leading-0">
          <svg
            className="relative block w-full h-[100px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64L60,85.3C120,107,240,149,360,160C480,171,600,149,720,122.7C840,96,960,64,1080,90.7C1200,117,1320,203,1380,245.3L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>

        {/* 中間主要內容 */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#6c5b4c]">
            Dressing Guide
          </h2>

          {/* 這裡放你的格子卡片，像是服裝Tips那三個方塊 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className=" rounded-2xl  p-6 text-center">
              <img
                src={img4}
                alt="Dress"
                className="w-full h-[70%] mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Dressing Tips</h3>

              <p className="text-sm">
                Tips for dressing with a white top and narrow bottom.
              </p>
            </div>
            {/* Card 2 */}
            <div className=" rounded-2xl  p-6 text-center">
              <img
                src={img5}
                alt="Dress"
                className="w-full h-[70%] mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Clothing Color</h3>
              <p className="text-sm">No more than 3 colors on the body.</p>
            </div>
            {/* Card 3 */}
            <div className=" rounded-2xl  p-6 text-center">
              <img
                src={img6}
                alt="Dress"
                className="w-full h-[70%] mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Clothes Pattern</h3>
              <p className="text-sm">
                Mixing plain and printed elements carefully.
              </p>
            </div>
          </div>
        </div>

        {/* 下面的Wave */}
        <div className="absolute bottom-0 left-0 w-full leading-0 rotate-180">
          <svg
            className="relative block w-full h-[100px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64L60,85.3C120,107,240,149,360,160C480,171,600,149,720,122.7C840,96,960,64,1080,90.7C1200,117,1320,203,1380,245.3L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      <div className="md:col-span-4">
        <CategoryScroll />
      </div>

      {/* Product section with 3-column grid layout */}
      <section className="py-16">
        {/* 標題 */}
        <h2 className="text-3xl font-semibold text-center mb-12 text-[#6c5b4c] italic">
          Recommend
        </h2>

        {/* 卡片容器 */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {/* 卡片 1 */}
          <div className="relative flex flex-col items-center">
            {/* 頭像 */}
            <div className="absolute -top-2 w-16 h-16 bg-white rounded-full border-2  border-brown-500 flex items-center justify-center">
              {/* 這裡可以放你的圖片或icon */}
              <img
                src="/path-to-avatar1.png"
                alt="avatar"
                className="w-8 h-8 object-cover"
              />
            </div>

            {/* 卡片本體 */}
            <div className="mt-8 w-full bg-[#c9d8b7] rounded-lg flex items-center justify-center h-32">
              <span className="text-white text-lg italic">Photo</span>
            </div>
          </div>

          {/* 卡片 2 */}
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-2 w-16 h-16 bg-white rounded-full border-2  border-brown-500 flex items-center justify-center">
              <img
                src="/path-to-avatar2.png"
                alt="avatar"
                className="w-8 h-8 object-cover"
              />
            </div>
            <div className="mt-8 w-full bg-[#c9d8b7] rounded-lg flex items-center justify-center h-32">
              <span className="text-white text-lg italic">Photo</span>
            </div>
          </div>

          {/* 卡片 3 */}
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-2 w-16 h-16 bg-white rounded-full border-2  border-brown-500 flex items-center justify-center">
              <img
                src="/path-to-avatar3.png"
                alt="avatar"
                className="w-8 h-8 object-cover"
              />
            </div>
            <div className="mt-8 w-full bg-[#c9d8b7] rounded-lg flex items-center justify-center h-32">
              <span className="text-white text-lg italic">Photo</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
