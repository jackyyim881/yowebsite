import BannerSlider from "./BannerSlider";
import CategoryScroll from "./CategoryScroll";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import img1 from "../img2/img1.png";
import img3 from "../img2/img3.png";
import img4 from "../img2/cloth.png";
import img7 from "../img2/mental-health.jpg";
import avatar1 from "../img2/avatars/avatar1.jpg";
import avatar2 from "../img2/avatars/avatar2.jpg";
import avatar3 from "../img2/avatars/avatar3.jpg";
import img5 from "../img2/cloth2.png";
import img6 from "../img2/cloth3.png";
import Wave from "./Wave";
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
    <div className="gap-8 px-2 md:px-0 text-[#6c5b4c] w-full">
      <div className="max-w-7xl mx-auto">
        <div className="md:col-span-4">
          <BannerSlider />
        </div>
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
      </div>
      <section className="relative py-20 bg-white">
        {/* Wave is INSIDE the container, not out of position */}
        <div className="relative max-w-7xl mx-auto px-6">
          <div
            className="w-full pointer-events-none"
            style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          >
            <Wave />
          </div>
          <div className="relative z-10 pt-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#6c5b4c]">
              Dressing Guide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="rounded-2xl p-6 text-center">
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
              <div className="rounded-2xl p-6 text-center">
                <img
                  src={img5}
                  alt="Dress"
                  className="w-full h-[70%] mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Clothing Color</h3>
                <p className="text-sm">No more than 3 colors on the body.</p>
              </div>
              {/* Card 3 */}
              <div className="rounded-2xl p-6 text-center">
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
        </div>
      </section>
      <div className="max-w-7xl mx-auto z-20">
        <div className="md:col-span-4 ">
          <CategoryScroll />
        </div>
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
                <h3 className="text-[#644632] font-medium text-lg text-center mt-2">
                  Eric's Pick
                </h3>
                <p className="text-[#6c5b4c] text-center text-sm mt-1">
                  Sustainable fashion specialist
                </p>

                {/* Star rating */}
                <div className="flex justify-center mt-2 text-[#e6a94e]">
                  <StarRating rating={4.5} />
                </div>

                <div className="mt-4 bg-white/80 rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-[#644632] italic">
                    "The perfect balance of comfort and style, this piece is a
                    must-have for any wardrobe."
                  </p>
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
                <h3 className="text-[#644632] font-medium text-lg text-center mt-2">
                  Alex's Choice
                </h3>
                <p className="text-[#6c5b4c] text-center text-sm mt-1">
                  Personal stylist
                </p>

                {/* Star rating */}
                <div className="flex justify-center mt-2 text-[#e6a94e]">
                  <StarRating rating={4.5} />
                </div>

                <div className="mt-4 bg-white/80 rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-[#644632] italic">
                    "Versatile and timeless, this design works for both casual
                    and semi-formal occasions."
                  </p>
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
                <h3 className="text-[#644632] font-medium text-lg text-center mt-2">
                  Emma's Favorite
                </h3>
                <p className="text-[#6c5b4c] text-center text-sm mt-1">
                  Fashion blogger
                </p>

                {/* Star rating */}
                <div className="flex justify-center mt-2 text-[#e6a94e]">
                  <StarRating rating={4.5} />
                </div>

                <div className="mt-4 bg-white/80 rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-[#644632] italic">
                    "I love how this piece can be layered in so many different
                    ways for any season."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
