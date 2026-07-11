import '@testing-library/jest-dom/vitest';

// jsdom lacks IntersectionObserver; components guard on it, tests get a stub.
class IOStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).IntersectionObserver ??= IOStub;
