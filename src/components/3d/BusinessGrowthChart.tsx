"use client";

import { OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

interface BarProps {
  position: [number, number, number];
  height: number;
  color: string;
  hoverColor: string;
  label: string;
  value: number;
  onHover: (label: string, value: number) => void;
}

const Bar = ({
  position,
  height,
  color,
  hoverColor,
  label,
  value,
  onHover,
}: BarProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Enhanced animation with more dynamic movement
    meshRef.current.scale.y = THREE.MathUtils.lerp(
      meshRef.current.scale.y,
      clicked ? height * 1.4 : hovered ? height * 1.2 : height,
      0.1
    );

    // Dynamic floating animation with rotation
    meshRef.current.position.y =
      position[1] + Math.sin(time + position[0]) * 0.15;
    meshRef.current.rotation.y = Math.sin(time * 0.5 + position[0]) * 0.2;

    // Enhanced pulsing effect when hovered
    if (hovered) {
      meshRef.current.scale.x = 1 + Math.sin(time * 4) * 0.08;
      meshRef.current.scale.z = 1 + Math.sin(time * 4) * 0.08;

      // Add subtle rotation when hovered
      meshRef.current.rotation.z = Math.sin(time * 2) * 0.1;
    } else {
      meshRef.current.scale.x = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        1,
        0.1
      );
      meshRef.current.scale.z = THREE.MathUtils.lerp(
        meshRef.current.scale.z,
        1,
        0.1
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        0,
        0.1
      );
    }
  });

  return (
    <group>
      <mesh
        position={position}
        ref={meshRef}
        scale={[1, height, 1]}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => {
          setHovered(true);
          onHover(label, value);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial
          color={hovered ? hoverColor : color}
          emissive={
            hovered
              ? new THREE.Color(color).multiplyScalar(0.2)
              : new THREE.Color(0x000000)
          }
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Particle effects for hovered/clicked bars */}
      {(hovered || clicked) && (
        <Sparkles
          count={20}
          scale={[2, height * 2, 2]}
          size={2}
          speed={0.5}
          position={position}
          color={hoverColor}
        />
      )}
    </group>
  );
};

// Animated background particles
const BackgroundParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    const colors = new Float32Array(50 * 3);

    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.7, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    particlesRef.current.rotation.y = time * 0.1;
    particlesRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={50}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={50}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Animated grid
const AnimatedGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;

    const time = state.clock.getElapsedTime();
    gridRef.current.material.opacity = 0.3 + Math.sin(time) * 0.1;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[20, 20, "#888888", "#444444"]}
      position={[0, -0.01, 0]}
    />
  );
};

const BusinessGrowthChart = () => {
  const [hoverInfo, setHoverInfo] = useState({ label: "", value: 0 });

  const chartData = [
    { label: "Q1", value: 45, color: "#10b981", hoverColor: "#34d399" },
    { label: "Q2", value: 65, color: "#06b6d4", hoverColor: "#22d3ee" },
    { label: "Q3", value: 85, color: "#3b82f6", hoverColor: "#60a5fa" },
    { label: "Q4", value: 95, color: "#0ea5e9", hoverColor: "#38bdf8" },
    { label: "Projected", value: 120, color: "#14b8a6", hoverColor: "#5eead4" },
  ];

  const handleHover = (label: string, value: number) => {
    setHoverInfo({ label, value });
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-blue-900/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-white/10">
      {/* Enhanced info panel */}
      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-2xl">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
          Business Growth Analytics
        </h3>
        {hoverInfo.label ? (
          <div className="space-y-2">
            <p className="text-lg font-semibold text-white">
              {hoverInfo.label}
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {hoverInfo.value}%
            </p>
            <p className="text-sm text-white/70">Growth Rate</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-white/70">
              Hover over bars to see details
            </p>
            <p className="text-lg font-semibold text-white">
              Interactive 3D Chart
            </p>
          </div>
        )}
      </div>

      {/* Performance metrics */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        {[
          {
            label: "Avg Growth",
            value: "82%",
            color: "from-green-400 to-emerald-400",
          },
          {
            label: "Trend",
            value: "↗ +15%",
            color: "from-blue-400 to-cyan-400",
          },
          {
            label: "Forecast",
            value: "120%",
            color: "from-emerald-400 to-teal-400",
          },
        ].map((metric, index) => (
          <div
            key={metric.label}
            className="bg-gradient-to-r from-black/20 to-black/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10"
          >
            <p className="text-xs text-white/60">{metric.label}</p>
            <p
              className={`text-lg font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <Canvas
        camera={{ position: [0, 8, 12], fov: 50 }}
        className="cursor-grab active:cursor-grabbing"
      >
        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.6} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={2} color="#10b981" />
        <pointLight position={[-10, 10, -10]} intensity={1.5} color="#06b6d4" />
        <directionalLight
          position={[-5, 5, 5]}
          intensity={1.2}
          color="#3b82f6"
        />
        <spotLight
          position={[0, 20, 0]}
          intensity={2.5}
          color="#14b8a6"
          angle={0.4}
          penumbra={0.5}
          castShadow
        />

        {/* Background elements */}
        <BackgroundParticles />
        <AnimatedGrid />

        {/* Chart bars */}
        {chartData.map((item, i) => (
          <Bar
            key={i}
            position={[i * 2.5 - 5, 0, 0]}
            height={item.value / 25}
            color={item.color}
            hoverColor={item.hoverColor}
            label={item.label}
            value={item.value}
            onHover={handleHover}
          />
        ))}

        {/* Enhanced controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={8}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Enhanced legend */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="flex space-x-6 bg-gradient-to-r from-black/20 to-black/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20">
          {chartData.map((item, i) => (
            <div
              key={i}
              className="flex items-center space-x-2 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => handleHover(item.label, item.value)}
            >
              <div
                className="w-3 h-3 rounded-full shadow-lg"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 10px ${item.color}50`,
                }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: item.color }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessGrowthChart;
