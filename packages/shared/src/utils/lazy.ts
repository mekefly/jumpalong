export function cached<F extends () => any>(f: F): () => ReturnType<F> {
  let a: any
  return () => a || (a = f())
}
