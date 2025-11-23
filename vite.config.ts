import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno desde .env si existe (local)
  const env = loadEnv(mode, '.', '');

  // En Vercel, process.env contiene las variables configuradas en el dashboard.
  // En Local, env contiene las variables del archivo .env.
  const apiKey = process.env.API_KEY || env.API_KEY || env.VITE_API_KEY;

  console.log("Build/Dev: API Key found?", !!apiKey);

  return {
    plugins: [react()],
    define: {
      // Esto reemplaza "process.env.API_KEY" en el código por el valor real string durante el "build"
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  };
});