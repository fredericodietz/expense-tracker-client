/// <reference types="vitest/config" />

import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/test.{ts,tsx,js,jsx}', 'src/**/*.test.{ts,tsx,js,jsx}'],
    coverage: {
      include: ['src/*/**/*.{ts,tsx,js,jsx}']
    }
  }
});
