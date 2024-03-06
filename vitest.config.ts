import { configDefaults, defineConfig } from 'vitest/config'
//@ts-ignore
import { entries } from './scripts/aliases.js'
//@ts-ignore
import codspeedPlugin from '@codspeed/vitest-plugin'
import { readFileSync } from 'fs'
import { relative } from 'path'
import replace from '@rollup/plugin-replace'
import packageJson from './package.json'
import { loggerScopePlugin } from '@jumpalong/logger-vite-plugin'

export default defineConfig(({ command, mode }) => {
  console.log('command:', command, 'mode:', mode)

  const isProd = command === 'build'
  const isTest = mode === 'test'
  return {
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
      __COMPAT__: true,
    },
    resolve: {
      alias: entries,
    },
    plugins: [
      createReplacePlugin(isProd),
      loggerScopePlugin({ excludes: ['.test.ts'] }),
      codspeedPlugin(),
    ],
    test: {
      globals: true,
      setupFiles: './scripts/setupVitest.ts',
      environmentMatchGlobs: [['packages/{nostr-runtime}/**', 'jsdom']],
      sequence: {
        hooks: 'list',
      },

      environment: 'happy-dom',
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'html'],
        exclude: [
          ...configDefaults.coverage.exclude!,
          // DOM transitions are tested via e2e so no coverage is collected
          'packages/runtime-dom/src/components/Transition*',
          // mostly entries
          'packages/vue-compat/**',
        ],
      },
      include: [
        ...[
          'EventLine',
          'Staff',
          // 'GlobalDiscoveryUser',
          // 'DefineSubEventStaff',
          // 'Binary',
          // 'Utils',
          // 'vite-plugin',
          //staff
          // 'ManagerStaff',
          // 'LatestEventStaff',
          // 'EventStaff',
          // 'WebSocketFactoryStaff',
          // 'LoginStaff',
          // 'event',
          // 'RelayConfiguratorSynchronizerStaff',
          // 'GlobalUrlsStaff',
          // 'PoolStaff',
          // 'DoNotRepeatStaff',
          // 'LoadStaff',
          'LocalMapStaff',
          'AutoAddKind10002UrlStaff',
          'CreateChildHookStaff',
          'PauseStaff',
          // utils
          // 'object',
          'LineEmitter',
          // 'utilsVue',
          // 'utils',
          'EventMap',
          'CommonEvent',
          'ParameterizedReplaceableEventMap',
          'PriKeyNostrApiImpl',
          'Match',
          'TagHandel',
        ].map(item => `**/__tests__/**/${item}.test.ts`),
        // '**/packages/*/__tests__/*.test.ts',
      ],
    },
  }
})

function createReplacePlugin(isProd = false) {
  const isDEV = !isProd
  return replace({
    preventAssignment: true,
    values: {
      __DEV__: isDEV ? 'true' : 'false',
      __PROD__: isProd ? 'true' : 'false',
      'false || ': '',
      __VERSION__: packageJson.version,
    },
  })
}
