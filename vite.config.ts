import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 1. The React plugin handles JSX automatically. 
  // No need for a separate 'esbuild' block with 'jsx' here.
  plugins: [react()],

  // 2. Define 'global' for compatibility with browser-based libraries
  define: {
    global: 'window',
  },

  // 3. OptimizeDeps should be kept simple unless you have 
  // very specific dependency issues.
  optimizeDeps: {
    // We removed 'rolldownOptions' because it's not needed 
    // for a standard MERN setup and was causing type errors.
  },

  server: {
    port: 5173,
    // Optional: Helping Vite find your backend files
    proxy: {
      '/uploads': '${API_BASE_URL}',
    }
  }
});