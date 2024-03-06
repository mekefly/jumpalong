export function cached<F extends () => any>(f: F): () => ReturnType<F> {
  let a: any
  return () => a || (a = f())
}
export function createGetValue<T>(init: () => T) {
  let value  = init()
  return () => value 
}
