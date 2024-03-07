type Types =
  | 'object'
  | 'string'
  | 'number'
  | 'symbol'
  | 'boolean'
  | 'undefined'
  | 'function'
  | 'deep'
type KeyType = Types | `no:${Types}`
type Options = Partial<Record<KeyType, boolean>>

export function objectFilter<T extends object, F extends string>(
  obj: T,
  ...filter: Array<KeyType | keyof T | F | `no:${F | Extract<keyof T, string>}`>
): any {
  return _objectFilter(obj, filter as any)
}

export function _objectFilter<T extends object, F extends string[]>(
  obj: T,
  filter: F extends Array<KeyType> ? Array<KeyType> : F,
  map = new Map<any, any>()
): any {
  let newObj = {}
  map.set(obj, newObj)
  let setting = { deep: false }
  //loadMap
  let someCondition = filter
    .map(key => {
      if (key === 'deep') {
        setting.deep = true
        return
      }
      let map: Options = {}
      key.split('&').map(key => {
        if (key.startsWith('no:')) {
          let key1 = key.slice(3)
          ;(map as any)[key1] = false
        } else {
          ;(map as any)[key] = true
        }
      })
      return map
    })
    .filter(Boolean)

  return Object.assign(
    newObj,
    Object.fromEntries(
      someCondition
        //一些条件，或条件
        .map(conditionMap => {
          //并列条件,和条件，必须同时满足
          let v = Object.entries(conditionMap as any).reduce(
            (entries, [conditionKey, conditionValue]) =>
              entries.filter(
                conditionValue
                  ? //正值模式，只找到符合条件的过滤通过
                    ([key, value]) =>
                      key === conditionKey || typeof value === conditionKey
                  : //反值模式满足条件的key将不通过
                    ([key, value]) =>
                      key === conditionKey || typeof value === conditionKey
                        ? false
                        : true
              ),
            Object.entries(obj)
          )

          if (setting.deep) {
            return v.map(([key, value]) => {
              let newValue = value as any
              if (typeof value === 'object') {
                // 防止循环依赖
                if (map.has(value)) {
                  newValue = map.get(value)
                } else if (!value || typeof value === 'function') {
                } else if (Array.isArray(value)) {
                  newValue = value.map(item =>
                    _objectFilter(value, filter, map)
                  )
                } else if (value instanceof Set) {
                  let newSet = new Set()
                  for (const item of value) {
                    newSet.add(_objectFilter(value, filter))
                  }
                } else {
                  newValue = _objectFilter(value, filter, map)
                }
              }
              return [key, newValue]
            }) as any
          }
          return v
        })
        .flat(1)
    )
  )
}
