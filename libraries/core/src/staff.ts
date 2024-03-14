import { UnionToInterFunction } from '@jumpalong/shared'
import { AssignFeat, EventLine, EventLineConfig, EventLineMod } from '.'
$LoggerScope()

export type Staff<
  M extends EventLineConfig = {},
  Config extends EventLineConfig = {},
  REST extends Array<(line: EventLineMod<any>) => EventLineMod<any>> = []
> = ((line: EventLineMod<M>) => EventLineMod<Config>) &
  Partial<{
    dependents?: () => REST
    id?: string
  }>
export const StaffConfigFlag = Symbol()
export interface StaffFlag<Config extends EventLineConfig = EventLineConfig> {
  [StaffConfigFlag]: Config
}

export type StaffType<
  DependentConfig extends EventLineConfig,
  Dependents extends StaffFlag[],
  ReturnConfig extends EventLineConfig,
  Name extends string = string
> =
  | FunctionStaff<DependentConfig, Dependents, ReturnConfig, Name>
  | ClassStaff<Name>

export type FunctionStaff<
  DependentConfig extends EventLineConfig,
  Dependents extends StaffFlag<EventLineConfig>[],
  ReturnConfig extends EventLineConfig,
  Name extends string = string
> = ((
  line: EventLineMod<MergeStaffConfig<Dependents> & DependentConfig>
) => EventLineMod<ReturnConfig>) & {
  dependents?: () => Dependents
  id?: Name
}
export type MergeStaffFlag<ArrayConfig extends StaffFlag<EventLineConfig>[]> =
  StaffFlag<MergeStaffConfig<ArrayConfig>>
export type MergeStaffConfig<ArrayConfig extends StaffFlag[]> =
  ArrayConfig extends never[] | []
    ? {}
    : UnionToInterFunction<
        ArrayConfig[number][typeof StaffConfigFlag]
      > extends infer Config
    ? Config extends EventLineConfig
      ? Config
      : never
    : never

// createStaff(
//   () => [x4, x1],
//   ({ mod, line }) => {
//     line.x1
//     return mod
//   }
// )
export type GetConfig<Flag extends StaffFlag> = Flag[typeof StaffConfigFlag]
type ClassStaffOption<N extends string> = {
  name: N
  id?: string
}

export function createClassStaff<REST extends any[], T, N extends string>(
  name: N,
  Class: new (mod: EventLine<any>, ...rest: REST) => T,
  ...rest: REST
): StaffFlag<AssignFeat<{ [k in N]: T }>>
export function createClassStaff<REST extends any[], T, N extends string>(
  options: ClassStaffOption<N>,
  Class: new (mod: EventLine<any>, ...rest: REST) => T,
  ...rest: REST
): StaffFlag<AssignFeat<{ [k in N]: T }>>
export function createClassStaff<REST extends any[], T, N extends string>(
  nameOrOptions: N,
  Class: new (mod: EventLine<any>, ...rest: REST) => T,
  ...rest: REST
): StaffFlag<AssignFeat<{ [k in N]: T }>> {
  const options = (
    typeof nameOrOptions === 'string' ? { name: nameOrOptions } : nameOrOptions
  ) as ClassStaffOption<N>
  return createStaff(options.id ?? options.name, mod => {
    const m = mod.assignFeat({
      [options.name]: new Class(mod.out(), ...rest),
    })
    return m
  }) as any
}

export function warpClassWithStaff<
  N extends string,
  Class extends new (line: EventLine<any>) => any
>(
  name: N,
  Class: Class
): Class & {
  Staff: StaffFlag<AssignFeat<{ [k in N]: InstanceType<Class> }>>
}

export function warpClassWithStaff<
  N extends string,
  Class extends new (line: EventLine<any>, ...rest: REST) => any,
  REST extends any[] = []
>(
  options: REST extends []
    ? { name: N; id?: string; rest?: REST }
    : {
        name: N
        id?: string
        rest: REST
      },
  Class: Class
): Class & {
  Staff: StaffFlag<AssignFeat<{ [k in N]: InstanceType<Class> }>>
}
export function warpClassWithStaff<
  N extends string,
  Class extends new (line: EventLine<any>, ...rest: REST) => any,
  REST extends any[] = []
>(
  nameOrOptions: REST extends []
    ? N | { name: N; rest?: REST }
    : {
        name: N
        rest: REST
      },
  Class: Class
): Class & {
  Staff: StaffFlag<AssignFeat<{ [k in N]: InstanceType<Class> }>>
} {
  const options = (
    typeof nameOrOptions === 'string' ? { name: nameOrOptions } : nameOrOptions
  ) as {
    name: string
    rest?: any[]
  }
  ;(Class as any).Staff = createClassStaff(
    options,
    Class,
    ...(options.rest ?? ([] as any))
  )
  return Class as any
}

