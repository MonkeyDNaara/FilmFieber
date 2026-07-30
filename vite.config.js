import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        journal: './journal.html',
      },
    },
  },
  plugins: [tailwindcss()],
});
