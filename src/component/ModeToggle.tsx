import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

interface ModeToggleProps {
  mode: "paragraph" | "bullet";
  setMode: React.Dispatch<React.SetStateAction<"paragraph" | "bullet">>;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <motion.div
      data-aos="fade-up"
      className="flex items-center justify-between gap-4 bg-[#1a1a2e] p-3 rounded-2xl border border-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.4)]"
    >
      <button
        onClick={() => setMode("paragraph")}
        className={`flex-1 py-2 text-lg font-semibold rounded-xl transition-all duration-300 ${
          mode === "paragraph"
            ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-[0_0_10px_rgba(88,28,135,0.5)]"
            : "bg-[#121224] text-gray-400 hover:text-gray-200 hover:bg-[#1e1e35]"
        }`}
      >
        📝 Paragraph Mode
      </button>

      <button
        onClick={() => setMode("bullet")}
        className={`flex-1 py-2 text-lg font-semibold rounded-xl transition-all duration-300 ${
          mode === "bullet"
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-[0_0_10px_rgba(88,28,135,0.5)]"
            : "bg-[#121224] text-gray-400 hover:text-gray-200 hover:bg-[#1e1e35]"
        }`}
      >
        • Bullet Mode
      </button>
    </motion.div>
  );
};

export default ModeToggle;
