//ts-node  packages\nostr-runtime\src\staff\autoExport.ts
import minimist from 'minimist'
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  lstatSync,
} from 'fs'
import { relative, resolve, parse } from 'path'

const scriptsOptions = minimist(global.process.argv, { boolean: ['reBuild'] })
let startDir = resolve(scriptsOptions._[2])
if (!startDir) {
  process.exit(1)
}

const exportName = 'exports.ts'
function autoExport(path: string) {
  let tsFilePath = deepLoadTsFils(path)
  writeStaffs(tsFilePath, path, 'staffExport.ts')
}
function writeStaffs(
  tsFilePath: string[],
  rootPath: string,
  exportName: string
) {
  if (tsFilePath.length > 0) {
    writeFileSync(resolve(rootPath, exportName), generate(rootPath, tsFilePath))
  }
}
function deepLoadTsFils(path: string) {
  let tsFilePath: string[] = []
  let files = readdirSync(resolve(path, ''))

  //child
  files.forEach(fileName => {
    if (
      fileName.startsWith('.') ||
      fileName.startsWith('_') ||
      fileName.startsWith('index')
    ) {
      return
    }

    let filePath = resolve(path, fileName)

    if (!existsSync(filePath)) {
      return
    }

    let lstat = lstatSync(filePath)
    if (lstat.isDirectory()) {
      tsFilePath.push(...deepLoadTsFils(filePath))
      return
    } else if (lstat.isFile() && filePath.endsWith('.ts')) {
      tsFilePath.push(filePath)
      return
    }
  })
  return tsFilePath

  // let modelFiles = files.filter(name => {
  //   let filePath = resolve(path, name)
  //   return (
  //     !name.startsWith('_') &&
  //     isModel(filePath) &&
  //     exportName !== name &&
  //     'index.ts' !== name
  //   )
  // })
  // if (modelFiles.length > 0) {
  //   writeFileSync(resolve(path, 'exports.ts'), generate(path, modelFiles))
  //   indexAutoCreate(path)
  // }
}
// function indexAutoCreate(path: string) {
//   //index不存在自动创建
//   let indexPath = resolve(path, 'index.ts')
//   let indexPart = `export * from "./${removeTheExtendedName(exportName)}";`
//   if (!existsSync(indexPath)) {
//     writeFileSync(indexPath, indexPart)
//   } else {
//     if (lstatSync(indexPath).isFile()) {
//       let line = readFile(indexPath).split('\n')
//       //如果存在这一行，就不需要添加了
//       if (line.some(item => item === indexPart)) {
//         return
//       }
//       line.push(indexPart)
//       writeFileSync(indexPath, line.join('\n'))
//     } else if (lstatSync(indexPath).isDirectory()) {
//       indexAutoCreate(indexPath)
//     }
//   }
// }
/**esmodel */
// function isModel(path: string): boolean {
//   if (!existsSync(path)) {
//     return false
//   } else if (lstatSync(path).isFile()) {
//     return readFile(path)
//       .split('\n')
//       .some(line => line.startsWith('export'))
//   } else {
//     return isModel(resolve(path, 'index.ts'))
//   }
// }
function readFile(path: string) {
  return readFileSync(path, 'utf-8')
}
const StaffConfigType = 'StaffConfigType'
function configTypeName(name: string) {
  return `${name}ConfigType`
}
function thePathTurnsRelative(rootPath: string, pathName: string) {
  let x = relative(rootPath, removeTheExtendedName(pathName)).replaceAll(
    '\\',
    '/'
  )
  if (!x.startsWith('.')) {
    return './' + x
  } else {
    return x
  }
}
function generate(path: string, filesPath: string[]) {
  let staffPath = resolve('packages/nostr-runtime/src/staff/staff')

  let exportAllLine: string[] = []
  let importDefaultLine: [name: string, path: string][] = []
  let staffConfigExportLine: [name: string, configTypeName: string][] = []
  let line: string[] = []

  filesPath.forEach(filePath => {
    let shortName = removeTheExtendedName(parse(filePath).name)
    //约定大于配置，如果有默认导出，就把首字母为大写
    if (isUppercase(shortName)) {
      //如果是文件
      if (!lstatSync(filePath).isFile()) {
        return
      }
      // let line = `export {default as ${shortName}} from "./${shortName}";`
      //如果是一个staff
      if (
        readFile(filePath)
          .split('\n')
          .some(line => line.startsWith('export default createStaff'))
      ) {
        importDefaultLine.push([
          shortName,
          thePathTurnsRelative(path, filePath),
        ])
        staffConfigExportLine.push([shortName, configTypeName(shortName)])
      }
    }
  })
  //StaffConfigType类型生成器
  if (staffConfigExportLine.length > 0) {
    console.log(resolve(path, exportName))

    line.push(`import type { ${StaffConfigType} } from './staff';`)
  }
  return [
    // imports
    ...line,
    // import default
    ...importDefaultLine.map(
      ([name, path]) => `import {default as ${name}} from '${path}';`
    ),
    // type XXXXConfigType = StaffConfigType<typeof XXXX>
    ...staffConfigExportLine.map(
      ([name, typeName]) =>
        `type ${typeName} = ${StaffConfigType}<typeof ${name}>`
    ),
    ...exportAllLine.map(name => `export * from './${name}'`),
    (importDefaultLine.length > 0
      ? [
          'export {',
          staffConfigExportLine.map(([name]) => name).join(', '),
          '}',
        ]
      : []
    ).join(''),
    (staffConfigExportLine.length > 0
      ? [
          'export type {',
          staffConfigExportLine
            .map(([name, configTypeName]) => configTypeName)
            .join(', '),
          '}',
        ]
      : []
    ).join(''),
  ].join('\n')
}
function removeTheExtendedName(name: string) {
  return name.endsWith('.ts') ? name.slice(0, name.length - 3) : name
}

function isUppercase(str: string) {
  return str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90
}

autoExport(startDir)
console.log('已完成！！！')
