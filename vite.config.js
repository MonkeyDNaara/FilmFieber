import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        journal: resolve(import.meta.dirname, "journal.html"),
      },
    },
  },
  plugins: [tailwindcss()],
});
