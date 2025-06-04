import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "vendor_react";
            }
            if (id.includes("firebase")) {
              return "vendor_firebase";
            }
            if (id.includes("recharts")) {
              return "vendor_recharts";
            }
            if (id.includes("framer-motion")) {
              return "vendor_framer_motion";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
