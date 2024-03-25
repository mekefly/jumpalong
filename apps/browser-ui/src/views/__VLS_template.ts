import ArrowForwardIosRoundVue from '../components/icon/ArrowForwardIosRound.vue'
import { NList, NSlider } from 'naive-ui'
import {
  __VLS_internalComponent,
  __VLS_componentsOption,
  __VLS_name,
  childrenPaths,
  currentPath,
  settingOptions,
  config,
} from './SettingsView.vue'

function __VLS_template() {
  let __VLS_ctx!: InstanceType<
    __VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>
  > & {}
  /* Components */
  let __VLS_otherComponents!: NonNullable<
    typeof __VLS_internalComponent extends { components: infer C } ? C : {}
  > &
    typeof __VLS_componentsOption
  let __VLS_own!: __VLS_SelfComponent<
    typeof __VLS_name,
    typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots })
  >
  let __VLS_localComponents!: typeof __VLS_otherComponents &
    Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>
  let __VLS_components!: typeof __VLS_localComponents &
    __VLS_GlobalComponents &
    typeof __VLS_ctx
  /* Style Scoped */
  type __VLS_StyleScopedClasses = {}
  let __VLS_styleScopedClasses!:
    | __VLS_StyleScopedClasses
    | keyof __VLS_StyleScopedClasses
    | (keyof __VLS_StyleScopedClasses)[]
  /* CSS variable injection */
  /* CSS variable injection end */
  let __VLS_resolvedLocalAndGlobalComponents!: {} & __VLS_WithComponent<
    'NList',
    typeof __VLS_localComponents,
    'NList',
    'nList',
    'n-list'
  > &
    __VLS_WithComponent<
      'NListItem',
      typeof __VLS_localComponents,
      'NListItem',
      'nListItem',
      'n-list-item'
    > &
    __VLS_WithComponent<
      'NThing',
      typeof __VLS_localComponents,
      'NThing',
      'nThing',
      'n-thing'
    > &
    __VLS_WithComponent<
      'NIcon',
      typeof __VLS_localComponents,
      'NIcon',
      'nIcon',
      'n-icon'
    > &
    __VLS_WithComponent<
      'ArrowForwardIosRoundVue',
      typeof __VLS_localComponents,
      'ArrowForwardIosRoundVue',
      'ArrowForwardIosRoundVue',
      'ArrowForwardIosRoundVue'
    > &
    __VLS_WithComponent<
      'NSlider',
      typeof __VLS_localComponents,
      'NSlider',
      'nSlider',
      'n-slider'
    >
  __VLS_components.NList
  __VLS_components.NList
  __VLS_components.nList
  __VLS_components.nList
  __VLS_components['n-list']
  __VLS_components['n-list']
  // @ts-ignore
  ;[NList, NList]
  __VLS_components.NListItem
  __VLS_components.NListItem
  __VLS_components.NListItem
  __VLS_components.NListItem
  __VLS_components.nListItem
  __VLS_components.nListItem
  __VLS_components.nListItem
  __VLS_components.nListItem
  __VLS_components['n-list-item']
  __VLS_components['n-list-item']
  __VLS_components['n-list-item']
  __VLS_components['n-list-item']
  // @ts-ignore
  ;[NListItem, NListItem, NListItem, NListItem]
  __VLS_components.NThing
  __VLS_components.NThing
  __VLS_components.NThing
  __VLS_components.NThing
  __VLS_components.nThing
  __VLS_components.nThing
  __VLS_components.nThing
  __VLS_components.nThing
  __VLS_components['n-thing']
  __VLS_components['n-thing']
  __VLS_components['n-thing']
  __VLS_components['n-thing']
  // @ts-ignore
  ;[NThing, NThing, NThing, NThing]
  ;(({}) as __VLS_IntrinsicElements).template
  ;(({}) as __VLS_IntrinsicElements).template
  ;(({}) as __VLS_IntrinsicElements).template
  ;(({}) as __VLS_IntrinsicElements).template
  ;(({}) as __VLS_IntrinsicElements).template
  ;(({}) as __VLS_IntrinsicElements).template
  __VLS_components.NIcon
  __VLS_components.NIcon
  __VLS_components.nIcon
  __VLS_components.nIcon
  __VLS_components['n-icon']
  __VLS_components['n-icon']
  // @ts-ignore
  ;[NIcon, NIcon]
  __VLS_components.ArrowForwardIosRoundVue
  // @ts-ignore
  ;[ArrowForwardIosRoundVue]
  __VLS_components.NSlider
  __VLS_components.nSlider
  __VLS_components['n-slider']
  // @ts-ignore
  ;[NSlider]
  {
    let __VLS_0!: 'NList' extends keyof typeof __VLS_ctx
      ? typeof __VLS_ctx.NList
      : 'nList' extends keyof typeof __VLS_ctx
      ? typeof __VLS_ctx.nList
      : 'n-list' extends keyof typeof __VLS_ctx
      ? (typeof __VLS_ctx)['n-list']
      : (typeof __VLS_resolvedLocalAndGlobalComponents)['NList']
    const __VLS_1 = __VLS_asFunctionalComponent(
      __VLS_0,
      new __VLS_0({ ...{}, clickable: true, hoverable: true })
    )
    ;(({}) as { NList: typeof __VLS_0 }).NList
    ;(({}) as { NList: typeof __VLS_0 }).NList
    const __VLS_2 = __VLS_1(
      { ...{}, clickable: true, hoverable: true },
      ...__VLS_functionalComponentArgsRest(__VLS_1)
    )
    ;(
      ({}) as (
        props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> &
          Record<string, unknown>
      ) => void
    )({ ...{}, clickable: true, hoverable: true })
    const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!
    let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>
    for (const [path] of __VLS_getVForSourceType(__VLS_ctx.childrenPaths!)) {
      {
        let __VLS_5!: 'NListItem' extends keyof typeof __VLS_ctx
          ? typeof __VLS_ctx.NListItem
          : 'nListItem' extends keyof typeof __VLS_ctx
          ? typeof __VLS_ctx.nListItem
          : 'n-list-item' extends keyof typeof __VLS_ctx
          ? (typeof __VLS_ctx)['n-list-item']
          : (typeof __VLS_resolvedLocalAndGlobalComponents)['NListItem']
        const __VLS_6 = __VLS_asFunctionalComponent(
          __VLS_5,
          new __VLS_5({ ...{ onClick: {} as any } })
        )
        ;(({}) as { NListItem: typeof __VLS_5 }).NListItem
        ;(({}) as { NListItem: typeof __VLS_5 }).NListItem
        const __VLS_7 = __VLS_6(
          { ...{ onClick: {} as any } },
          ...__VLS_functionalComponentArgsRest(__VLS_6)
        )
        ;(
          ({}) as (
            props: __VLS_FunctionalComponentProps<
              typeof __VLS_5,
              typeof __VLS_7
            > &
              Record<string, unknown>
          ) => void
        )({ ...{ onClick: {} as any } })
        const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!
        let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>
        let __VLS_10 = {
          click: __VLS_pickEvent(
            __VLS_9['click'],
            (
              {} as __VLS_FunctionalComponentProps<
                typeof __VLS_6,
                typeof __VLS_7
              >
            ).onClick
          ),
        }
        __VLS_10 = {
          click: () => {
            __VLS_ctx.currentPath = __VLS_ctx.currentPath + path
          },
        }
        {
          let __VLS_11!: 'NThing' extends keyof typeof __VLS_ctx
            ? typeof __VLS_ctx.NThing
            : 'nThing' extends keyof typeof __VLS_ctx
            ? typeof __VLS_ctx.nThing
            : 'n-thing' extends keyof typeof __VLS_ctx
            ? (typeof __VLS_ctx)['n-thing']
            : (typeof __VLS_resolvedLocalAndGlobalComponents)['NThing']
          const __VLS_12 = __VLS_asFunctionalComponent(
            __VLS_11,
            new __VLS_11({ ...{}, title: __VLS_ctx.t(path) })
          )
          ;(({}) as { NThing: typeof __VLS_11 }).NThing
          ;(({}) as { NThing: typeof __VLS_11 }).NThing
          const __VLS_13 = __VLS_12(
            { ...{}, title: __VLS_ctx.t(path) },
            ...__VLS_functionalComponentArgsRest(__VLS_12)
          )
          ;(
            ({}) as (
              props: __VLS_FunctionalComponentProps<
                typeof __VLS_11,
                typeof __VLS_13
              > &
                Record<string, unknown>
            ) => void
          )({ ...{}, title: __VLS_ctx.t(path) })
          const __VLS_14 = __VLS_pickFunctionalComponentCtx(__VLS_11, __VLS_13)!
          let __VLS_15!: __VLS_NormalizeEmits<typeof __VLS_14.emit>
        }
        {
          const __VLS_16 = ({} as __VLS_IntrinsicElements)['template']
          const __VLS_17 = __VLS_elementAsFunctionalComponent(__VLS_16)
          ;(({}) as __VLS_IntrinsicElements).template
          ;(({}) as __VLS_IntrinsicElements).template
          const __VLS_18 = __VLS_17(
            { ...{} },
            ...__VLS_functionalComponentArgsRest(__VLS_17)
          )
          ;(
            ({}) as (
              props: __VLS_FunctionalComponentProps<
                typeof __VLS_16,
                typeof __VLS_18
              > &
                Record<string, unknown>
            ) => void
          )({ ...{} })
          {
            __VLS_8.slots!.suffix
            {
              let __VLS_19!: 'NIcon' extends keyof typeof __VLS_ctx
                ? typeof __VLS_ctx.NIcon
                : 'nIcon' extends keyof typeof __VLS_ctx
                ? typeof __VLS_ctx.nIcon
                : 'n-icon' extends keyof typeof __VLS_ctx
                ? (typeof __VLS_ctx)['n-icon']
                : (typeof __VLS_resolvedLocalAndGlobalComponents)['NIcon']
              const __VLS_20 = __VLS_asFunctionalComponent(
                __VLS_19,
                new __VLS_19({ ...{} })
              )
              ;(({}) as { NIcon: typeof __VLS_19 }).NIcon
              ;(({}) as { NIcon: typeof __VLS_19 }).NIcon
              const __VLS_21 = __VLS_20(
                { ...{} },
                ...__VLS_functionalComponentArgsRest(__VLS_20)
              )
              ;(
                ({}) as (
                  props: __VLS_FunctionalComponentProps<
                    typeof __VLS_19,
                    typeof __VLS_21
                  > &
                    Record<string, unknown>
                ) => void
              )({ ...{} })
              const __VLS_22 = __VLS_pickFunctionalComponentCtx(
                __VLS_19,
                __VLS_21
              )!
              let __VLS_23!: __VLS_NormalizeEmits<typeof __VLS_22.emit>
              {
                let __VLS_24!: 'ArrowForwardIosRoundVue' extends keyof typeof __VLS_ctx
                  ? typeof __VLS_ctx.ArrowForwardIosRoundVue
                  : (typeof __VLS_resolvedLocalAndGlobalComponents)['ArrowForwardIosRoundVue']
                const __VLS_25 = __VLS_asFunctionalComponent(
                  __VLS_24,
                  new __VLS_24({ ...{} })
                )
                ;(({}) as { ArrowForwardIosRoundVue: typeof __VLS_24 })
                  .ArrowForwardIosRoundVue
                const __VLS_26 = __VLS_25(
                  { ...{} },
                  ...__VLS_functionalComponentArgsRest(__VLS_25)
                )
                ;(
                  ({}) as (
                    props: __VLS_FunctionalComponentProps<
                      typeof __VLS_24,
                      typeof __VLS_26
                    > &
                      Record<string, unknown>
                  ) => void
                )({ ...{} })
                const __VLS_27 = __VLS_pickFunctionalComponentCtx(
                  __VLS_24,
                  __VLS_26
                )!
                let __VLS_28!: __VLS_NormalizeEmits<typeof __VLS_27.emit>
              }
              __VLS_22.slots!.default
            }
          }
        }
      }
      // @ts-ignore
      ;[childrenPaths, currentPath, currentPath, t, t, t]
    }
    for (const [options] of __VLS_getVForSourceType(
      __VLS_ctx.settingOptions!
    )) {
      {
        let __VLS_29!: 'NListItem' extends keyof typeof __VLS_ctx
          ? typeof __VLS_ctx.NListItem
          : 'nListItem' extends keyof typeof __VLS_ctx
          ? typeof __VLS_ctx.nListItem
          : 'n-list-item' extends keyof typeof __VLS_ctx
          ? (typeof __VLS_ctx)['n-list-item']
          : (typeof __VLS_resolvedLocalAndGlobalComponents)['NListItem']
        const __VLS_30 = __VLS_asFunctionalComponent(
          __VLS_29,
          new __VLS_29({ ...{} })
        )
        ;(({}) as { NListItem: typeof __VLS_29 }).NListItem
        ;(({}) as { NListItem: typeof __VLS_29 }).NListItem
        const __VLS_31 = __VLS_30(
          { ...{} },
          ...__VLS_functionalComponentArgsRest(__VLS_30)
        )
        ;(
          ({}) as (
            props: __VLS_FunctionalComponentProps<
              typeof __VLS_29,
              typeof __VLS_31
            > &
              Record<string, unknown>
          ) => void
        )({ ...{} })
        const __VLS_32 = __VLS_pickFunctionalComponentCtx(__VLS_29, __VLS_31)!
        let __VLS_33!: __VLS_NormalizeEmits<typeof __VLS_32.emit>
        {
          let __VLS_34!: 'NThing' extends keyof typeof __VLS_ctx
            ? typeof __VLS_ctx.NThing
            : 'nThing' extends keyof typeof __VLS_ctx
            ? typeof __VLS_ctx.nThing
            : 'n-thing' extends keyof typeof __VLS_ctx
            ? (typeof __VLS_ctx)['n-thing']
            : (typeof __VLS_resolvedLocalAndGlobalComponents)['NThing']
          const __VLS_35 = __VLS_asFunctionalComponent(
            __VLS_34,
            new __VLS_34({
              ...{},
              titleExtra: String(__VLS_ctx.config.lazyDelayForPapaw),
            })
          )
          ;(({}) as { NThing: typeof __VLS_34 }).NThing
          ;(({}) as { NThing: typeof __VLS_34 }).NThing
          const __VLS_36 = __VLS_35(
            { ...{}, titleExtra: String(__VLS_ctx.config.lazyDelayForPapaw) },
            ...__VLS_functionalComponentArgsRest(__VLS_35)
          )
          ;(
            ({}) as (
              props: __VLS_FunctionalComponentProps<
                typeof __VLS_34,
                typeof __VLS_36
              > &
                Record<string, unknown>
            ) => void
          )({ ...{}, titleExtra: String(__VLS_ctx.config.lazyDelayForPapaw) })
          const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_34, __VLS_36)!
          let __VLS_38!: __VLS_NormalizeEmits<typeof __VLS_37.emit>
          {
            const __VLS_39 = ({} as __VLS_IntrinsicElements)['template']
            const __VLS_40 = __VLS_elementAsFunctionalComponent(__VLS_39)
            ;(({}) as __VLS_IntrinsicElements).template
            ;(({}) as __VLS_IntrinsicElements).template
            const __VLS_41 = __VLS_40(
              { ...{} },
              ...__VLS_functionalComponentArgsRest(__VLS_40)
            )
            ;(
              ({}) as (
                props: __VLS_FunctionalComponentProps<
                  typeof __VLS_39,
                  typeof __VLS_41
                > &
                  Record<string, unknown>
              ) => void
            )({ ...{} })
            {
              __VLS_37.slots!.header
              __VLS_ctx.t(
                options.i18n || options.configName || (options.path as any)
              )
            }
          }
          if (options.displayType === 'range') {
            {
              const __VLS_42 = ({} as __VLS_IntrinsicElements)['template']
              const __VLS_43 = __VLS_elementAsFunctionalComponent(__VLS_42)
              ;(({}) as __VLS_IntrinsicElements).template
              ;(({}) as __VLS_IntrinsicElements).template
              const __VLS_44 = __VLS_43(
                { ...{} },
                ...__VLS_functionalComponentArgsRest(__VLS_43)
              )
              ;(
                ({}) as (
                  props: __VLS_FunctionalComponentProps<
                    typeof __VLS_42,
                    typeof __VLS_44
                  > &
                    Record<string, unknown>
                ) => void
              )({ ...{} })
              {
                __VLS_37.slots!.footer
                {
                  let __VLS_45!: 'NSlider' extends keyof typeof __VLS_ctx
                    ? typeof __VLS_ctx.NSlider
                    : 'nSlider' extends keyof typeof __VLS_ctx
                    ? typeof __VLS_ctx.nSlider
                    : 'n-slider' extends keyof typeof __VLS_ctx
                    ? (typeof __VLS_ctx)['n-slider']
                    : (typeof __VLS_resolvedLocalAndGlobalComponents)['NSlider']
                  const __VLS_46 = __VLS_asFunctionalComponent(
                    __VLS_45,
                    new __VLS_45({
                      ...{},
                      value: (__VLS_ctx.config as any)[
                        options.configName ?? ''
                      ],
                      min: options.range && options.range[0],
                      max: options.range && options.range[1],
                    })
                  )
                  ;(({}) as { NSlider: typeof __VLS_45 }).NSlider
                  const __VLS_47 = __VLS_46(
                    {
                      ...{},
                      value: (__VLS_ctx.config as any)[
                        options.configName ?? ''
                      ],
                      min: options.range && options.range[0],
                      max: options.range && options.range[1],
                    },
                    ...__VLS_functionalComponentArgsRest(__VLS_46)
                  )
                  ;(
                    ({}) as (
                      props: __VLS_FunctionalComponentProps<
                        typeof __VLS_45,
                        typeof __VLS_47
                      > &
                        Record<string, unknown>
                    ) => void
                  )({
                    ...{},
                    value: (__VLS_ctx.config as any)[options.configName ?? ''],
                    min: options.range && options.range[0],
                    max: options.range && options.range[1],
                  })
                  const __VLS_48 = __VLS_pickFunctionalComponentCtx(
                    __VLS_45,
                    __VLS_47
                  )!
                  let __VLS_49!: __VLS_NormalizeEmits<typeof __VLS_48.emit>
                }
              }
            }
            // @ts-ignore
            ;[settingOptions, config, config, config, t, config, config, config]
          }
        }
        __VLS_32.slots!.default
      }
    }
    __VLS_3.slots!.default
  }
  if (
    typeof __VLS_styleScopedClasses === 'object' &&
    !Array.isArray(__VLS_styleScopedClasses)
  ) {
  }
  var __VLS_slots!: {}
  return __VLS_slots
}
