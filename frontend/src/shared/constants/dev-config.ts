export const IS_DEV = Boolean(import.meta.env.DEV);
export const DEBOUNCE_TIME = IS_DEV ? 500 : 200;