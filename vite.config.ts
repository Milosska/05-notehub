import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: {
      "@components": path.resolve(import.meta.dirname, "src/components"),
      "@services": path.resolve(import.meta.dirname, "src/services"),
      "@hooks": path.resolve(import.meta.dirname, "src/hooks"),
      "@shared-types": path.resolve(import.meta.dirname, "src/types"),
    },
  },
  build: {
    sourcemap: true,
  },
});
