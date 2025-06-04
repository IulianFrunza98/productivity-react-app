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
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "white",
            borderRadius: "1rem",
            boxShadow: "0 4px 10px rgb(0 0 0 / 0.1)",
            padding: "24px 24px 32px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem", // redus gap
              textAlign: "center",
            }}
          >
            <div style={{ color: "#f59e0b", fontSize: "28px" }}>{icon}</div>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "0.5rem",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: 0,
                }}
              >
                {value}
              </p>
            </div>
          </div>
          <span
            style={{
              fontSize: "22px",
              color: "#9ca3af",
              alignSelf: "flex-end",
            }}
          >
            ℹ️
          </span>
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#fef3c7",
            borderRadius: "1rem",
            boxShadow: "0 4px 10px rgb(0 0 0 / 0.1)",
            padding: "24px 24px 32px 24px",
            color: "#374151",
            fontSize: "14px",
            overflowY: "auto",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <div style={{ lineHeight: 1.6 }}>{children}</div>
        </div>
      </motion.div>
    </div>
  );
}

export default FlipCard;
