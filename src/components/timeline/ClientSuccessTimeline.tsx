"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface TimelineItemProps {
  step: number;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  onClick: () => void;
}

const TimelineItem = ({
  step,
  title,
  description,
  image,
  isActive,
  onClick,
}: TimelineItemProps) => {
  return (
    <motion.div
      className={`relative flex flex-col md:flex-row items-start gap-4 p-6 rounded-xl cursor-pointer transition-all duration-500 ${isActive ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-2xl border border-purple-400/30 backdrop-blur-md" : "bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-purple-500/15 hover:to-pink-500/15 backdrop-blur-sm"}`}
      onClick={onClick}
      whileHover={{
        scale: isActive ? 1.02 : 1.05,
        rotateY: isActive ? 0 : 2,
        boxShadow: isActive
          ? "0 25px 50px rgba(168, 85, 247, 0.3)"
          : "0 15px 30px rgba(59, 130, 246, 0.2)",
      }}
      layout
    >
      <div className="flex-shrink-0">
        <motion.div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${isActive ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-gradient-to-r from-blue-400 to-purple-400 text-white"}`}
          animate={{
            scale: isActive ? [1, 1.2, 1] : [1, 1.05, 1],
            rotate: isActive ? [0, 360] : 0,
            boxShadow: isActive
              ? [
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                  "0 0 40px rgba(236, 72, 153, 0.5)",
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                ]
              : "0 5px 15px rgba(59, 130, 246, 0.3)",
          }}
          transition={{
            duration: isActive ? 2 : 3,
            repeat: Infinity,
            repeatDelay: isActive ? 0 : 1,
          }}
        >
          {isActive ? <Check size={20} /> : step}
        </motion.div>
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden"
          >
            <Image src={image} alt={title} fill className="object-cover" />
          </motion.div>
        )}
      </div>

      <motion.div
        className={`absolute right-4 top-1/2 -translate-y-1/2 ${isActive ? "opacity-100" : "opacity-0"}`}
        animate={{ x: isActive ? [0, 5, 0] : 0 }}
        transition={{
          duration: 0.5,
          repeat: isActive ? Infinity : 0,
          repeatDelay: 1.5,
        }}
      >
        <ChevronRight size={20} className="text-primary" />
      </motion.div>
    </motion.div>
  );
};

const ClientSuccessTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  const timelineItems = [
    {
      step: 1,
      title: "Initial Consultation",
      description:
        "We begin with a thorough assessment of your business needs and goals.",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    },
    {
      step: 2,
      title: "Strategy Development",
      description:
        "Our team creates a customized strategy aligned with your business objectives.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    },
    {
      step: 3,
      title: "Implementation",
      description:
        "We work alongside your team to implement the strategies effectively.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    },
    {
      step: 4,
      title: "Monitoring & Optimization",
      description:
        "Continuous monitoring and refinement to ensure optimal results.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
      step: 5,
      title: "Growth & Scaling",
      description:
        "Leveraging success to drive sustainable growth and business scaling.",
      image:
        "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
    },
  ];

  const [activeStep, setActiveStep] = useState(1);

  return (
    <div
      ref={containerRef}
      className="w-full bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 py-12 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            animate={{
              x: [0, 200, 0],
              y: [0, -150, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <motion.div
        style={{ opacity, scale }}
        className="max-w-4xl mx-auto mb-12 text-center"
      >
        <h2 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Client Success Journey
        </h2>
        <p className="text-xl text-muted-foreground">
          See how we transform businesses through our proven process
        </p>
      </motion.div>

      <motion.div className="max-w-3xl mx-auto space-y-4" layout>
        {timelineItems.map((item) => (
          <TimelineItem
            key={item.step}
            step={item.step}
            title={item.title}
            description={item.description}
            image={item.image}
            isActive={activeStep === item.step}
            onClick={() => setActiveStep(item.step)}
          />
        ))}
      </motion.div>

      <motion.div
        className="flex justify-center mt-8 gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {timelineItems.map((item) => (
          <motion.div
            key={item.step}
            className={`w-4 h-4 rounded-full cursor-pointer ${activeStep === item.step ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gradient-to-r from-blue-400 to-purple-400"}`}
            whileHover={{ scale: 1.5, rotate: 180 }}
            animate={{
              boxShadow:
                activeStep === item.step
                  ? [
                      "0 0 10px rgba(168, 85, 247, 0.5)",
                      "0 0 20px rgba(236, 72, 153, 0.5)",
                      "0 0 10px rgba(168, 85, 247, 0.5)",
                    ]
                  : "0 2px 8px rgba(59, 130, 246, 0.3)",
            }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => setActiveStep(item.step)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ClientSuccessTimeline;
