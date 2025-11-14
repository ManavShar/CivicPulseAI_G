import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT) || 5173,
      proxy: {
        // Proxy /api requests to the backend server
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
        // Proxy /socket.io requests to the websocket server
        '/socket.io': {
            target: env.VITE_WS_URL || 'ws://localhost:3000',
            ws: true,
        },
      },
    },
  };
});
