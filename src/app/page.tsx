"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Play, Star, TrendingUp, Users, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useMemo } from "react";

// Dynamic imports for better performance
const BusinessGrowthChart = dynamic(
  () => import("@/components/3d/BusinessGrowthChart"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[500px] bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-blue-900/20 rounded-2xl">
        <div className="text-white/60">Loading 3D Chart...</div>
      </div>
    ),
  }
);

const MorphingContactForm = dynamic(
  () => import("@/components/forms/MorphingContactForm"),
  {
    ssr: false,
  }
);

const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
  {
    ssr: false,
  }
);

const ClientSuccessTimeline = dynamic(
  () => import("@/components/timeline/ClientSuccessTimeline"),
  {
    ssr: false,
  }
);

const ThemeSwitcher = dynamic(
  () =>
    import("@/components/theme-switcher").then((mod) => ({
      default: mod.ThemeSwitcher,
    })),
  {
    ssr: false,
  }
);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  // Memoize particles for better performance - reduced from 100 to 30
  const backgroundParticles = useMemo(
    () =>
      [...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-30"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: `linear-gradient(45deg, ${
              ["#10b981", "#06b6d4", "#3b82f6", "#0ea5e9", "#14b8a6"][
                Math.floor(Math.random() * 5)
              ]
            }, ${
              ["#06b6d4", "#3b82f6", "#0ea5e9", "#14b8a6", "#22c55e"][
                Math.floor(Math.random() * 5)
              ]
            })`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )),
    []
  );

  // Memoize floating shapes - reduced from 15 to 8
  const floatingShapes = useMemo(
    () =>
      [...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          animate={{
            rotate: [0, 360],
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <div
            className="w-6 h-6 border border-white/10 backdrop-blur-sm"
            style={{
              borderRadius: Math.random() > 0.5 ? "50%" : "0%",
              background: `linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))`,
            }}
          />
        </motion.div>
      )),
    []
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-blue-900 relative overflow-hidden"
    >
      {/* Optimized animated background particles */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: backgroundY }}
      >
        {backgroundParticles}
      </motion.div>

      {/* Optimized floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingShapes}
      </div>

      {/* Enhanced Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-900/90 via-teal-900/90 to-blue-900/90 backdrop-blur-xl border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center"
            >
              <Zap className="w-5 h-5 text-white" />
            </motion.div>
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              ConsultPro
            </div>
          </motion.div>

          <div className="flex items-center gap-6">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex items-center gap-6"
            >
              {["Services", "Process", "About", "Contact"].map(
                (item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-white/80 hover:text-transparent hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 hover:bg-clip-text transition-all duration-300 relative"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                )
              )}
            </motion.nav>

            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-16 px-4 relative">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div className="flex-1 relative" style={{ y: textY }}>
              {/* Stats floating cards */}
              <motion.div
                className="absolute -top-10 -left-10 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-sm font-bold text-white">+250%</div>
                    <div className="text-xs text-white/70">Growth Rate</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-5 -right-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-sm font-bold text-white">500+</div>
                    <div className="text-xs text-white/70">Happy Clients</div>
                  </div>
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl font-extrabold tracking-tight lg:text-7xl mb-6 bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                Transform Your
                <motion.span
                  className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Business
                </motion.span>
                with Data-Driven Insights
              </motion.h1>

              <motion.p
                className="text-xl text-white/70 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Our consulting services help businesses optimize operations,
                increase revenue, and achieve sustainable growth through
                innovative strategies and cutting-edge analytics.
              </motion.p>

              {/* Enhanced CTA buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.a
                  href="#contact"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(16, 185, 129, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-center shadow-xl overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Get Started</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                    </motion.div>
                  </span>
                </motion.a>

                <motion.a
                  href="#demo"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.15)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group border border-white/30 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-center flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Watch Demo</span>
                </motion.a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                className="flex items-center space-x-6 text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                  <span className="ml-2 text-sm">4.9/5 from 500+ reviews</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex-1 h-[500px] w-full relative"
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
            >
              {/* Decorative elements around the chart */}
              <motion.div
                className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <BusinessGrowthChart />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4">
        <ServicesSection />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="container mx-auto">
          {/* Team Section */}
          <motion.div
            className="max-w-6xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center mb-16"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-teal-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white/80">
                  Meet Our Team
                </span>
              </motion.div>

              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Expert Consultants
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Our team of seasoned professionals brings decades of experience
                across industries to help transform your business.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Senior Strategy Consultant",
                  experience: "15+ years",
                  speciality: "Digital Transformation",
                  image: "/images/team/sarah.jpg",
                  color: "#10b981",
                },
                {
                  name: "Michael Chen",
                  role: "Operations Director",
                  experience: "12+ years",
                  speciality: "Process Optimization",
                  image: "/images/team/michael.jpg",
                  color: "#06b6d4",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Data Analytics Lead",
                  experience: "10+ years",
                  speciality: "Business Intelligence",
                  image: "/images/team/emily.jpg",
                  color: "#3b82f6",
                },
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    type: "spring",
                  }}
                  viewport={{ once: true }}
                >
                  {/* Background gradient overlay */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}20, ${member.color}10)`,
                    }}
                  />

                  {/* Profile image placeholder */}
                  <motion.div
                    className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="w-8 h-8 text-white/50" />
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                      style={{ background: member.color }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <div className="text-center relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-teal-400 font-medium mb-2">
                      {member.role}
                    </p>
                    <div className="flex justify-center space-x-4 text-sm text-white/60 mb-3">
                      <span>{member.experience}</span>
                      <span>•</span>
                      <span>{member.speciality}</span>
                    </div>

                    <motion.div
                      className="flex justify-center space-x-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.6 + i * 0.1 }}
                        >
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center mb-16"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Star className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-white/80">
                  Client Testimonials
                </span>
              </motion.div>

              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                What Our Clients Say
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our clients have to
                say about their transformation journey with ConsultPro.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "David Thompson",
                  company: "TechFlow Solutions",
                  role: "CEO",
                  testimonial:
                    "ConsultPro transformed our operations completely. We saw a 300% increase in efficiency within 6 months.",
                  rating: 5,
                  image: "/images/testimonials/david.jpg",
                  results: "+300% Efficiency",
                },
                {
                  name: "Lisa Wang",
                  company: "GreenTech Innovations",
                  role: "Founder",
                  testimonial:
                    "The strategic insights provided by ConsultPro helped us scale from startup to market leader.",
                  rating: 5,
                  image: "/images/testimonials/lisa.jpg",
                  results: "10x Growth",
                },
                {
                  name: "Robert Martinez",
                  company: "Global Manufacturing Corp",
                  role: "Operations Director",
                  testimonial:
                    "Outstanding results! Their data-driven approach revolutionized our decision-making process.",
                  rating: 5,
                  image: "/images/testimonials/robert.jpg",
                  results: "+250% ROI",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 overflow-hidden"
                  initial={{ opacity: 0, y: 50, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                    rotateY: 5,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    type: "spring",
                  }}
                  viewport={{ once: true }}
                >
                  {/* Floating quote mark */}
                  <motion.div
                    className="absolute top-4 right-4 text-6xl text-white/10 font-serif"
                    animate={{
                      rotate: [0, 10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    "
                  </motion.div>

                  {/* Results badge */}
                  <motion.div
                    className="absolute top-4 left-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                  >
                    <span className="text-xs font-medium text-green-400">
                      {testimonial.results}
                    </span>
                  </motion.div>

                  <div className="relative z-10 pt-8">
                    {/* Rating stars */}
                    <motion.div
                      className="flex justify-center mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: 180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: index * 0.2 + 0.4 + i * 0.1,
                            type: "spring",
                          }}
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mx-0.5" />
                        </motion.div>
                      ))}
                    </motion.div>

                    <p className="text-white/80 mb-6 leading-relaxed italic">
                      "{testimonial.testimonial}"
                    </p>

                    <div className="flex items-center space-x-3">
                      {/* Profile image placeholder */}
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Users className="w-5 h-5 text-white/50" />
                      </motion.div>

                      <div>
                        <h4 className="font-semibold text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-teal-400">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        id="timeline"
        className="py-16 px-4 bg-gradient-to-br from-blue-900/20 via-teal-900/20 to-emerald-900/20 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5" />
        <ClientSuccessTimeline />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-xl text-white/70">
              Ready to transform your business? Contact us today for a free
              consultation.
            </p>
          </motion.div>

          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MorphingContactForm />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-900/50 via-teal-900/50 to-blue-900/50 backdrop-blur-md py-12 px-4 border-t border-white/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                ConsultPro
              </div>
              <p className="text-sm text-white/60">
                Transforming businesses with data-driven insights
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h4 className="font-medium mb-3 text-white">Services</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      Market Analysis
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      Strategic Planning
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      Team Development
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-white">Company</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-white">Legal</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/20 text-center text-sm text-white/60">
            © {new Date().getFullYear()} ConsultPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
