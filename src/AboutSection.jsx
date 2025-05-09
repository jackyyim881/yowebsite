import React, { useRef, useState, useEffect, Suspense } from "react";
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
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import {
  OrbitControls,
  useTexture,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import worldMapTexture from "./img/images1.png"; // You'll need to add this texture

const GlobeComponent = ({ mousePosition, scrollProgress }) => {
  const meshRef = useRef();
  const groupRef = useRef();

  // Create a distortion effect that responds to scroll
  const distortionFactor = useTransform(scrollProgress, [0, 1], [0.3, 0.6]);
  const distortionValue = useSpring(distortionFactor);

  // Load map texture
  const texture = useTexture(worldMapTexture);

  // Animate the globe rotation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Base rotation animation
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;

      // Add some organic movement
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;

      // React to mouse position for interactive feel
      if (mousePosition.x && mousePosition.y) {
        // Subtle tilt based on mouse
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mousePosition.y * 0.001 - 0.2,
          0.05
        );

        groupRef.current.rotation.z = THREE.MathUtils.lerp(
          groupRef.current.rotation.z,
          mousePosition.x * 0.0005,
          0.05
        );
      }
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        {/* Main globe sphere */}
        <sphereGeometry args={[2, 64, 64]} />
        <MeshDistortMaterial
          color="#f9ecdf"
          attach="material"
          distort={distortionValue.get()}
          speed={2}
          roughness={0.7}
          metalness={0.1}
          map={texture}
          transparent={true}
          opacity={0.9}
        >
          <primitive attach="map" object={texture} />
        </MeshDistortMaterial>
      </mesh>

      {/* Outer glow effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial
          color="#e97e6a"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Connection points for global network visual */}
      {[...Array(8)].map((_, i) => {
        // Calculate points around the globe
        const angle = (i / 8) * Math.PI * 2;
        const radiusVariation = 2 + Math.random() * 0.2;
        const x = Math.sin(angle) * radiusVariation;
        const z = Math.cos(angle) * radiusVariation;
        const y = (Math.random() - 0.5) * 3.5;

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#e97e6a" />
          </mesh>
        );
      })}

      {/* Fashion trend lines connecting points */}
      <LineConnections />
    </group>
  );
};

// Create flowing connection lines between points
const LineConnections = () => {
  const points = [];

  // Create connection points
  for (let i = 0; i < 6; i++) {
    const angle1 = Math.random() * Math.PI * 2;
    const angle2 = Math.random() * Math.PI * 2;

    const x1 = Math.sin(angle1) * 2;
    const z1 = Math.cos(angle1) * 2;
    const y1 = (Math.random() - 0.5) * 3;

    const x2 = Math.sin(angle2) * 2;
    const z2 = Math.cos(angle2) * 2;
    const y2 = (Math.random() - 0.5) * 3;

    points.push(new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2));
  }

  const lineRef = useRef();

  // Animate the line opacity
  useFrame(({ clock }) => {
    if (lineRef.current) {
      lineRef.current.material.opacity =
        (Math.sin(clock.getElapsedTime() * 0.5) + 1) * 0.2 + 0.2;

      // Slowly change line positions for fluid movement
      lineRef.current.geometry.verticesNeedUpdate = true;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          array={new Float32Array(points.flatMap((v) => [v.x, v.y, v.z]))}
          count={points.length}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        attach="material"
        color="#e97e6a"
        linewidth={1}
        transparent
        opacity={0.4}
        linecap="round"
        linejoin="round"
      />
    </line>
  );
};

// Scene with camera and controls
const GlobeScene = ({ mousePosition, scrollProgress }) => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <Suspense fallback={null}>
        <GlobeComponent
          mousePosition={mousePosition}
          scrollProgress={scrollProgress}
        />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
};
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
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      scrollYProgress.set(scrollPercent);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollYProgress]);

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

      {/* Chaotic background elements (unchanged) */}
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
        className="absolute inset-0 w-full h-full object-cover opacity-15"
        style={{ y: backgroundY }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 2 }}
      />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Title with liquid animation effect and 3D Globe */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.img
                src={logo}
                alt="Logo"
                className="w-40 mx-auto mb-8 drop-shadow-2xl md:mx-0"
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
                className="w-40 h-1 bg-gradient-to-r from-transparent via-[#e97e6a] to-transparent mx-auto mt-4 md:mx-0"
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

              <motion.p
                className="text-[#6c5b4c] mt-6 text-left hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <AnimatedText
                  text="Our global community reimagines fashion through authenticity and self-expression beyond borders."
                  className="text-lg"
                />
              </motion.p>
            </div>

            {/* 3D Globe Visualization */}
            <motion.div
              className="h-[400px] relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
            >
              {/* Interactive labels that appear on globe hover */}
              <AnimatePresence>
                {inView && (
                  <>
                    <motion.div
                      className="absolute top-[20%] left-[15%] z-10 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg pointer-events-none"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2 }}
                    >
                      <p className="text-xs text-[#e97e6a] font-medium">
                        Global Styles
                      </p>
                    </motion.div>

                    <motion.div
                      className="absolute bottom-[30%] right-[20%] z-10 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg pointer-events-none"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.3 }}
                    >
                      <p className="text-xs text-[#e97e6a] font-medium">
                        Sustainable Networks
                      </p>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* The 3D Globe */}
              <div className="w-full h-full">
                <GlobeScene
                  mousePosition={mousePosition}
                  scrollProgress={scrollYProgress}
                />
              </div>

              {/* Decorative moving particle streams */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-1 bg-gradient-to-r from-transparent via-[#e97e6a] to-transparent rounded-full"
                    style={{
                      width: Math.random() * 60 + 40,
                      left: `${Math.random() * 70 + 15}%`,
                      top: `${Math.random() * 70 + 15}%`,
                      opacity: 0.4,
                    }}
                    animate={{
                      x: [0, Math.random() * 100 - 50],
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Mobile description */}
            <motion.p
              className="text-[#6c5b4c] mt-6 text-center md:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatedText
                text="Our global community reimagines fashion through authenticity and self-expression."
                className="text-base"
              />
            </motion.p>
          </div>
        </motion.div>

        {/* Content Sections - keep existing implementation */}
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
              {/* Existing content - unchanged */}
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
