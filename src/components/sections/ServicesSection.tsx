"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Briefcase,
  LineChart,
  Users,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  image: string;
  stats: string;
  color: string;
}

const ServiceCard = ({
  icon,
  title,
  description,
  delay,
  image,
  stats,
  color,
}: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        z: 10,
      }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
      className="group relative bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-blue-500/10 p-6 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 border border-white/20 backdrop-blur-sm overflow-hidden"
      style={{ opacity, y }}
    >
      {/* Background gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Image section */}
      <motion.div
        className="relative h-48 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">{icon}</div>
        </div>
        {/* Placeholder for actual image */}
        <motion.div
          className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.5 }}
        >
          {stats}
        </motion.div>
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <motion.div
            className="p-3 rounded-xl mr-4 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}80)`,
            }}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {title}
            </h3>
            <motion.div
              className="flex items-center mt-1"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: delay + 0.3 }}
            >
              <div className="h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
            </motion.div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>

        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.4 }}
        >
          <motion.div
            className="flex items-center text-transparent bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text font-medium cursor-pointer"
            whileHover={{ x: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Learn more
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight size={16} className="ml-1 text-emerald-500" />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.1 }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-white/60">Premium</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Hover effect border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent"
        whileHover={{
          borderColor: color,
          boxShadow: `0 0 20px ${color}40`,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const services = [
    {
      icon: <BarChart3 className="text-white" size={24} />,
      title: "Market Analysis",
      description:
        "Comprehensive analysis of market trends, competitor landscape, and growth opportunities tailored to your industry with AI-powered insights.",
      delay: 0.1,
      image: "/images/services/market-analysis.jpg",
      stats: "95% Accuracy",
      color: "#10b981",
    },
    {
      icon: <Brain className="text-white" size={24} />,
      title: "Strategic Planning",
      description:
        "Develop robust business strategies that align with your vision and drive sustainable growth in competitive markets using data-driven methodologies.",
      delay: 0.2,
      image: "/images/services/strategic-planning.jpg",
      stats: "3x ROI",
      color: "#06b6d4",
    },
    {
      icon: <Users className="text-white" size={24} />,
      title: "Team Development",
      description:
        "Build high-performing teams with the right skills and culture to execute your business strategy effectively through proven frameworks.",
      delay: 0.3,
      image: "/images/services/team-development.jpg",
      stats: "90% Retention",
      color: "#3b82f6",
    },
    {
      icon: <LineChart className="text-white" size={24} />,
      title: "Performance Optimization",
      description:
        "Identify and eliminate inefficiencies in your operations to maximize productivity and profitability with cutting-edge analytics.",
      delay: 0.4,
      image: "/images/services/performance.jpg",
      stats: "+40% Efficiency",
      color: "#0ea5e9",
    },
    {
      icon: <Briefcase className="text-white" size={24} />,
      title: "Executive Coaching",
      description:
        "One-on-one coaching for executives to enhance leadership skills and drive organizational excellence through personalized development plans.",
      delay: 0.5,
      image: "/images/services/coaching.jpg",
      stats: "100% Success",
      color: "#14b8a6",
    },
    {
      icon: <Target className="text-white" size={24} />,
      title: "Digital Transformation",
      description:
        "Navigate the digital landscape with confidence through comprehensive transformation strategies that modernize your business operations.",
      delay: 0.6,
      image: "/images/services/digital.jpg",
      stats: "2x Faster",
      color: "#22c55e",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full bg-gradient-to-br from-emerald-900/10 via-teal-900/10 to-blue-900/10 py-20 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Enhanced animated background */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: backgroundY }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Geometric background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-16 text-center relative z-10"
      >
        <motion.div
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-white/80">
            Premium Services
          </span>
        </motion.div>

        <motion.h2
          className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
        >
          Our Consulting Services
        </motion.h2>
        <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Transforming businesses with data-driven insights and strategic
          expertise. We deliver measurable results that drive sustainable growth
          and competitive advantage.
        </motion.p>

        {/* Stats section */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { label: "Success Rate", value: "98%", icon: TrendingUp },
            { label: "Happy Clients", value: "500+", icon: Users },
            { label: "Projects Completed", value: "1000+", icon: Target },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
            >
              <stat.icon className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            delay={service.delay}
            image={service.image}
            stats={service.stats}
            color={service.color}
          />
        ))}
      </div>

      <motion.div
        className="mt-16 text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-2xl font-semibold shadow-xl overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
          <span className="relative z-10 flex items-center space-x-2">
            <span>Schedule a Consultation</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </span>
        </motion.button>

        <motion.p
          className="mt-4 text-sm text-white/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Free 30-minute consultation • No commitment required
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ServicesSection;