/**
 * @param ...dependents 依赖
 * @param name 名字
 * @param staffStructure 构造器
 */
// export function createStaff<
//   Config extends EventLineConfig,
//   REST extends StaffFlag[]
// >(
//   ...staffs: [
//     ...dependents: Readonly<REST>,
//     name: string,
//     staffStructure: StaffType<{}, REST, Config>
//   ]
// ): StaffFlag<Config>
/**
 * @param ...dependents 依赖
 * @param staffStructure 构造器
 */
// export function createStaff<
//   Config extends EventLineConfig,
//   REST extends StaffFlag[]
// >(
//   ...staffs: [
//     ...dependents: Readonly<REST>,
//     staffStructure: StaffType<{}, REST, Config>
//   ]
// ): StaffFlag<Config>

/**
 * @param dependents  依赖
 * @param staffStructure 构造器
 */
// export function createStaff<
//   Config extends EventLineConfig = {},
//   REST extends StaffFlag[] = []
// >(
//   dependents: Readonly<REST> | (() => Readonly<REST>),
//   staffStructure: StaffType<{}, REST, Config>
// ): StaffFlag<Config>
export function createStaff<
  Config extends EventLineConfig = {},
  REST extends StaffFlag[] = []
>(
  dependents: Readonly<REST> | (() => Readonly<REST>),
  staffStructure: StaffType<{}, REST, Config>
): StaffFlag<Config>

export function createStaff<Config extends EventLineConfig = {}>(
  staffStructure: StaffType<{}, [], Config>
): StaffFlag<Config>

/**
 * @param dependents 依赖
 * @param name 名字
 * @param staffStructure 构造器
 */
export function createStaff<
  Config extends EventLineConfig = {},
  REST extends StaffFlag[] = []
>(
  dependents: Readonly<REST> | (() => Readonly<REST>),
  name: string,
  staffStructure: StaffType<{}, REST, Config>
): StaffFlag<Config>

export function createStaff<Config extends EventLineConfig = {}>(
  name: string,
  staffStructure: StaffType<{}, [], Config>
): StaffFlag<Config>

export function createStaff<
  Config extends EventLineConfig = {},
  REST extends StaffFlag[] = []
>(
  ...staffs:
    | [
        ...rest:
          | [...dependents: Readonly<REST>]
          | [dependents: Readonly<REST> | (() => Readonly<REST>)],
        ...([] | [name: string]),
        staffStructure: StaffType<{}, REST, Config>
      ]
): StaffFlag<Config> {
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
  Config extends EventLineConfig,
  REST extends StaffFlag[]
>(
  dependents: REST | (() => REST),
  id: string | undefined,
  staffStructure: StaffType<{}, REST, Config>
): StaffFlag<Config> {
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
  return staffStructure as any
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

// export type MixinEventLineConfig<
//   T extends Array<
//     | ((line: EventLineFactory<any>) => EventLineFactory<any>)
//     | ClassStaffInterface<string>
//   >
// > = UnionToInterFunction<
//   ReturnType<T[number]> extends infer T
//     ? T extends any
//       ? T extends EventLineFactory<infer P>
//         ? P
//         : never
//       : never
//     : never
// >
// export type MixinFunctionStaffEventLineConfig<
//   T extends Array<(line: EventLineFactory<any>) => EventLineFactory<any>>
// > = UnionToInterFunction<
//   ReturnType<T[number]> extends infer T
//     ? T extends any
//       ? T extends EventLineFactory<infer P>
//         ? P
//         : never
//       : never
//     : never
// >
// export type MixinClassStaffEventLineConfig<
//   T extends Array<ClassStaffInterface<string>>
// > = MixinFunctionStaffEventLineConfig<{
//   [key in keyof T]: Staff<>
// }>

// export type StaffStructure<
//   REST extends Array<(line: EventLineFactory<any>) => EventLineFactory<any>>,
//   Config extends EventLineConfig
// > = (
//   mod: EventLineFactory<
//     MixinEventLineConfig<REST> extends EventLineConfig
//       ? MixinEventLineConfig<REST>
//       : {}
//   >
// ) => EventLineFactory<Config>

export type StaffConfigType<Flag extends StaffFlag> = GetConfig<Flag>

export function createNotInjectStaff<K extends string, T>(name: K): T {
  return createStaff(name, m => {
    throw new Error(`Not Inject '${name}' Staff`)

    return m
  }) as T
}

export type ClassStaff<Name extends string> = new (
  line: EventLine<any>
) => ClassStaffInterface<Name>

export interface ClassStaffInterface<Name extends string> {
  name: Name
}
