import { PathMap } from '@/PathMap'

describe('PathMap', () => {
  test('Empty ones should be in root', () => {
    const pathMap = new PathMap<string>()
    pathMap.setValue('', 'User folder')
    expect(pathMap.getValue('')).toMatchInlineSnapshot(`
      [
        "User folder",
      ]
    `)
  })
  test('/ ones should be in root', () => {
    const pathMap = new PathMap<string>()
    pathMap.setValue('/', 'User folder')
    expect(pathMap.getValue('/')).toMatchInlineSnapshot(`
      [
        "User folder",
      ]
    `)
  })
  test('Single layer path', () => {
    const pathMap = new PathMap<string>()
    pathMap.setValue('xxx', 'User folder')
    //@ts-ignore
    expect(pathMap.root.values).toMatchInlineSnapshot(`[]`)
    //@ts-ignore
    expect(pathMap.root.children.xxx.values).toMatchInlineSnapshot(`
      [
        "User folder",
      ]
    `)
    expect(pathMap.getValue('')).toMatchInlineSnapshot(`[]`)
    expect(pathMap.getValue('/xxx')).toMatchInlineSnapshot(`
      [
        "User folder",
      ]
    `)
    expect(pathMap.getValue('xxx')).toMatchInlineSnapshot(`
      [
        "User folder",
      ]
    `)
  })
  test('Multilayer path', () => {
    const pathMap = new PathMap<string>()
    pathMap.setValue('/home/user/documents', 'Documents folder')
    pathMap.setValue('/home/user/documents/projects', 'Projects folder')
    pathMap.setValue('/home/user/documents/projects', 'Projects folder1')

    expect(pathMap.getValue('/home/user/documents')).toMatchInlineSnapshot(`
      [
        "Documents folder",
      ]
    `)

    expect(pathMap.getValue('/home/user/documents')).toEqual([
      'Documents folder',
    ])

    expect(pathMap.getValue('/home/user/documents/projects')).toEqual([
      'Projects folder',
      'Projects folder1',
    ])
  })
  test('getChildrenPathName', () => {
    const pathMap = new PathMap<string>()
    pathMap.setValue('/home/user/documents', 'Documents folder')
    pathMap.setValue('/home/bar', 'Documents folder')
    pathMap.setValue('/home/bar/xyz', 'Documents folder')

    expect(pathMap.getChildrenPathName('')).toMatchInlineSnapshot(`
      [
        "home",
      ]
    `)
    expect(pathMap.getChildrenPathName('home')).toMatchInlineSnapshot(`
      [
        "user",
        "bar",
      ]
    `)
  })

  test('getChildrenPath', () => {
    const pathMap = new PathMap<string>()
    pathMap.setValue('/home/user/documents', 'Documents folder')
    pathMap.setValue('/home/bar', 'Documents folder')
    pathMap.setValue('/home/bar/xyz', 'Documents folder')

    expect(pathMap.getChildrenPath('')).toMatchInlineSnapshot(`
      [
        "/home",
      ]
    `)
    expect(pathMap.getChildrenPath('home')).toMatchInlineSnapshot(`
      [
        "/home/user",
        "/home/bar",
      ]
    `)
  })
})
