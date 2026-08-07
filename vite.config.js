import { resolve } from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        journal: resolve(__dirname, "journal.html"),
      },
    },
  },
  plugins: [tailwindcss()],
});
