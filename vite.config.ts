import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_API_BASE_URL,
  
  define: {
    // This ensures libraries like 'simple-peer' don't crash in the browser
    global: 'window',
  },

  server: {
    port: 5173,
    proxy: {
      // Local development only: redirects local /api calls to local backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  
  build: {
    // Ensures large libraries like PDF viewers are handled correctly
    chunkSizeWarningLimit: 1600,
  }
});
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   // 1. The React plugin handles JSX automatically. 
//   // No need for a separate 'esbuild' block with 'jsx' here.
//   plugins: [react()],

//   // 2. Define 'global' for compatibility with browser-based libraries
//   define: {
//     global: 'window',
//   },

//   // 3. OptimizeDeps should be kept simple unless you have 
//   // very specific dependency issues.
//   optimizeDeps: {
//     // We removed 'rolldownOptions' because it's not needed 
//     // for a standard MERN setup and was causing type errors.
//   },

//   server: {
//     port: 5173,
//     // Optional: Helping Vite find your backend files
//     proxy: {
//       '/uploads': '${API_BASE_URL}',
//     }
//   }
// });