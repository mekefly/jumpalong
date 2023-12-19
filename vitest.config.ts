import { configDefaults, defineConfig } from 'vitest/config'
import { entries } from './scripts/aliases.js'
import codspeedPlugin from '@codspeed/vitest-plugin'

export default defineConfig({
  define: {
    __DEV__: true,
    __TEST__: true,
    __VERSION__: '"test"',
    __BROWSER__: false,
    __GLOBAL__: false,
    __ESM_BUNDLER__: true,
    __ESM_BROWSER__: false,
    __NODE_JS__: true,
    __SSR__: true,
    __FEATURE_OPTIONS_API__: true,
    __FEATURE_SUSPENSE__: true,
    __FEATURE_PROD_DEVTOOLS__: false,
    __COMPAT__: true
  },
  resolve: {
    alias: entries
  },
  plugins: [codspeedPlugin()],
  test: {
    globals: true,
    setupFiles: 'scripts/setupVitest.ts',
    environmentMatchGlobs: [
      ['packages/{vue,vue-compat,runtime-dom}/**', 'jsdom']
    ],
    sequence: {
      hooks: 'list'
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      exclude: [
        ...configDefaults.coverage.exclude!,
        // DOM transitions are tested via e2e so no coverage is collected
        'packages/runtime-dom/src/components/Transition*',
        // mostly entries
        'packages/vue-compat/**'
      ]
    },
    include: [
      'EventLine',
      'Staff'

      //staff
      // 'EventStaff',
      // 'WebSocketFactoryStaff',
      // 'PoolStaff',

      // utils
      // 'object',
      // 'LineEmitter'
    ].map(item => `**/__tests__/**/${item}.test.ts`)
  }
})
