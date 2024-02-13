export function relativeRootPath(path: string) {
  let packagesRoot = 'packages'
  let p = path.lastIndexOf(packagesRoot)
  return p === -1 ? path : path.slice(p + packagesRoot.length + 1)
}
export function transformRows(
  rows: string[],
  id: string,
  flags: (string | RegExp)[]
) {
  //是否具有scope
  let isWithLoggerImport = false

  let opts: { disabled?: boolean } | null = null
  rows = rows.map(item => {
    if (
      flags.some(flag => {
        let str = item.trim()

        if (typeof flag === 'string') {
          return str.startsWith(flag)
        } else {
          let match = str.match(flag)
          if (!match) {
            return false
          }

          let entry = match.groups?.flag?.split(',').map(f => [f, true])
          if (entry) {
            opts = Object.fromEntries(entry)
          }

          return true
        }
      })
    ) {
      isWithLoggerImport = true
      //更细节的局部，如函数和箭头函数，@todo
      // let c = item.replace(flag);
      // let part = `logger = _loggerFactory.create(${JSON.stringify(
      //   relative(__dirname, id)
      // )}); //@LoggerScope`;
      // if (c === "") {
      //   return part;
      // } else {
      //   return [c, part];
      // }

      return createScopedLogger(id, opts)
    } else {
      return item
    }
  })

  if (!isWithLoggerImport) {
    return
  }

  return rows
}
export function createScopedLogger(id: string, opts?: any) {
  return `let logger = __loggerFactory.create(${JSON.stringify(
    //@ts-ignore
    relativeRootPath(id)
      .replaceAll('\\', '/')
      .replaceAll('../', '')
      .replaceAll('..\\', '') //删除所有../
  )}${opts ? `, ${JSON.stringify(opts)}` : ''}); //@LoggerScope`
}
export function searchVueScript(rows: string[]) {
  let start = 0
  let end = rows.length - 1
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i]

    if (row.trim().startsWith('<script')) {
      start = i + 1
      break
    }
  }

  for (let i = rows.length - 1; i >= 0; i--) {
    let row = rows[i]

    if (row.trim().startsWith('</script>')) {
      end = i - 1
      break
    }
  }

  return [start, end] as const
}

export function transform(
  code: string,
  id: string,
  flags: (string | RegExp)[]
) {
  let rows = code.split('\n')

  if (id.endsWith('.vue')) {
    const [start, end] = searchVueScript(rows)

    if (start >= end) {
      return
    }

    let v = transformRows(rows.slice(start, end + 1), id, flags)

    if (!v) return

    return {
      code: [...rows.slice(0, start), ...v, ...rows.slice(end + 1)].join('\n'),
      map: null,
    }
  } else if (id.endsWith('.ts') || id.endsWith('.js')) {
    let v = transformRows(rows, id, flags)

    if (!v) return
    return {
      code: v.join('\n'),
      map: null,
    }
  }
}

export function loggerScopePlugin(
  options: { excludes?: string[]; flags?: string[]; all?: boolean } = {}
) {
  let {
    excludes,
    flags = [
      '//@LoggerScope',
      // '$LoggerScope()',
      /^\$LoggerScope\((|["'](?<flag>[a-zA-Z]*)['"])\)(;|)$/,
      // 'LoggerScope',
      // 'LoggerScope()',
    ],
  } = options
  return {
    name: 'loggerScopePlugin',
    transform(code: string, id: string) {
      if (excludes && excludes.some(exclude => id.includes(exclude))) return
      if (!filter(id)) {
        return
      }
      if (options.all) {
        return transformAll(code, id, flags)
      }
      return transform(code, id, flags)
    },
  }
}
function filter(id: string) {
  let path = id.replaceAll('\\', '/')
  if (path.includes('/src/')) {
    return true
  }
  return false
}
function transformAll(code: string, id: string, flags: (string | RegExp)[]) {
  let r = transform(code, id, flags)
  if (r) {
    return r
  }

  return {
    code: `${createScopedLogger(id)} ${code}`,
    map: null,
  }
}
