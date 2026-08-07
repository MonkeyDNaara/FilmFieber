import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        journal: fileURLToPath(new URL("./journal.html", import.meta.url)),
      },
    },
  },
  plugins: [tailwindcss()],
});
