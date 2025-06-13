
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const isLibMode = process.env.BUILD_LIB === 'true';
  
  if (isLibMode) {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/widget.tsx'),
          name: 'ThriveStackCalculator',
          fileName: 'pricing-calculator',
          formats: ['umd']
        },
        rollupOptions: {
          external: [],
          output: {
            globals: {}
          }
        },
        cssCodeSplit: false,
        minify: 'terser'
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    };
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
