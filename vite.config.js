import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [`jspdf-autotable`],
    },
  },
  optimizeDeps: {
    include: ['jspdf','jspdf-autotable','jquery', 'datatables.net', 'datatables.net-dt']
  },
  resolve: {
    alias: {
      $: 'jquery',
      jquery: 'jquery',
    }
  }
});
