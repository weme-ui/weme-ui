import type { AxeMatchers } from 'vitest-axe/matchers'

// vitest-axe@0.1 still augments the legacy global `Vi` namespace;
// Vitest 4 expects module augmentation on `vitest`.
declare module 'vitest' {
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

export {}
