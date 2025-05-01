import BannerSlider from "./BannerSlider";
import CategoryScroll from "./CategoryScroll";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import img1 from "../img2/img1.png";
import img2 from "../img2/img2.png";
import img3 from "../img2/img3.png";
import img4 from "../img2/cloth.png";
import img7 from "../img2/mental-health.jpg";
import avatar1 from "../img2/avatars/avatar1.jpg";
import avatar2 from "../img2/avatars/avatar2.jpg";
import avatar3 from "../img2/avatars/avatar3.jpg";
import img5 from "../img2/cloth2.png";
import img6 from "../img2/cloth3.png";
// Create a Home component for your main landing page
export default function Home() {
  // A reusable star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex justify-center mt-2 text-[#e6a94e]">
        {[...Array(5)].map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return <FaStar key={i} />;
          } else if (roundedRating - i === 0.5) {
            return <FaStarHalfAlt key={i} />;
          } else {
            return <FaRegStar key={i} />;
          }
        })}
        <span className="text-xs text-[#6c5b4c] ml-2 mt-1">{rating}/5</span>
      </div>
    );
  };
  return (
    <div className="gap-8 px-2 md:px-0 text-[#6c5b4c] max-w-7xl mx-auto w-full">
      <div className="md:col-span-4">
        <BannerSlider />
      </div>

      {/* 👇加了 md:col-span-4，讓這個區塊橫跨四欄！ */}
      <div className="grid grid-cols-2 w-full md:col-span-4">
        <div className="bg-beige p-4 ">
          <img
            src={img7}
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
      <section className="py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12 text-[#6c5b4c] italic">
          Recommend
        </h2>

        {/* Responsive card grid with better spacing for mobile */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-4">
          {/* Card 1 - With profile image */}
          <div className="relative flex flex-col items-center">
            {/* Profile image */}
            <div className="absolute -top-10 w-20 h-20 rounded-full border-4 border-[#c9d8b7] bg-white shadow-md z-10">
              <img
                src={avatar1}
                alt="Eric profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className=" w-full bg-gradient-to-br from-[#c9d8b7] to-[#d8e9e9] rounded-xl shadow-md p-4 pt-8">
              <h3 className="text-[#644632] font-medium text-lg text-center mt-2">Eric's Pick</h3>
              <p className="text-[#6c5b4c] text-center text-sm mt-1">Sustainable fashion specialist</p>

              {/* Star rating */}
              <div className="flex justify-center mt-2 text-[#e6a94e]">
                <StarRating rating={4.5} />
              </div>

              <div className="mt-4 bg-white/80 rounded-lg p-3 shadow-sm">
                <p className="text-sm text-[#644632] italic">"The perfect balance of comfort and style, this piece is a must-have for any wardrobe."</p>
              </div>
            </div>
          </div>

          {/* Card 2 - With profile image */}
          <div className="relative flex flex-col items-center">
            {/* Profile image */}
            <div className="absolute -top-10 w-20 h-20 rounded-full border-4 border-[#c9d8b7] bg-white shadow-md z-10">
              <img
                src={avatar2}
                alt="Alex profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className=" w-full bg-gradient-to-br from-[#c9d8b7] to-[#d8e9e9] rounded-xl shadow-md p-4 pt-8">
              <h3 className="text-[#644632] font-medium text-lg text-center mt-2">Alex's Choice</h3>
              <p className="text-[#6c5b4c] text-center text-sm mt-1">Personal stylist</p>

              {/* Star rating */}
              <div className="flex justify-center mt-2 text-[#e6a94e]">
                <StarRating rating={4.5} />

              </div>

              <div className="mt-4 bg-white/80 rounded-lg p-3 shadow-sm">
                <p className="text-sm text-[#644632] italic">"Versatile and timeless, this design works for both casual and semi-formal occasions."</p>
              </div>
            </div>
          </div>

          {/* Card 3 - With profile image */}
          <div className="relative flex flex-col items-center">
            {/* Profile image */}
            <div className="absolute -top-10 w-20 h-20 rounded-full border-4 border-[#c9d8b7] bg-white shadow-md z-10">
              <img
                src={avatar3}
                alt="Emma profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className=" w-full bg-gradient-to-br from-[#c9d8b7] to-[#d8e9e9] rounded-xl shadow-md p-4 pt-8">
              <h3 className="text-[#644632] font-medium text-lg text-center mt-2">Emma's Favorite</h3>
              <p className="text-[#6c5b4c] text-center text-sm mt-1">Fashion blogger</p>

              {/* Star rating */}
              <div className="flex justify-center mt-2 text-[#e6a94e]">
                <StarRating rating={4.5} />

              </div>

              <div className="mt-4 bg-white/80 rounded-lg p-3 shadow-sm">
                <p className="text-sm text-[#644632] italic">"I love how this piece can be layered in so many different ways for any season."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
