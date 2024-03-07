/**
 * 转换为骆驼命名法
 */
export const camelize = (str: string) => {
  /**
   * 找到以横线开头的ring|symbol
   * 括号里进行分组
   * 括号里的是第一组
   * 第一组应该是-
   */
  const camelizeRE = /-(\w)/g

  return str.replace(camelizeRE, (_, r: string) => r.toUpperCase())
}

/**
 * 首字母大写
 */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 驼峰命名转横线命名法
 */
export const hypnenate = (str: string, isCached: boolean = true) => {
  /**
   * 大写字母
   */
  const hypnenateRE = /([A-Z])/

  return str
    .replace(hypnenateRE, (r: string) => {
      return `-${r}`
    })
    .toLowerCase()
}
