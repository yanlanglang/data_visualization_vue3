import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    // port: 3000,
    proxy: {
      "/mi": {
        target: "https://echarts.apache.org/examples/",
        // target就是你要访问的目标地址，可以是基础地址，这样方便在这个网站的其他api口调用数据
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mi/, ""),
        // 要记得加rewrite这句
      },
      //flask后端接口
      "/backend": {
        target: "http://127.0.0.1:8000/",
        // target就是你要访问的目标地址，可以是基础地址，这样方便在这个网站的其他api口调用数据
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ""),
        // 要记得加rewrite这句
      },
    },
  },
});
