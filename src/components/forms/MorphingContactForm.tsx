"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import { useState } from "react";

type FormStep = "info" | "company" | "message" | "success";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  industry: string;
  employees: string;
  message: string;
}

const MorphingContactForm = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>("info");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    industry: "",
    employees: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep = (step: FormStep): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (step === "info") {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
        isValid = false;
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
        isValid = false;
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
        isValid = false;
      }
    } else if (step === "company") {
      if (!formData.company.trim()) {
        newErrors.company = "Company name is required";
        isValid = false;
      }
      if (!formData.industry.trim()) {
        newErrors.industry = "Industry is required";
        isValid = false;
      }
    } else if (step === "message") {
      if (!formData.message.trim()) {
        newErrors.message = "Message is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (currentStep === "info" && validateStep("info")) {
      setCurrentStep("company");
    } else if (currentStep === "company" && validateStep("company")) {
      setCurrentStep("message");
    } else if (currentStep === "message" && validateStep("message")) {
      // Submit form
      setCurrentStep("success");
    }
  };

  const handleBack = () => {
    if (currentStep === "company") {
      setCurrentStep("info");
    } else if (currentStep === "message") {
      setCurrentStep("company");
    }
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case "info":
        return 33;
      case "company":
        return 66;
      case "message":
      case "success":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-2xl shadow-2xl overflow-hidden border border-white/20 backdrop-blur-md">
      {currentStep !== "success" && (
        <div className="p-4 border-b border-white/20 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {currentStep === "info" && "Your Information"}
              {currentStep === "company" && "Company Details"}
              {currentStep === "message" && "Your Message"}
            </h3>
            <span className="text-sm text-muted-foreground">
              Step{" "}
              {currentStep === "info" ? 1 : currentStep === "company" ? 2 : 3}{" "}
              of 3
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{
                width: `${getStepProgress()}%`,
                boxShadow: [
                  "0 0 10px rgba(168, 85, 247, 0.5)",
                  "0 0 20px rgba(236, 72, 153, 0.5)",
                  "0 0 10px rgba(168, 85, 247, 0.5)",
                ],
              }}
              transition={{
                width: { duration: 0.8, type: "spring" },
                boxShadow: { duration: 2, repeat: Infinity },
              }}
            />
          </div>
        </div>
      )}

      <div className="p-6">
        <AnimatePresence mode="wait">
          {currentStep === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-xl border ${errors.firstName ? "border-red-400" : "border-white/30"} bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                />
                {errors.firstName && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-xl border ${errors.lastName ? "border-red-400" : "border-white/30"} bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                />
                {errors.lastName && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-xl border ${errors.email ? "border-red-400" : "border-white/30"} bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                />
                {errors.email && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === "company" && (
            <motion.div
              key="company"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-xl border ${errors.company ? "border-red-400" : "border-white/30"} bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                />
                {errors.company && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.company}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium mb-1"
                >
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-xl border ${errors.industry ? "border-red-400" : "border-white/30"} bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300`}
                >
                  <option value="">Select Industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
                {errors.industry && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.industry}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="employees"
                  className="block text-sm font-medium mb-1"
                >
                  Number of Employees
                </label>
                <select
                  id="employees"
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                >
                  <option value="">Select Range</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501+">501+</option>
                </select>
              </div>
            </motion.div>
          )}

          {currentStep === "message" && (
            <motion.div
              key="message"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  How can we help you?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-xl border ${errors.message ? "border-red-400" : "border-white/30"} bg-white/10 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none`}
                />
                {errors.message && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.message}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Check size={36} className="text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-muted-foreground mb-6">
                We've received your message and will get back to you shortly.
              </p>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 15px 30px rgba(168, 85, 247, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                onClick={() => {
                  setCurrentStep("info");
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    company: "",
                    industry: "",
                    employees: "",
                    message: "",
                  });
                }}
              >
                Start Over
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {currentStep !== "success" && (
          <div className="flex justify-between mt-8">
            {currentStep !== "info" ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                onClick={handleBack}
              >
                <ArrowLeft size={16} /> Back
              </motion.button>
            ) : (
              <div></div>
            )}

            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 10px 25px rgba(168, 85, 247, 0.4)",
                background: "linear-gradient(45deg, #8b5cf6, #ec4899)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                background: [
                  "linear-gradient(45deg, #8b5cf6, #ec4899)",
                  "linear-gradient(45deg, #ec4899, #3b82f6)",
                  "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                ],
              }}
              transition={{
                background: { duration: 3, repeat: Infinity },
                hover: { duration: 0.3 },
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg"
              onClick={handleNext}
            >
              {currentStep === "message" ? (
                <>
                  Submit <Send size={16} />
                </>
              ) : (
                <>
                  Next <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MorphingContactForm;
