// Performance optimization utilities

export const getDevicePerformance = () => {
  if (typeof window === "undefined") return "high";

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return "low";

  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory;
  if (deviceMemory && deviceMemory < 4) return "low";

  // Check hardware concurrency
  const cores = navigator.hardwareConcurrency;
  if (cores && cores < 4) return "medium";

  // Check connection speed
  const connection = (navigator as any).connection;
  if (
    connection &&
    connection.effectiveType &&
    ["slow-2g", "2g", "3g"].includes(connection.effectiveType)
  ) {
    return "low";
  }

  return "high";
};

export const getOptimizedParticleCount = (baseCount: number) => {
  const performance = getDevicePerformance();

  switch (performance) {
    case "low":
      return Math.floor(baseCount * 0.3);
    case "medium":
      return Math.floor(baseCount * 0.6);
    default:
      return baseCount;
  }
};

export const getOptimizedAnimationDuration = (baseDuration: number) => {
  const performance = getDevicePerformance();

  switch (performance) {
    case "low":
      return baseDuration * 2; // Slower animations
    case "medium":
      return baseDuration * 1.5;
    default:
      return baseDuration;
  }
};

export const shouldUseReducedAnimations = () => {
  return getDevicePerformance() === "low";
};
