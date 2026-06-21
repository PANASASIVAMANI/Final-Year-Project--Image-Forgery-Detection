import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Final-Year-Project--Image-Forgery-Detection/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
