import { UnionToInterFunction } from './utils'

interface Match<T extends MatchType> {
  type: keyof T
  value: any[]
}
type MatchType = Record<string | symbol | number, any[]>

type MatchOptions<T extends MatchType, Return = void> = {
  [key in keyof T]: (...rest: T[key]) => Return
}
export function defineMatch<T extends MatchType>(): MatchOptions<T, Match<T>> {
  return new Proxy(
    {},
    {
      get(t, p) {
        return (...rest: any[]) => {
          return { value: rest, type: p }
        }
      },
    }
  ) as any
}
export function match<
  T extends MatchType,
  M extends Partial<MatchOptions<T, Return>>,
  Ks extends keyof M,
  Return
>(
  match: Match<T>,
  matchOptions: M,
  other?: (match: Match<Omit<T, Ks>>) => void
): ReturnType<M[string]> {
  let f = matchOptions[match.type]
  if (!f) {
    return other?.(match as any) as any
  }
  return f(...match.value) as any
}
