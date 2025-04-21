import { useEffect, useState, useMemo } from "react";
import { Button } from "./ui/Button";
import banner1 from "../img/banner-1.jpg";
import banner2 from "../img/banner-2.jpg";
import banner3 from "../img/banner-3.jpg";

const BANNERS = [
  {
    id: 1,
    img: banner1,
    title: "Stylish Summer Collection",
    subtitle: "New Arrivals",
    price: 29.99,
  },
  {
    id: 2,
    img: banner2,
    title: "Winter Sale",
    subtitle: "Up to 50% Off",
    price: 19.99,
  },
  {
    id: 3,
    img: banner3,
    title: "Exclusive Deals",
    subtitle: "Limited Time Offer",
    price: 39.99,
  },
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BANNERS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentBanner = useMemo(() => BANNERS[index], [index]);

  return (
    <section className="my-6" aria-label="Promotional Banners">
      <div className="relative w-full overflow-hidden h-80">
        {BANNERS.map((b, i) => (
          <div
            key={b.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={i !== index}
          >
            <img
              src={b.img}
              alt={b.title}
              className="w-full h-80 object-cover object-center"
              loading={i === index ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-white/70 flex flex-col justify-center items-start p-8 md:max-w-md gap-2">
              <span className="text-pink-500 uppercase tracking-wider text-xs font-semibold">
                {b.subtitle}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                {b.title}
              </h2>
              <p className="text-sm text-gray-600">
                starting at <b>${b.price.toFixed(2)}</b>
              </p>
              <Button className="mt-2 uppercase text-xs">Shop now</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
