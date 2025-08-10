
/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

declare global {
  const describe: typeof import('vitest').describe;
  const it: typeof import('vitest').it;
  const expect: typeof import('vitest').expect;
  const vi: typeof import('vitest').vi;
}

export {};
