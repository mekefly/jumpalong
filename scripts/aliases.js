// @ts-check
// these aliases are shared between vitest and rollup
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const resolveEntryForPkg = p =>
  path.resolve(
    fileURLToPath(import.meta.url),
    `../../packages/${p}/src/index.ts`
  )

const dirs = readdirSync(new URL('../packages', import.meta.url))

const entries = {
  jumpalong: resolveEntryForPkg('jumpalong'),
  '@jumpalong/shared': resolveEntryForPkg('shared'),
  staff: resolveEntryForPkg('nostr-runtime'),
}

const nonSrcPackages = ['sfc-playground', 'template-explorer', 'dts-test']

for (const dir of dirs) {
  const key = `@vue/${dir}`
  if (
    dir !== 'vue' &&
    !nonSrcPackages.includes(dir) &&
    !(key in entries) &&
    statSync(new URL(`../packages/${dir}`, import.meta.url)).isDirectory()
  ) {
    entries[key] = resolveEntryForPkg(dir)
  }
}

export { entries }
