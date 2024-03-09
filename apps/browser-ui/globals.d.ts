declare global {
  const t: typeof import('./src/i18n')['t']
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    t: typeof t
  }
}

/* prettier-ignore */
export { };
