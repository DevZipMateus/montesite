
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      crypto: "crypto-browserify",
      buffer: "buffer",  // Alias para o buffer
      stream: "stream-browserify",  // Alias para o stream
    },
    dedupe: ["react", "react-dom"],
  },
  define: {
    global: 'globalThis', // Isso pode ajudar a evitar o erro de "global is not defined"
  },
  build: {
    rollupOptions: {
      // Make sure uuid is properly bundled
      external: []
    }
  }
}));
