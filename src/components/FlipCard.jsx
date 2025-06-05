// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

function FlipCard({ icon, label, value, children }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped((prev) => !prev)}
      className="cursor-pointer"
      style={{
        perspective: 1000,
        width: "280px",
        minHeight: "180px",
        margin: "15px",
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl shadow-lg p-6 flex flex-col justify-between 
          bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-100"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="flex items-center gap-6">
            <div className="text-yellow-500 text-3xl">{icon}</div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {label}
              </p>
              <p className="text-3xl font-bold text-gray-800 dark:text-yellow-300">
                {value}
              </p>
            </div>
          </div>
          <span className="text-xl text-gray-400 dark:text-gray-500 self-end">
            ℹ️
          </span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl shadow-lg p-6 text-sm overflow-y-auto 
          bg-yellow-100 text-gray-800 dark:bg-gray-800 dark:text-yellow-100"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="leading-relaxed">{children}</div>
        </div>
      </motion.div>
    </div>
  );
}

export default FlipCard;
