import React, { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

// Animated card background effect
const CardBackground = () => (
  <motion.div
    className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-200/50 via-transparent to-yellow-100/50 rounded-md"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: 1,
      scale: 1,
      background: [
        "linear-gradient(45deg, rgba(254,205,211,0.2) 0%, rgba(255,255,255,0) 50%, rgba(254,240,138,0.2) 100%)",
        "linear-gradient(190deg, rgba(254,205,211,0.3) 0%, rgba(255,255,255,0) 50%, rgba(254,240,138,0.3) 100%)",
        "linear-gradient(320deg, rgba(254,205,211,0.2) 0%, rgba(255,255,255,0) 50%, rgba(254,240,138,0.2) 100%)",
      ],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
);

// Floating dots decoration
const FloatingDots = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-pink-400/30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          x: [0, Math.random() * 50 - 25],
          y: [0, Math.random() * 50 - 25],
          scale: [0.5, Math.random() * 0.5 + 0.5, 0.5],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Animated text title
const AnimatedTitle = ({ text }) => (
  <motion.div className="relative overflow-hidden">
    <motion.span
      className="inline-block"
      initial={{ y: 40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
    >
      {text}
    </motion.span>
  </motion.div>
);

export default function BlogSection({ posts = [] }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px 0px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(255,245,238,0)", "rgba(255,245,238,1)", "rgba(255,245,238,0)"]
  );

  if (!posts.length) return null;

  return (
    <motion.section
      ref={sectionRef}
      className="py-20 relative"
      style={{ backgroundColor }}
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute inset-0 -z-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-yellow-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

      <FloatingDots />

      <div className="max-w-6xl mx-auto px-4 text-[#644632] relative">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-semibold flex items-baseline gap-2">
            <AnimatedTitle text="Latest Blog Posts" />
            <motion.span
              className="block h-2 w-2 rounded-full bg-pink-500"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </h2>

          <Link
            to="/blog"
            className="group flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600 relative pl-2"
          >
            <motion.span
              className="absolute inset-y-0 left-0 w-0.5 bg-pink-300"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.5 }}
            />
            <span>View all</span>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 pb-2"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {posts.map((p, index) => (
            <motion.div
              key={p.id}
              className="relative bg-white rounded-md shadow-lg overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, type: "spring" },
                },
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              onHoverStart={() => setHoveredCard(p.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <CardBackground />

              <Link to={`/blog/${p.id}`} className="block overflow-hidden">
                <motion.div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    whileHover={{
                      scale: 1.08,
                      transition: { duration: 0.5 },
                    }}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === p.id ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>

              <motion.div
                className="p-5 space-y-3"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <AnimatePresence>
                  {hoveredCard === p.id && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "40%" }}
                      exit={{ width: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-0.5 bg-gradient-to-r from-pink-500 to-transparent mb-2"
                    />
                  )}
                </AnimatePresence>

                <Link
                  to={`/blog/category/${p.category}`}
                  className="text-xs uppercase tracking-wider text-[#644632]/80 font-medium hover:text-pink-600 transition-colors"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  >
                    {p.category}
                  </motion.span>
                </Link>

                <h3 className="text-md font-semibold leading-tight min-h-[48px]">
                  <Link
                    to={`/blog/${p.id}`}
                    className="hover:text-pink-600 transition-colors"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                    >
                      {p.title}
                    </motion.div>
                  </Link>
                </h3>

                <motion.p
                  className="text-xs text-[#644632]/80 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
                >
                  <span className="flex items-center">
                    By{" "}
                    <cite className="not-italic font-medium ml-1">
                      {p.author}
                    </cite>
                  </span>
                  <motion.span
                    className="inline-block w-1 h-1 rounded-full bg-pink-400"
                    animate={{
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                  <span>{p.date}</span>
                </motion.p>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-yellow-300"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
