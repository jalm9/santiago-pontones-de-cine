import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://santiagopontonesdecine.com',
  build: {
    format: 'directory',
  },
  image: {
    // Formatos que Astro va a generar automáticamente para cada <Image />
    // El navegador elige el mejor que soporte.
    // AVIF primero (mejor compresión), luego WebP, y el original como fallback.
    // (Astro los sirve como <picture> con múltiples <source>.)
  },
});
