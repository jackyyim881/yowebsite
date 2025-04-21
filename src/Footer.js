import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-10 pb-6 mt-16">
      <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-white font-semibold mb-4">Popular Categories</h4>
          <ul className="space-y-2 text-sm">
            {["Fashion", "Electronic", "Cosmetic", "Health", "Watches"].map(
              (item) => (
                <li key={item}>
                  <a href="/fashion" className="hover:text-white">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Our Company</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Delivery",
              "Legal Notice",
              "Terms & Conditions",
              "About Us",
              "Secure Payment",
            ].map((item) => (
              <li key={item}>
                <button className="hover:text-white underline bg-transparent border-none p-0 cursor-pointer">
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <p className="text-sm leading-relaxed mb-2">
            419 State 414 Rte Beaver Dams, NY 14812, USA
          </p>
          <p className="text-sm mb-2">(607) 936‑8058</p>
          <p className="text-sm mb-4">example@gmail.com</p>
          <div className="flex gap-3 text-xl text-gray-400">
            {["facebook", "twitter", "linkedin", "instagram"].map((soc) => (
              <a
                key={soc}
                href={`/${soc}`}
                className="hover:text-white capitalize"
              >
                {soc}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} Anon – All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
