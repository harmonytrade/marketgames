import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = process.env.BASE_PATH?.trim() || '/';

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
