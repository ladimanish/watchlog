import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env.TMDB_API_KEY': JSON.stringify(
        env.VITE_TMDB_API_KEY ?? env.TMDB_API_KEY ?? '',
      ),
    },
  };
});
