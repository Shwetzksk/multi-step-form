import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@lib": "/src/lib",
      "@pages": "/src/pages",
      "@assets": "/src/assets",
      "@components": "/src/components",
    },
  },
});
