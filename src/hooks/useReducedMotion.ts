import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      if (typeof window.matchMedia !== 'function') return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => (typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : false),
    () => false,
  );
}
