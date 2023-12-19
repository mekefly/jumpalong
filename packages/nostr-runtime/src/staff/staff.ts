import { UnionToInterFunction } from '@jumpalong/shared'
import { EventLineConfig, EventLineFactory } from '..'
export type Staff<
  M extends EventLineConfig = {},
  Config extends EventLineConfig = {},
  REST extends Array<
    (line: EventLineFactory<any>) => EventLineFactory<any>
  > = []
> = ((line: EventLineFactory<M>) => EventLineFactory<Config>) &
  Partial<{
    dependents?: REST
    id?: string
  }>

export function createStaff<
  Config extends EventLineConfig = {},
  REST extends Array<
    (line: EventLineFactory<any>) => EventLineFactory<any>
  > = []
>(
  ...staffs: [...dependents: REST, staffStructure: StaffStructure<REST, Config>]
): Staff<any, Config, REST>
export function createStaff<
  Config extends EventLineConfig = {},
  REST extends Array<
    (line: EventLineFactory<any>) => EventLineFactory<any>
  > = []
>(
  ...staffs: [
    ...dependents: REST,
    name: string,
    staffStructure: StaffStructure<REST, Config>
  ]
): Staff<any, Config, REST>
/**
 * 创建一个事件线员工,最后一个是构造器，向前增加依赖
 * @param staffs 依赖
 * @param staffStructure 要创建的新员工
 * @returns staff
 */
export function createStaff<
  Config extends EventLineConfig = {},
  REST extends Array<
    (line: EventLineFactory<any>) => EventLineFactory<any>
  > = []
>(
  ...staffs: [
    ...dependents: REST,
    ...([] | [name: string]),
    staffStructure: StaffStructure<REST, Config>
  ]
): Staff<any, Config, REST> {
  //有依赖包裹一层
  let staffStructure = staffs.pop() as any

  let maybeName = staffs.pop()
  if (typeof maybeName === 'string') {
    staffStructure.id = maybeName
  } else if (typeof maybeName === 'function') {
    staffs.push(maybeName)
  } else {
    maybeName = ''
  }
  staffStructure.dependents = staffs
  return staffStructure
}

type MixinEventLineConfig<
  T extends Array<(line: EventLineFactory<any>) => EventLineFactory<any>>
> = UnionToInterFunction<
  ReturnType<T[number]> extends infer T
    ? T extends any
      ? T extends EventLineFactory<infer P>
        ? P
        : never
      : never
    : never
>

type StaffStructure<
  REST extends Array<(line: EventLineFactory<any>) => EventLineFactory<any>>,
  Config extends EventLineConfig
> = (
  mod: EventLineFactory<
    MixinEventLineConfig<REST> extends EventLineConfig
      ? MixinEventLineConfig<REST>
      : {}
  >
) => EventLineFactory<Config>

export type StaffConfigType<
  T extends (...rest: any) => EventLineFactory<EventLineConfig>
> = T extends (...rest: any) => EventLineFactory<infer Config> ? Config : never
