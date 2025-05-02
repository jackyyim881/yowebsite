import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import photo1 from "./img2/bg.png";
import logo from "./img/images.png";

// Floating particles component
const FloatingParticles = ({ count = 30 }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-[#e97e6a] opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [0.5, Math.random() + 0.5, 0.5],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Text animation that reveals character by character
const AnimatedText = ({ text, className }) => {
  return (
    <motion.span className={`inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: index * 0.03,
            type: "spring",
            damping: 12,
            stiffness: 200,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// 3D card effect
const Card3D = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouse = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        perspective: 1000,
      }}
      className="relative w-full"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
        }}
        className="w-full"
      >
        {children}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl border-4 border-[#e97e6a30] transform translate-z-10"
          style={{ transform: "translateZ(40px)" }}
        />
      </motion.div>
    </motion.div>
  );
};

// Text glitch effect
const GlitchText = ({ text, className }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className={`relative ${className}`}>
      <span>{text}</span>
      {isGlitching && (
        <>
          <motion.span
            className="absolute left-0 top-0 text-[#00ffcc] mix-blend-difference"
            animate={{
              x: [0, -4, 2, -3, 0],
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute left-0 top-0 text-[#ff00cc] mix-blend-difference"
            animate={{
              x: [0, 4, -2, 3, 0],
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {text}
          </motion.span>
        </>
      )}
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const sections = [
    {
      key: "story",
      title: "Our Story",
      text: `UNFILTERED was born from a reflection on contemporary fashion
culture. In a world saturated with fast fashion and homogenous
styling, we saw too many people trapped on the treadmill of
trends, forgetting the original purpose of fashion: to express
your authentic self.\n\nWe created this platform with a simple intention: to help everyone
find their most genuine, raw, and true-to-themselves style of
expression.`,
      reverse: false,
    },
    {
      key: "beliefs",
      title: "Our Beliefs",
      text: `At UNFILTERED, we believe: There is no "right" style, only the
most genuine you.\n\nOne piece that accompanies you for years outshines the seasonal
trend items. The most enduring style comes from understanding
yourself, not following trends.\n\nChoosing secondhand is not just a style decision; it's a
commitment to our planet.`,
      reverse: true,
    },
    {
      key: "why",
      title: "Why UNFILTERED?",
      text: `UNFILTERED isn't just a secondhand fashion platform; it's a
journey of style awakening. Our proprietary psychological
assessment helps you go beyond surface preferences to uncover your
true style inclinations.\n\nWe highlight materials, craftsmanship, and durability, making
quality the core of your choices. Here, every style expression is
respected, with no distinction between mainstream and alternative.`,
      reverse: false,
    },
  ];

  // Parallax background effect
  const backgroundY = useTransform(useMotionValue(0), [0, 1], [0, -100]);

  return (
    <motion.section
      className="relative about-section bg-[#f9ecdf] min-h-screen py-10 overflow-hidden"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      ref={ref}
    >
      <FloatingParticles count={40} />

      {/* Chaotic background elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-[#e97e6a] to-[#b98c6a] opacity-10"
          style={{
            width: Math.random() * 400 + 100,
            height: Math.random() * 400 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(70px)",
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() + 0.5, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      <motion.img
        src={photo1}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        style={{ y: backgroundY }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 2 }}
      />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Title with liquid animation effect */}
        <motion.div className="text-center mb-20 relative">
          <motion.div
            className="absolute -inset-10 bg-gradient-to-r from-[#e97e6a20] to-[#b98c6a20] rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.img
            src={logo}
            alt="Logo"
            className="w-40 mx-auto mb-8 drop-shadow-2xl"
            whileHover={{
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.2, 0.8, 1.1, 1],
              transition: { duration: 1 },
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <GlitchText
            text="Real.Raw.You"
            className="text-3xl italic font-bold text-[#e97e6a] mb-4 inline-block tracking-wider"
          />

          <motion.div
            className="w-40 h-1 bg-gradient-to-r from-transparent via-[#e97e6a] to-transparent mx-auto mt-4"
            animate={{
              scaleX: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Content Sections with wild animations */}
        <AnimatePresence>
          {sections.map((sec, i) => (
            <motion.div
              key={sec.key}
              initial={{ opacity: 0, y: 100, rotateZ: sec.reverse ? 5 : -5 }}
              animate={{ opacity: 1, y: 0, rotateZ: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
                type: "spring",
                stiffness: 50,
              }}
              className={`flex flex-col md:flex-row ${
                sec.reverse ? "md:flex-row-reverse" : ""
              } items-center mb-32 gap-12 relative`}
            >
              {/* Decorative elements */}
              <motion.div
                className="absolute -z-10 rounded-full bg-[#e97e6a10] w-40 h-40 blur-3xl"
                style={{
                  left: sec.reverse ? "70%" : "20%",
                  top: "30%",
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="flex-1">
                <Card3D>
                  <motion.div
                    whileHover={{ filter: "brightness(1.1)" }}
                    className="relative overflow-hidden rounded-xl group"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-[#e97e6a50] to-[#b98c6a50] opacity-0 group-hover:opacity-70 transition-opacity duration-500 z-10" />

                    <img
                      src={photo1}
                      alt={sec.title}
                      className="w-full rounded-xl shadow-2xl object-cover h-72 transform transition-all duration-500 group-hover:scale-110"
                    />

                    <motion.div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="text-white text-xl font-semibold">
                        {sec.title}
                      </h4>
                    </motion.div>
                  </motion.div>
                </Card3D>
              </div>

              <div className="flex-1">
                <motion.div
                  initial={{ x: sec.reverse ? -50 : 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.3 + 0.5, duration: 0.8 }}
                >
                  <GlitchText
                    text={sec.title}
                    className="text-3xl font-bold text-[#6c5b4c] mb-6"
                  />

                  {sec.text.split("\n\n").map((paragraph, index) => (
                    <motion.p
                      key={index}
                      className="text-[#6c5b4c] leading-relaxed mb-4 relative overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: i * 0.3 + index * 0.2 + 0.8,
                        duration: 0.5,
                      }}
                    >
                      <AnimatedText text={paragraph} />

                      {/* Animated underline that follows cursor on hover */}
                      <motion.div
                        className="w-0 h-0.5 bg-[#e97e6a] absolute bottom-0 left-0"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.p>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default AboutSection;
