import { LineEmitterOptions } from './LineEmitter'

export type EmitType = Record<string | symbol, (...rest: any) => any>
export type FeatType = Record<any, any>
export type ChainType = Record<string | symbol | number, (...rest: any) => void>

/**
 * 一个emit配置
 */
export type Emit<T extends string | symbol, P extends any[] = [], R = void> = {
  emits: { [key in T]: (...rest: P) => R }
}
export type Feat<Name extends string | symbol | number, Value> = {
  feat: { [key in Name]: Value }
}

export type AssignFeat<F extends FeatType> = { feat: F }
export type AssignChain<F extends ChainType> = { chain: F }

/**
 * 事件线的配置类型
 */
export type EventLineConfig<
  Emit extends EmitType = EmitType,
  Feat extends FeatType = FeatType,
  Chain extends ChainType = ChainType
> = {
  emits?: Emit
  feat?: Feat
  chain?: Chain
}

export type EventLineOptions = LineEmitterOptions & {}
export type CreateChildOptions = EventLineOptions
