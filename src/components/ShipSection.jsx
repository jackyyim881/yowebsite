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
    <section
      id="ship"
      className="py-16"
      style={{ backgroundColor: "#fff5eb" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Banner */}
        <div
          className="text-white text-center py-12 rounded-lg mb-12"
          style={{
            background: "linear-gradient(90deg, #bedcdc 0%, #b8c8a0 100%)",
            color: "#644632",
          }}
        >
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "#644632" }}
          >
            <span
              style={{
                backgroundColor: "",
                borderRadius: "0.5rem",
                padding: "0 0.5rem",
                color: "#644632",
              }}
            >
              Fast & Reliable Shipping
            </span>
          </h1>
          <p style={{ color: "#644632" }}>
            At
            <span
              style={{
                backgroundColor: "",
                borderRadius: "0.25rem",
                padding: "0 0.3rem",
                color: "#644632",
              }}
            >
              Anon
            </span>{" "}
            we make sure every order reaches you quickly and safely.
          </p>
        </div>

        {/* 6 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {shipCards.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-6 text-center rounded-lg shadow hover:shadow-lg transition"
              style={{
                backgroundColor: "#bedcdc",
                color: "#644632",
                border: "1px solid #b8c8a0",
              }}
            >
              <Icon className="w-10 h-10 mx-auto mb-4" color="black" />
              <h3
                className="font-semibold mb-2"
                style={{ color: "#644632" }}
              >
                {title}
              </h3>
              <p className="text-sm" style={{ color: "#644632" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Shipping calculator */}
        <div
          className="p-8 rounded-lg mb-12"
          style={{ backgroundColor: "#ffc3c3" }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#644632" }}
          >
            Estimate Shipping Cost
          </h2>
          <form
            className="grid sm:grid-cols-[1fr_1fr_auto] gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <select
              defaultValue="usa"
              className="w-full border rounded px-3 py-2 focus:outline-none"
              style={{
                borderColor: "#b8c8a0",
                backgroundColor: "#fff5eb",
                color: "#644632",
              }}
            >
              <option value="usa">United States</option>
              <option value="canada">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="australia">Australia</option>
            </select>
            <input
              placeholder="Zip / Postal Code"
              className="w-full border rounded px-3 py-2 focus:outline-none"
              style={{
                borderColor: "#b8c8a0",
                backgroundColor: "#fff5eb",
                color: "#644632",
              }}
            />
            <button
              type="button"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium shadow transition-colors"
              style={{
                backgroundColor: "#b8c8a0",
                color: "#644632",
                border: "1px solid #644632",
              }}
            >
              Calculate
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div>
          <h2
            className="text-xl font-semibold mb-6"
            style={{ color: "#644632" }}
          >
            FAQ
          </h2>
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
            <div
              key={q}
              className="border-b py-4"
              style={{ borderColor: "#b8c8a0" }}
            >
              <p
                className="font-semibold mb-2"
                style={{
                  color: "#644632",
                  backgroundColor: "",
                  display: "inline-block",
                  borderRadius: "0.25rem",
                  padding: "0 0.4rem",
                }}
              >
                {q}
              </p>
              <p className="text-sm" style={{ color: "#644632" }}>
                {a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
