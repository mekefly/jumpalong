import { resolve } from 'path'
import {
  relativeRootPath,
  searchVueScript,
  transform,
  transformRows,
} from '../src/index'

test('searchVueScript:vue', () => {
  let code = `
  <script lang="ts" setup>
import { provideEventLineMod } from './ProvideEventLine'

logger.info(provideEventLineMod())
console.log('xx')
console.log(logger)
</script>

<template></template>

<style scoped></style>
  `
  expect(searchVueScript(code.split('\n'))).toMatchInlineSnapshot(`
    [
      2,
      6,
    ]
  `)
})

test('searchVueScript:vue', () => {
  let code = `
  <script lang="ts" setup>
</script>

<template></template>

<style scoped></style>
  `
  expect(searchVueScript(code.split('\n'))).toMatchInlineSnapshot(`
    [
      2,
      1,
    ]
  `)
})

test('transformRows ts', () => {
  let code = `
  //@LoggerScoped
import { provideEventLineMod } from './ProvideEventLine'

logger.info(provideEventLineMod())
console.log('xx')
console.log(logger)
  `
  expect(
    transformRows(
      code.split('\n'),
      `E:\\study\\jumpalong\\packages\\browser-ui\\src\\components\\UserInformationButton.vue`,
      ['//@LoggerScoped']
    )
  ).toMatchInlineSnapshot(`
    [
      "",
      "let logger = __loggerFactory.create("browser-ui/src/components/UserInformationButton.vue"); //@LoggerScope",
      "import { provideEventLineMod } from './ProvideEventLine'",
      "",
      "logger.info(provideEventLineMod())",
      "console.log('xx')",
      "console.log(logger)",
      "  ",
    ]
  `)
})

test('vue test', () => {
  let code = `

  <script lang="ts" setup>
import { provideEventLineMod } from './ProvideEventLine'
//@LoggerScoped

logger.info(provideEventLineMod())
console.log('xx')
console.log(logger)
</script>

<template></template>

<style scoped></style>
  `
  expect(
    transform(
      code,
      `E:/study/jumpalong/packages/browser-ui/src/components/UserInformationButton.vue`,
      ['//@LoggerScope']
    )
  ).toMatchInlineSnapshot(`
    {
      "code": "

      <script lang="ts" setup>
    import { provideEventLineMod } from './ProvideEventLine'
    let logger = __loggerFactory.create("browser-ui/src/components/UserInformationButton.vue"); //@LoggerScope

    logger.info(provideEventLineMod())
    console.log('xx')
    console.log(logger)
    </script>

    <template></template>

    <style scoped></style>
      ",
      "map": null,
    }
  `)
})

test('ts test', () => {
  let code = `
import './logger'
import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
//@LoggerScope
console.log('-----------------', logger)

logger.silly('xx')

const app = createApp(App)

app.use(router)
app.use(i18n)
app._instance
app.config.globalProperties.t = t
app.mount('#app')

declare module 'vue' {
  export interface ComponentCustomProperties {
    t: typeof t
  }
}

  `
  expect(transform(code, './src/main.ts', ['//@LoggerScope']))
    .toMatchInlineSnapshot(`
      {
        "code": "
      import './logger'
      import './style.css'

      import { createApp } from 'vue'
      import App from './App.vue'
      import i18n from './i18n'
      import router from './router'
      let logger = __loggerFactory.create("./src/main.ts"); //@LoggerScope
      console.log('-----------------', logger)

      logger.silly('xx')

      const app = createApp(App)

      app.use(router)
      app.use(i18n)
      app._instance
      app.config.globalProperties.t = t
      app.mount('#app')

      declare module 'vue' {
        export interface ComponentCustomProperties {
          t: typeof t
        }
      }

        ",
        "map": null,
      }
    `)
})

test('scope: logger', () => {
  let code = `
import './logger'
import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
$scope: logger
console.log('-----------------', logger)

logger.silly('xx')

const app = createApp(App)

app.use(router)
app.use(i18n)
app._instance
app.config.globalProperties.t = t
app.mount('#app')

declare module 'vue' {
  export interface ComponentCustomProperties {
    t: typeof t
  }
}

  `
  expect(
    transform(code, 'E://jumpalong/packages/ui/src/main.ts', [
      '//@LoggerScope',
      '$scope: logger',
    ])
  ).toMatchInlineSnapshot(`
    {
      "code": "
    import './logger'
    import './style.css'

    import { createApp } from 'vue'
    import App from './App.vue'
    import i18n from './i18n'
    import router from './router'
    let logger = __loggerFactory.create("ui/src/main.ts"); //@LoggerScope
    console.log('-----------------', logger)

    logger.silly('xx')

    const app = createApp(App)

    app.use(router)
    app.use(i18n)
    app._instance
    app.config.globalProperties.t = t
    app.mount('#app')

    declare module 'vue' {
      export interface ComponentCustomProperties {
        t: typeof t
      }
    }

      ",
      "map": null,
    }
  `)
})

test(' getPackageRootPath', () => {
  expect(
    relativeRootPath('E:jumpalong/packages/ui/src/main.ts')
  ).toMatchInlineSnapshot(`"ui/src/main.ts"`)
  expect(relativeRootPath('E://jumpalong')).toMatchInlineSnapshot(
    `"E://jumpalong"`
  )
  expect(relativeRootPath('E://jumpalong/packages')).toMatchInlineSnapshot(`""`)
})

test('vue test with flag', () => {
  let code = `

  <script lang="ts" setup>
$LoggerScope()
$LoggerScope('disabled')
$LoggerScope('disabled,xxx')
</script>

<template></template>

<style scoped></style>
  `
  expect(
    transform(
      code,
      `E:/study/jumpalong/packages/browser-ui/src/components/UserInformationButton.vue`,
      [/^\$LoggerScope\((|["'](?<flag>[a-zA-Z,]*)['"])\)$/]
    )
  ).toMatchInlineSnapshot(`
    {
      "code": "

      <script lang="ts" setup>
    let logger = __loggerFactory.create("browser-ui/src/components/UserInformationButton.vue"); //@LoggerScope
    let logger = __loggerFactory.create("browser-ui/src/components/UserInformationButton.vue", {"disabled":true}); //@LoggerScope
    let logger = __loggerFactory.create("browser-ui/src/components/UserInformationButton.vue", {"disabled":true,"xxx":true}); //@LoggerScope
    </script>

    <template></template>

    <style scoped></style>
      ",
      "map": null,
    }
  `)
})
