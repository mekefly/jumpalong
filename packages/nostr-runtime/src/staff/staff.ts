import { UnionToInterFunction } from '@jumpalong/shared'
import {
  AssignFeat,
  EventLine,
  EventLineConfig,
  EventLineFactory,
} from '../eventLine/EventLine'
$LoggerScope()

export type Staff<
  M extends EventLineConfig = {},
  Config extends EventLineConfig = {},
  REST extends Array<
    (line: EventLineFactory<any>) => EventLineFactory<any>
  > = []
> = ((line: EventLineFactory<M>) => EventLineFactory<Config>) &
  Partial<{
    dependents?: () => REST
    id?: string
  }>

export function createClassStaff<
  REST extends any[],
  T,
  N extends string,
  Config extends EventLineConfig = {}
>(
  name: N,
  Class: new (mod: EventLine<any>, ...rest: REST) => T,
  rest: REST,
  structure?: StaffStructure<[Staff<any, AssignFeat<{ [k in N]: T }>>], Config>
): Staff<any, AssignFeat<{ [k in N]: T }> & Config, []> {
  return createStaff(name, mod => {
    const m = mod.assignFeat({
      [name]: new Class(mod.out(), ...rest),
    })
    structure && m.add(structure as any)
    return m
  }) as any
}

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
  dependents: REST | (() => REST),
  staffStructure: StaffStructure<REST, Config>
): Staff<any, Config, REST>

export function createStaff<
  Config extends EventLineConfig = {},
  REST extends Array<
    (line: EventLineFactory<any>) => EventLineFactory<any>
  > = []
>(
  dependents: REST | (() => REST),
  name: string,
  staffStructure: StaffStructure<REST, Config>
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
  ...staffs:
    | [
        ...dependents: REST,
        ...([] | [name: string]),
        staffStructure: StaffStructure<REST, Config>
      ]
    | [
        dependents: REST | (() => REST),
        ...([] | [name: string]),
        staffStructure: StaffStructure<REST, Config>
      ]
): Staff<any, Config, REST> {
  logger.debug('create-staff', staffs)

  if (staffs.length === 1) {
    if (!staffs[0]) {
      throw new Error('staff cannot be undefined')
    }

    assertionISstaffStructure(staffs[0])
    // （staff）
    return _createStaff(() => [], undefined, staffs[0] as any) as any
  } else if (isId(staffs[0])) {
    //(id,...?)
    assertionISstaffStructure(staffs[1])
    //(id,staffStructure)

    return _createStaff(() => [], staffs[0] as string, staffs[1] as any) as any
  } else if (
    Array.isArray(staffs[0]) ||
    //是函数不是staff(隐式的不是staff构造器)
    (typeof staffs[0] === 'function' && !(staffs[0] as any)['__staff__'])
  ) {
    //(dependents,...?)
    if (isId(staffs[1])) {
      //(dependents,id,...?)
      assertionISstaffStructure(staffs[2])
      //(dependents,id,staffStructure)

      return _createStaff(
        staffs[0] as any,
        staffs[1] as string,
        staffs[2] as any
      ) as any
    } else {
      //(dependents,...?)
      assertionISstaffStructure(staffs[1])
      //(dependents,staffStructure)
      return _createStaff(staffs[0] as any, undefined, staffs[1] as any) as any
    }
  } else if (isStaffStructure(staffs[staffs.length - 1])) {
    //(...rest,staffStructure)
    if (isId(staffs[staffs.length - 2])) {
      //(...rest,id,staffStructure)

      // console.log('depends', staffs.slice(0, staffs.length - 2))

      return _createStaff(
        staffs.slice(0, staffs.length - 2) as any,
        staffs[staffs.length - 2] as any,
        staffs[staffs.length - 1] as any
      ) as any
    } else {
      //(...rest,staffStructure)
      return _createStaff(
        staffs.slice(0, staffs.length - 1) as any,
        undefined as any,
        staffs[staffs.length - 1] as any
      ) as any
    }
  }
  throw new Error('createStaff INVALID PARAMETER')
}
function isId<T>(t: T) {
  return typeof t === 'string'
}
function isStaffStructure(t: any) {
  if (!t || !(typeof t === 'function' && !(t as any)['__staff__'])) {
    return false
  }
  return true
}
function assertionISstaffStructure(t: any) {
  if (!t) {
    throw new Error('StaffStructure cannot be undefined')
  } else if (!(typeof t === 'function' && !(t as any)['__staff__'])) {
    throw new Error('Not is a StaffStructure')
  }
}

export function _createStaff<
  Config extends EventLineConfig = {},
  REST extends Array<
    (line: EventLineFactory<any>) => EventLineFactory<any>
  > = []
>(
  dependents: REST | (() => REST),
  id: string | undefined,
  staffStructure: StaffStructure<REST, Config>
): Staff<any, Config, REST> {
  if (Array.isArray(dependents)) {
    if (__DEV__) {
      dependents.forEach((item, index) => {
        if (item === undefined) {
          let m = `createStaff:staff dependent is undefined,at ${index},at Structure ${staffToString(
            staffStructure
          )},at${staffsToString(dependents as any)}`
          logger.error(m)
        }
      })
    }
    let x = dependents
    dependents = () => x
  }

  Object.assign(staffStructure, {
    dependents,
    id,
    __staff__: true,
  })
  return staffStructure
}
function staffToString(s: any) {
  if (!s) {
    return `undefined`
  } else {
    if (s.id) {
      return `Staff<${s.id}>`
    } else {
      return `Staff<${s.toString()}>`
    }
  }
}
function staffsToString(s: any[]) {
  return `[\n${s.map(item => staffToString(item)).join(',\n')}\n]`
}

export type MixinEventLineConfig<
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

export type StaffStructure<
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
export function createNotInjectStaff<K extends string, T>(name: K): T {
  return createStaff(name, m => {
    throw new Error(`Not Inject '${name}' Staff`)

    return m
  }) as T
}
