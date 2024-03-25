// @ts-ignore
import { resolve } from 'path'
import { configDefaults, defineConfig } from 'vitest/config'
import packageJson from './package.json'
import { loggerScopePlugin } from '@jumpalong/logger-vite-plugin'
import * as url from 'url'
import { fileURLToPath, URL } from 'node:url'

const __filename = (url as any).fileURLToPath(import.meta.url)
const __dirname = (url as any).fileURLToPath(new URL('.', import.meta.url))
const [startName, shortName] = packageJson.name.split('/')
const name = shortName ?? startName

// https://vitejs.dev/config/
export default defineConfig(opt => {
  console.log('opt', opt)

  const __DEV__ = opt.mode === 'development' || opt.mode === 'test'
  const __PROD__ = opt.mode === 'production'
  const __TEST__ = opt.mode === 'test'
  return {
    test: {
      // browser: {
      // enabled: true,
      // name: 'chromium', // browser name is required
      // provider: 'playwright',
      // },
      globals: true,
      // setupFiles: './scripts/setupVitest.ts',
      environmentMatchGlobs: [['packages/{nostr-runtime}/**', 'jsdom']],
      sequence: {
        hooks: 'list',
      },

      environment: 'happy-dom',
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'html'],
        exclude: [...configDefaults.coverage.exclude!],
      },
      include: ['./__tests__/**/*.{spec,test}.ts'],
    },
    define: {
      'process.env': {
        NODE_ENV: opt.mode,
      },
      __DEV__,
      __PROD__,
      __TEST__,
    },
    plugins: [loggerScopePlugin()],
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, './src/index.ts'),
        name: name,
        // the proper extensions will be added
        fileName: name,
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
