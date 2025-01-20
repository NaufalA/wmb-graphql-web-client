import { defineConfig, loadEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default ({ mode }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode || 'development', process.cwd()) };
  return defineConfig({
    plugins: [react()],
    optimizeDeps: {
      exclude: ['bootstrap'],
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.split('/api')[1],
        }
      }
    }
  });
}
