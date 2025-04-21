import React from "react";
import {
  Rocket,
  Timer,
  Wallet,
  MapPin,
  Globe,
  ShieldCheck,
} from "lucide-react";

const shipCards = [
  {
    icon: Rocket,
    title: "Shipping Methods",
    desc: "Standard, Express, Overnight.",
  },
  {
    icon: Timer,
    title: "Delivery Time",
    desc: "5‑7 days / 2‑3 days / Next‑day.",
  },
  { icon: Wallet, title: "Charges", desc: "Free over $50, else weight‑based." },
  { icon: MapPin, title: "Tracking", desc: "Realtime status after dispatch." },
  { icon: Globe, title: "International", desc: "We ship worldwide." },
  {
    icon: ShieldCheck,
    title: "Secure Packaging",
    desc: "Arrives in perfect condition.",
  },
];

export default function ShipSection() {
  return (
    <section id="ship" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-center py-12 rounded-lg mb-12">
          <h1 className="text-3xl font-bold mb-2">Fast & Reliable Shipping</h1>
          <p>
            At Anon we make sure every order reaches you quickly and safely.
          </p>
        </div>

        {/* 6 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {shipCards.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-6 text-center rounded-lg shadow hover:shadow-lg transition"
            >
              <Icon className="w-10 h-10 mx-auto text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>

        {/* Shipping calculator */}
        <div className="bg-gray-50 p-8 rounded-lg mb-12">
          <h2 className="text-xl font-semibold mb-4">Estimate Shipping Cost</h2>
          <form
            className="grid sm:grid-cols-[1fr_1fr_auto] gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <select
              defaultValue="usa"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="usa">United States</option>
              <option value="canada">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="australia">Australia</option>
            </select>
            <input
              placeholder="Zip / Postal Code"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-semibold mb-6">FAQ</h2>
          {[
            [
              "How can I track my package?",
              "A tracking number is emailed once your order ships, or view it in your account.",
            ],
            [
              "Lost / damaged package?",
              "Contact support right away – we’ll resolve it with the carrier.",
            ],
            [
              "Expedited shipping?",
              "Express and Overnight options at checkout (domestic only).",
            ],
            [
              "How are charges calculated?",
              "By weight, method and destination.",
            ],
          ].map(([q, a]) => (
            <div key={q} className="border-b py-4">
              <p className="font-semibold mb-2">{q}</p>
              <p className="text-sm text-gray-600">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
