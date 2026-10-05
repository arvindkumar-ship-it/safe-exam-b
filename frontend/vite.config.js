import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev server ko inline scripts chahiye (HMR), isliye CSP meta sirf build me rehta hai.
const devWithoutCsp = {
  name: 'dev-without-csp',
  transformIndexHtml(html, ctx) {
    return ctx.server ? html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>\s*/, '') : html;
  },
};

export default defineConfig({
  plugins: [react(), devWithoutCsp],
  build: { sourcemap: false }, // B-24: production me source maps off
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    css: false,
  },
});
