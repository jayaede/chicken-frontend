import { useEffect } from 'react';

export const useAutoReloadOnUpdate = () => {
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === 'visible') {
        window.location.reload();
      }
    };

    document.addEventListener('visibilitychange', handler);
    return () =>
      document.removeEventListener('visibilitychange', handler);
  }, []);
};
