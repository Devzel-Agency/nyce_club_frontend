import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 8080,
    strictPort: true,
    hmr: {
      overlay: true,
      timeout: 30000,
      clientPort: 8080
    },
    watch: {
      usePolling: true,
      interval: 100
    },
    middlewareMode: false,
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  optimizeDeps: {
    force: true
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      esmExternals: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  plugins: [
    react({
      plugins: [["@swc/plugin-emotion", {}]]
    }),
    componentTagger()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
