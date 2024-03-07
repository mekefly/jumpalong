export function sn<F extends (...rest: any) => any>(
  f: F,
  name: string = f.name
): F & { id: string } {
  name === "" || ((f as any).id = name);
  return f as any;
}
