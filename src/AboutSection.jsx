import React from "react";
import photo1 from "./img2/bg.png"; // 請用你的圖片路徑
import logo from "./img/images.png"; // 請用你的圖片路徑
const AboutSection = () => {
  return (
    <section className="about-section bg-[#f9ecdf] min-h-screen py-10">
      <img
        src={photo1}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="max-w-5xl mx-auto px-4">
        {/* 標題 */}
        <div className="text-center mb-10">
          <img src={logo} alt="Logo" className="w-full mx-auto mb-4" />
          <div className="text-xl italic text-[#e97e6a] mb-4">Real.Raw.You</div>
        </div>

        {/* Our Story */}
        <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
          <div className="flex-1">
            <img
              src={photo1}
              alt="Our Story"
              className="w-full rounded-xl shadow-lg object-cover h-64 bg-[#b98c6a]"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-[#6c5b4c] mb-2">
              Our Story
            </h3>
            <p className="text-[#6c5b4c] leading-relaxed">
              UNFILTERED was born from a reflection on contemporary fashion
              culture. In a world saturated with fast fashion and homogenous
              styling, we saw too many people trapped on the treadmill of
              trends, forgetting the original purpose of fashion: to express
              your authentic self.
              <br />
              <br />
              We created this platform with a simple intention: to help everyone
              find their most genuine, raw, and true-to-themselves style of
              expression.
            </p>
          </div>
        </div>

        {/* Our Beliefs */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-12 gap-8">
          <div className="flex-1">
            <img
              src={photo1}
              alt="Our Beliefs"
              className="w-full rounded-xl shadow-lg object-cover h-64 bg-[#b98c6a]"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-[#6c5b4c] mb-2">
              Our Beliefs
            </h3>
            <p className="text-[#6c5b4c] leading-relaxed">
              At UNFILTERED, we believe: There is no "right" style, only the
              most genuine you.
              <br />
              <br />
              One piece that accompanies you for years outshines the seasonal
              trend items. The most enduring style comes from understanding
              yourself, not following trends.
              <br />
              <br />
              Choosing secondhand is not just a style decision; it's a
              commitment to our planet.
            </p>
          </div>
        </div>

        {/* Why UNFILTERED */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <img
              src={photo1}
              alt="Why UNFILTERED"
              className="w-full rounded-xl shadow-lg object-cover h-64 bg-[#b98c6a]"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-[#6c5b4c] mb-2">
              Why UNFILTERED?
            </h3>
            <p className="text-[#6c5b4c] leading-relaxed">
              UNFILTERED isn’t just a secondhand fashion platform; it’s a
              journey of style awakening. Our proprietary psychological
              assessment helps you go beyond surface preferences to uncover your
              true style inclinations.
              <br />
              <br />
              We highlight materials, craftsmanship, and durability, making
              quality the core of your choices. Here, every style expression is
              respected, with no distinction between mainstream and alternative.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
