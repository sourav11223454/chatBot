// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ✅ This is the correct config with optimizeDeps added
export default defineConfig({
  plugins: [react()],
  // ⭐ Add this optimizeDeps section
  optimizeDeps: {
    include: [
      'react-syntax-highlighter',
      'react-syntax-highlighter/dist/cjs/styles/prism', // Ensure the CJS path for styles is included
      'react-syntax-highlighter/dist/cjs/styles/prism/dracula', // Include the specific theme as well
    ],
  },
});