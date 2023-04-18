import { ArgumentsType } from "vitest";
import { watch } from "vue";
import { debounce } from "./utils";

export const debounceWatch: typeof watch &
  ((
    r1: ArgumentsType<typeof watch>[0],
    r2: ArgumentsType<typeof watch>[1],
    opt: { delay: number } & ArgumentsType<typeof watch>[2]
  ) => ReturnType<typeof watch>) = ((r1: any, r2: any, opt: any) =>
  watch(r1, debounce(r2, opt.delay), opt)) as any;

export function componentAsync(callback) {}
