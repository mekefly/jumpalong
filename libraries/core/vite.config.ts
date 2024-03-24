// @ts-ignore
import { resolve } from 'path'
import { defineConfig } from 'vite'
import packageJson from './package.json'
import { loggerScopePlugin } from '@jumpalong/logger-vite-plugin'
import * as url from 'url'
const __filename = (url as any).fileURLToPath(import.meta.url)
const __dirname = (url as any).fileURLToPath(new URL('.', import.meta.url))
const [startName, shortName] = packageJson.name.split('/')
const name = shortName ?? startName

// https://vitejs.dev/config/
export default defineConfig(opt => {
  return {
    plugins: [loggerScopePlugin()],
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, './src/index.ts'),
        name: name,
        // the proper extensions will be added
        fileName: name,
      },
      sourcemap: true,
      // rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      // external: ['vue'],
      // output: {
      //   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //   globals: {
      //     vue: 'Vue',
      //   },
      // },
      // },
    },
  }
})
