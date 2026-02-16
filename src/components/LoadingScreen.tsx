"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGlobeStore } from "@/store/useGlobeStore";

export default function LoadingScreen() {
  const { globeReady } = useGlobeStore();

  return (
    <AnimatePresence>
      {!globeReady && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at center, #0a1628 0%, #040810 70%)",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-2 border-transparent mb-6"
            style={{
              borderTopColor: "rgba(0, 180, 255, 0.7)",
              borderRightColor: "rgba(0, 180, 255, 0.2)",
            }}
          />
          <h2 className="text-xl font-bold text-white mb-1">
            Global<span className="text-cyan-400">News</span>
          </h2>
          <p className="text-xs text-white/30">Loading the world...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
