/**
 * 前缀树节点
 */
class TrieNode<T> {
  private readonly children: { [key: string]: TrieNode<T> } = {}
  private values: T[] = []

  addValue(value: T) {
    this.values.push(value)
  }
  getNodeBy(path: string) {}

  getNode(key: string): TrieNode<T> | undefined {
    return this.children[key]
  }

  addNode(key: string): TrieNode<T> {
    if (!this.children[key]) {
      this.children[key] = new TrieNode<T>()
    }
    return this.children[key]
  }

  getValues(): T[] {
    return this.values
  }
}

export class PathMap<T> {
  private root: TrieNode<T> = new TrieNode<T>()

  setValue(path: string, value: T) {
    // 从根节点开始
    let currentNode = this.root
    // 将路径按'/'分割成多个键，并过滤掉空键
    const keys = path.split('/').filter(k => k)
    console.log('keys', keys)

    // 遍历除最后一个键外的所有键
    for (let i = 0; i < keys.length; i++) {
      // 根据当前键在当前节点下添加子节点，并将子节点赋值给当前节点
      currentNode = currentNode.addNode(keys[i])
    }

    // 在最后一个键对应的节点上添加值
    currentNode.addValue(value)
  }

  /**
   * 根据给定的路径获取值
   *
   * @param path 路径
   * @returns 返回值的数组
   */
  getValue(path: string): T[] {
    let currentNode = this.root
    const keys = path.split('/').filter(k => k)

    for (let i = 0; i < keys.length; i++) {
      if (!currentNode.getNode(keys[i])) {
        return []
      }
      currentNode = currentNode.getNode(keys[i])!
    }

    return currentNode.getValues()
  }

  /**
   * 获取子节点路径
   *
   * @param path 节点路径
   * @returns 子节点路径数组
   */
  getChildrenPathName(path: string): string[] {
    let currentNode = this.root
    const keys = path.split('/').filter(k => k)
    const subDirectories: string[] = []

    for (let i = 0; i < keys.length; i++) {
      if (!currentNode.getNode(keys[i])) {
        return []
      }
      currentNode = currentNode.getNode(keys[i])!
    }

    //@ts-ignore
    for (const childKey in currentNode.children) {
      subDirectories.push(childKey)
    }

    return subDirectories
  }
  getChildrenPath(path: string): string[] {
    const subDirectories = this.getChildrenPathName(path)

    path = path.endsWith('/') ? path : `${path}/`
    path = path.startsWith('/') ? path : `/${path}`
    return subDirectories.map(item => `${path}${item}`)
  }

  /**
   * 获取父级路径
   *
   * @param path 路径字符串
   * @returns 返回父级路径，若路径字符串中只有一个元素，则返回null
   */
  getParentPath(path: string): string | null {
    const keys = path.split('/').filter(k => k)
    if (keys.length === 1) {
      return null
    }
    return keys.slice(0, -1).join('/')
  }

  /**
   * 获取指定路径下的所有值
   *
   * @param path 路径，以斜杠（/）分隔
   * @returns 返回指定路径下的所有值数组
   */
  getDeepValues(path: string): T[] {
    let currentNode = this.root
    const keys = path.split('/').filter(k => k)
    const values: T[] = []

    function traverse(node: TrieNode<T>) {
      values.push(...node.getValues())
      //@ts-ignore
      for (const child of Object.values(node.children)) {
        traverse(child)
      }
    }

    for (let i = 0; i < keys.length; i++) {
      if (!currentNode.getNode(keys[i])) {
        return []
      }
      currentNode = currentNode.getNode(keys[i])!
    }

    traverse(currentNode)
    return values
  }
}
