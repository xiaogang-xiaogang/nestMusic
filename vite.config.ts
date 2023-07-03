import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
      alias: {
          '~': path.resolve(__dirname, './'),
          '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.d.ts', '.jsx', '.tsx', '.json'], // 默认值
  },
  server:{
    port:5211,
    open:true,
    hmr:true,
    proxy:{
      '/api':{
        target: 'https://autumnfish.cn/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': ''
        }
      }
    }
  }
})
