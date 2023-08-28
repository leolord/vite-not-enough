import { defineConfig } from "vite";
import path from 'path'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'dist-vite')
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData(content, filename) {
          if (filename.match(/pageA/)) {
            return `@primaryColor: blue;` + content;
          } else {
            return `@primaryColor: gray;` + content;
          }
        },
      },
    },
  },
});
